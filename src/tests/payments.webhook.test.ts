import { describe, it, expect, beforeEach } from 'vitest';
import {
  calculateHmacSha256,
  verifyRazorpaySignature,
  handleCreateOrder,
  handleVerifyPayment,
  handleRazorpayWebhook,
  ordersStore,
  enrollmentsStore,
} from '../worker/payments';
import { WorkerEnv } from '../worker/types';

describe('Payments, Razorpay HMAC-SHA256 & Entitlements Engine', () => {
  const secret = 'rzp_test_secret_998877';
  const orderId = 'order_lp_9876543210';
  const paymentId = 'pay_9876543210';

  let validSignature = '';

  beforeEach(async () => {
    // Generate valid HMAC SHA-256 signature for test cases
    validSignature = await calculateHmacSha256(`${orderId}|${paymentId}`, secret);
  });

  describe('HMAC-SHA256 Cryptographic Verification', () => {
    it('accurately verifies authentic Razorpay payment signature', async () => {
      const isValid = await verifyRazorpaySignature(orderId, paymentId, validSignature, secret);
      expect(isValid).toBe(true);
    });

    it('rejects tampered payment ID or order ID', async () => {
      const isTamperedPayment = await verifyRazorpaySignature(orderId, 'pay_tampered_123', validSignature, secret);
      expect(isTamperedPayment).toBe(false);

      const isTamperedOrder = await verifyRazorpaySignature('order_tampered_123', paymentId, validSignature, secret);
      expect(isTamperedOrder).toBe(false);
    });

    it('rejects verification if secret is mismatched', async () => {
      const isWrongSecret = await verifyRazorpaySignature(orderId, paymentId, validSignature, 'wrong_secret_key');
      expect(isWrongSecret).toBe(false);
    });
  });

  describe('Server-Authoritative Order Creation (POST /api/payments/create-order)', () => {
    const mockEnv: WorkerEnv = {
      APP_ENV: 'test',
      ADMIN_SHARED_SECRET: 'test-secret',
    };

    it('rejects unauthenticated requests with 401', async () => {
      const req = new Request('https://test.workers.dev/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: 'ibps-afo-grand-mock', amount: 499 }),
      });

      const res = await handleCreateOrder(req, mockEnv);
      expect(res.status).toBe(401);
      const data = await res.json();
      expect(data.error).toBe('UNAUTHORIZED');
    });

    it('creates an authoritative order for authenticated student', async () => {
      // Mock session header
      const userPayload = {
        id: 'usr_test_pay_01',
        phone: '9876543210',
        fullName: 'Aspirant Student',
        role: 'student',
      };
      const sessionToken = btoa(JSON.stringify(userPayload));

      const req = new Request('https://test.workers.dev/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({ courseId: 'ibps-afo-grand-mock', amount: 499 }),
      });

      const res = await handleCreateOrder(req, mockEnv);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.success).toBe(true);
      expect(data.orderId).toMatch(/^order_lp_/);
      expect(data.amount).toBe(499);
      expect(data.currency).toBe('INR');
      expect(data.receiptNumber).toBeDefined();

      // Ensure order was registered in orders store
      expect(ordersStore.has(data.orderId)).toBe(true);
    });
  });

  describe('Server Verification & Idempotent Entitlement (POST /api/payments/verify)', () => {
    const mockEnv: WorkerEnv = {
      APP_ENV: 'test',
      ADMIN_SHARED_SECRET: 'test-secret',
      RAZORPAY_KEY_SECRET: secret,
    };

    const userPayload = {
      id: 'usr_student_verify_01',
      phone: '9876543210',
      fullName: 'Verified Aspirant',
      role: 'student',
    };
    const sessionToken = btoa(JSON.stringify(userPayload));

    it('rejects counterfeit payment signatures with 400', async () => {
      const req = new Request('https://test.workers.dev/api/payments/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({
          orderId,
          paymentId,
          signature: 'forged_fake_signature_hex_12345',
          courseId: 'ibps-afo-grand-mock',
        }),
      });

      const res = await handleVerifyPayment(req, mockEnv);
      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.error).toBe('INVALID_PAYMENT_SIGNATURE');
    });

    it('verifies valid HMAC signature and idempotently activates enrollment', async () => {
      const req = new Request('https://test.workers.dev/api/payments/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({
          orderId,
          paymentId,
          signature: validSignature,
          courseId: 'ibps-afo-grand-mock',
        }),
      });

      const res = await handleVerifyPayment(req, mockEnv);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.success).toBe(true);
      expect(data.enrollment.status).toBe('active');
      expect(data.enrollment.userId).toBe(userPayload.id);

      // Verify idempotent re-verification with same data succeeds without crash
      const reReq = new Request('https://test.workers.dev/api/payments/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({
          orderId,
          paymentId,
          signature: validSignature,
          courseId: 'ibps-afo-grand-mock',
        }),
      });
      const reRes = await handleVerifyPayment(reReq, mockEnv);
      expect(reRes.status).toBe(200);
    });
  });

  describe('Server-to-Server Webhook (POST /api/webhooks/razorpay)', () => {
    const webhookSecret = 'rzp_webhook_secret_9988';
    const mockEnv: WorkerEnv = {
      APP_ENV: 'test',
      ADMIN_SHARED_SECRET: 'test-secret',
      RAZORPAY_WEBHOOK_SECRET: webhookSecret,
    };

    it('rejects webhooks with missing signature header', async () => {
      const req = new Request('https://test.workers.dev/api/webhooks/razorpay', {
        method: 'POST',
        body: JSON.stringify({ event: 'order.paid' }),
      });

      const res = await handleRazorpayWebhook(req, mockEnv);
      expect(res.status).toBe(401);
    });

    it('rejects webhooks with invalid signature header', async () => {
      const payload = JSON.stringify({ event: 'order.paid' });
      const req = new Request('https://test.workers.dev/api/webhooks/razorpay', {
        method: 'POST',
        headers: {
          'x-razorpay-signature': 'tampered_signature_hex',
        },
        body: payload,
      });

      const res = await handleRazorpayWebhook(req, mockEnv);
      expect(res.status).toBe(400);
    });

    it('accepts authentic webhook and activates enrollment idempotently', async () => {
      const eventPayload = {
        event: 'order.paid',
        payload: {
          payment: {
            entity: {
              id: 'pay_rzp_webhook_123',
              order_id: 'order_rzp_webhook_456',
              amount: 49900,
              notes: {
                userId: 'usr_webhook_aspirant_01',
                courseId: 'ibps-afo-grand-mock',
              },
            },
          },
        },
      };

      const rawBody = JSON.stringify(eventPayload);
      const signature = await calculateHmacSha256(rawBody, webhookSecret);

      const req = new Request('https://test.workers.dev/api/webhooks/razorpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-razorpay-signature': signature,
        },
        body: rawBody,
      });

      const res = await handleRazorpayWebhook(req, mockEnv);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.status).toBe('ok');
      expect(data.received).toBe(true);

      // Verify entitlement exists
      const enrollmentKey = `usr_webhook_aspirant_01_ibps-afo-grand-mock`;
      expect(enrollmentsStore.has(enrollmentKey)).toBe(true);

      // Verify replay/duplicate webhook delivery does not fail
      const reqDup = new Request('https://test.workers.dev/api/webhooks/razorpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-razorpay-signature': signature,
        },
        body: rawBody,
      });
      const resDup = await handleRazorpayWebhook(reqDup, mockEnv);
      expect(resDup.status).toBe(200);
    });
  });
});
