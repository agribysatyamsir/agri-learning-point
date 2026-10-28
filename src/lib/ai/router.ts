/**
 * Learning Point — Enterprise Multi-Provider AI Fallback Router
 * Cascading Fallback Chain with Dynamic Model Auto-Discovery:
 * Gemini -> DeepSeek -> Cerebras -> Groq -> Mistral -> Cloudflare Gateway
 */

import { resolveLatestModel, invalidateModelCache } from './dynamicModelResolver';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIResponse {
  content: string;
  provider: string;
  model: string;
}

export async function generateAICompletion(
  messages: ChatMessage[],
  temperature = 0.3
): Promise<AIResponse> {
  const providers = [
    // 1. Google Gemini 2.5 Flash
    async () => {
      const key = import.meta.env.GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY_BACKUP;
      if (!key) throw new Error('No Gemini Key');
      const model = await resolveLatestModel('gemini');
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
      const contents = messages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents, generationConfig: { temperature } }),
      });
      if (!res.ok) {
        if (res.status === 404 || res.status === 410) invalidateModelCache('gemini');
        throw new Error(`Gemini HTTP ${res.status}`);
      }
      const data = await res.json();
      return {
        content: data.candidates?.[0]?.content?.parts?.[0]?.text || '',
        provider: 'Google Gemini',
        model,
      };
    },

    // 2. DeepSeek (Dynamic Model)
    async () => {
      const key = import.meta.env.DEEPSEEK_API_KEY;
      if (!key) throw new Error('No DeepSeek Key');
      const model = await resolveLatestModel('deepseek');
      const res = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature,
        }),
      });
      if (!res.ok) {
        if (res.status === 404 || res.status === 410) invalidateModelCache('deepseek');
        throw new Error(`DeepSeek HTTP ${res.status}`);
      }
      const data = await res.json();
      return {
        content: data.choices?.[0]?.message?.content || '',
        provider: 'DeepSeek',
        model,
      };
    },

    // 3. Cerebras (Ultra-Fast Dynamic Model)
    async () => {
      const key = import.meta.env.CEREBRAS_API_KEY;
      if (!key) throw new Error('No Cerebras Key');
      const model = await resolveLatestModel('cerebras');
      const res = await fetch('https://api.cerebras.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature,
        }),
      });
      if (!res.ok) {
        if (res.status === 404 || res.status === 410) invalidateModelCache('cerebras');
        throw new Error(`Cerebras HTTP ${res.status}`);
      }
      const data = await res.json();
      return {
        content: data.choices?.[0]?.message?.content || '',
        provider: 'Cerebras',
        model,
      };
    },

    // 4. Groq (High Speed Dynamic Model)
    async () => {
      const key = import.meta.env.GROQ_API_KEY || import.meta.env.GROQ_API_KEY_BACKUP;
      if (!key) throw new Error('No Groq Key');
      const model = await resolveLatestModel('groq');
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature,
        }),
      });
      if (!res.ok) {
        if (res.status === 404 || res.status === 410) invalidateModelCache('groq');
        throw new Error(`Groq HTTP ${res.status}`);
      }
      const data = await res.json();
      return {
        content: data.choices?.[0]?.message?.content || '',
        provider: 'Groq',
        model,
      };
    },

    // 5. Mistral AI (Dynamic Model)
    async () => {
      const key = import.meta.env.MISTRAL_API_KEY || import.meta.env.MISTRAL_API_KEY_BACKUP;
      if (!key) throw new Error('No Mistral Key');
      const model = await resolveLatestModel('mistral');
      const res = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature,
        }),
      });
      if (!res.ok) {
        if (res.status === 404 || res.status === 410) invalidateModelCache('mistral');
        throw new Error(`Mistral HTTP ${res.status}`);
      }
      const data = await res.json();
      return {
        content: data.choices?.[0]?.message?.content || '',
        provider: 'Mistral AI',
        model,
      };
    },

    // 6. Cloudflare AI Gateway (Fallback Tier)
    async () => {
      const endpoint = import.meta.env.CLOUDFLARE_AI_GATEWAY_ENDPOINT;
      const token = import.meta.env.CLOUDFLARE_AI_GATEWAY_TOKEN;
      if (!endpoint || !token) throw new Error('No Cloudflare AI Gateway');
      const model = await resolveLatestModel('cloudflare');
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'cf-aig-authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature,
        }),
      });
      if (!res.ok) {
        if (res.status === 404 || res.status === 410) invalidateModelCache('cloudflare');
        throw new Error(`Cloudflare AI Gateway HTTP ${res.status}`);
      }
      const data = await res.json();
      return {
        content: data.choices?.[0]?.message?.content || '',
        provider: 'Cloudflare Workers AI',
        model,
      };
    },
  ];

  let lastError: any = null;
  for (const providerFn of providers) {
    try {
      return await providerFn();
    } catch (err) {
      lastError = err;
      continue;
    }
  }

  throw new Error(`All AI fallback providers failed. Last error: ${lastError?.message}`);
}
