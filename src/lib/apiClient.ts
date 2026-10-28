/**
 * Learning Point — Centralized Client-Side API Gateway Client
 */

export interface StudentUser {
  id: string;
  phone: string;
  fullName: string;
  targetExam?: string;
  role?: string;
}

export interface AuthResponse {
  success?: boolean;
  valid?: boolean;
  sessionToken?: string;
  user?: StudentUser;
  error?: string;
  message?: string;
}

class ApiClient {
  private getBaseUrl(): string {
    return ''; // Relative path for same-origin Cloudflare Workers
  }

  private getToken(): string | null {
    return localStorage.getItem('lp_session_token');
  }

  public setToken(token: string | null): void {
    if (token) {
      localStorage.setItem('lp_session_token', token);
    } else {
      localStorage.removeItem('lp_session_token');
    }
  }

  private async request<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.getBaseUrl()}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMsg = data.message || data.error || `HTTP ${response.status} Request Failed`;
      const error = new Error(errorMsg) as any;
      error.status = response.status;
      error.code = data.error;
      throw error;
    }

    return data as T;
  }

  // Health
  public async getHealth() {
    return this.request('/api/health');
  }

  // Authentication
  public async login(phone: string, password: string): Promise<AuthResponse> {
    const res = await this.request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ phone, password }),
    });

    if (res.sessionToken) {
      this.setToken(res.sessionToken);
    }
    return res;
  }

  public async register(
    fullName: string,
    phone: string,
    targetExam: string,
    password: string
  ): Promise<AuthResponse> {
    const res = await this.request<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ fullName, phone, targetExam, password }),
    });

    if (res.sessionToken) {
      this.setToken(res.sessionToken);
    }
    return res;
  }

  public async verifySession(): Promise<AuthResponse> {
    const token = this.getToken();
    if (!token) {
      return { valid: false, error: 'NO_TOKEN' };
    }
    return this.request<AuthResponse>('/api/auth/session', {
      method: 'GET',
    });
  }

  public async logout(): Promise<void> {
    try {
      await this.request('/api/auth/logout', { method: 'POST' });
    } catch {
      // Ignored: always clear local token
    } finally {
      this.setToken(null);
      localStorage.removeItem('lp_student_session');
    }
  }

  // Examination Operations
  public async startExam(testId = 'test-1'): Promise<any> {
    return this.request('/api/exam/start', {
      method: 'POST',
      body: JSON.stringify({ testId }),
    });
  }

  public async syncResponses(attemptId: string, responses: Record<string, string>): Promise<any> {
    return this.request('/api/exam/sync', {
      method: 'POST',
      body: JSON.stringify({ attemptId, responses }),
    });
  }

  public async submitExam(attemptId: string, responses: Record<string, string>): Promise<any> {
    return this.request('/api/exam/submit', {
      method: 'POST',
      body: JSON.stringify({ attemptId, responses }),
    });
  }

  public async getExamResult(attemptId: string): Promise<any> {
    return this.request(`/api/exam/result/${attemptId}`, {
      method: 'GET',
    });
  }
}

export const apiClient = new ApiClient();
