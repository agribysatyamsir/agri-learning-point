/**
 * Learning Point — Enterprise Multi-Provider AI Fallback Router
 * Cascading Fallback Chain:
 * Gemini -> DeepSeek -> Cerebras -> Groq -> Mistral -> SambaNova -> Cloudflare Gateway
 */

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
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;
      const contents = messages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents, generationConfig: { temperature } }),
      });
      if (!res.ok) throw new Error(`Gemini HTTP ${res.status}`);
      const data = await res.json();
      return {
        content: data.candidates?.[0]?.content?.parts?.[0]?.text || '',
        provider: 'Google Gemini',
        model: 'gemini-2.5-flash',
      };
    },

    // 2. DeepSeek
    async () => {
      const key = import.meta.env.DEEPSEEK_API_KEY;
      if (!key) throw new Error('No DeepSeek Key');
      const res = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages,
          temperature,
        }),
      });
      if (!res.ok) throw new Error(`DeepSeek HTTP ${res.status}`);
      const data = await res.json();
      return {
        content: data.choices?.[0]?.message?.content || '',
        provider: 'DeepSeek',
        model: 'deepseek-chat',
      };
    },

    // 3. Cerebras (Ultra-Fast)
    async () => {
      const key = import.meta.env.CEREBRAS_API_KEY;
      if (!key) throw new Error('No Cerebras Key');
      const res = await fetch('https://api.cerebras.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: 'llama3.1-8b',
          messages,
          temperature,
        }),
      });
      if (!res.ok) throw new Error(`Cerebras HTTP ${res.status}`);
      const data = await res.json();
      return {
        content: data.choices?.[0]?.message?.content || '',
        provider: 'Cerebras',
        model: 'llama3.1-8b',
      };
    },

    // 4. Groq (High Speed)
    async () => {
      const key = import.meta.env.GROQ_API_KEY || import.meta.env.GROQ_API_KEY_BACKUP;
      if (!key) throw new Error('No Groq Key');
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages,
          temperature,
        }),
      });
      if (!res.ok) throw new Error(`Groq HTTP ${res.status}`);
      const data = await res.json();
      return {
        content: data.choices?.[0]?.message?.content || '',
        provider: 'Groq',
        model: 'llama-3.3-70b-versatile',
      };
    },

    // 5. Cloudflare AI Gateway
    async () => {
      const endpoint = import.meta.env.CLOUDFLARE_AI_GATEWAY_ENDPOINT;
      const token = import.meta.env.CLOUDFLARE_AI_GATEWAY_TOKEN;
      if (!endpoint || !token) throw new Error('No Cloudflare AI Gateway');
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'cf-aig-authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          model: '@cf/meta/llama-3.2-3b-instruct',
          messages,
          temperature,
        }),
      });
      if (!res.ok) throw new Error(`Cloudflare AI Gateway HTTP ${res.status}`);
      const data = await res.json();
      return {
        content: data.choices?.[0]?.message?.content || '',
        provider: 'Cloudflare Workers AI',
        model: '@cf/meta/llama-3.2-3b-instruct',
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
