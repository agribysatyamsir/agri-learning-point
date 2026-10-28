/**
 * Learning Point — Autonomous Dynamic Model Resolver
 * Automatically queries provider model catalogs to discover and select the
 * latest active, free, non-deprecated models. Self-heals when models are deprecated.
 */

interface ProviderConfig {
  modelsEndpoint?: string;
  chatEndpoint: string;
  getKey: () => string;
  preferredKeywords: string[];
  defaultModel: string;
}

const PROVIDERS: Record<string, ProviderConfig> = {
  groq: {
    modelsEndpoint: 'https://api.groq.com/openai/v1/models',
    chatEndpoint: 'https://api.groq.com/openai/v1/chat/completions',
    getKey: () => import.meta.env.GROQ_API_KEY || import.meta.env.GROQ_API_KEY_BACKUP || '',
    preferredKeywords: ['llama-3.3-70b', 'llama-3.1-70b', 'llama-3.1-8b', 'mixtral'],
    defaultModel: 'llama-3.3-70b-versatile',
  },
  mistral: {
    modelsEndpoint: 'https://api.mistral.ai/v1/models',
    chatEndpoint: 'https://api.mistral.ai/v1/chat/completions',
    getKey: () => import.meta.env.MISTRAL_API_KEY || import.meta.env.MISTRAL_API_KEY_BACKUP || '',
    preferredKeywords: ['mistral-small', 'open-mistral', 'mistral-tiny'],
    defaultModel: 'mistral-small-latest',
  },
  cerebras: {
    modelsEndpoint: 'https://api.cerebras.ai/v1/models',
    chatEndpoint: 'https://api.cerebras.ai/v1/chat/completions',
    getKey: () => import.meta.env.CEREBRAS_API_KEY || '',
    preferredKeywords: ['llama3.1-8b', 'llama-3.1-70b', 'qwen'],
    defaultModel: 'llama3.1-8b',
  },
  deepseek: {
    modelsEndpoint: 'https://api.deepseek.com/models',
    chatEndpoint: 'https://api.deepseek.com/chat/completions',
    getKey: () => import.meta.env.DEEPSEEK_API_KEY || '',
    preferredKeywords: ['deepseek-chat', 'deepseek-flash', 'deepseek-v4'],
    defaultModel: 'deepseek-chat',
  },
  cloudflare: {
    chatEndpoint: import.meta.env.CLOUDFLARE_AI_GATEWAY_ENDPOINT || '',
    getKey: () => import.meta.env.CLOUDFLARE_AI_GATEWAY_TOKEN || '',
    preferredKeywords: ['@cf/meta/llama-3.2-3b-instruct', '@cf/meta/llama-3.2-1b-instruct', '@cf/meta/llama-3.3-70b-instruct'],
    defaultModel: '@cf/meta/llama-3.2-3b-instruct',
  },
  gemini: {
    chatEndpoint: 'https://generativelanguage.googleapis.com/v1beta/models',
    getKey: () => import.meta.env.GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY_BACKUP || '',
    preferredKeywords: ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'],
    defaultModel: 'gemini-2.5-flash',
  },
};

// In-memory model cache with 1-hour expiration
const modelCache: Record<string, { model: string; expiresAt: number }> = {};

export async function resolveLatestModel(provider: string): Promise<string> {
  const cfg = PROVIDERS[provider];
  if (!cfg) return 'unknown';

  const now = Date.now();
  if (modelCache[provider] && modelCache[provider].expiresAt > now) {
    return modelCache[provider].model;
  }

  // If no discovery endpoint, return the most current default
  if (!cfg.modelsEndpoint) {
    return cfg.defaultModel;
  }

  try {
    const key = cfg.getKey();
    if (!key) return cfg.defaultModel;

    const res = await fetch(cfg.modelsEndpoint, {
      headers: { 'Authorization': `Bearer ${key}` },
    });

    if (res.ok) {
      const data = await res.json();
      const modelIds: string[] = (data.data || []).map((m: any) => m.id);

      let selected = '';
      for (const kw of cfg.preferredKeywords) {
        const found = modelIds.find((id) => id.toLowerCase().includes(kw.toLowerCase()) && !id.includes('deprecated'));
        if (found) {
          selected = found;
          break;
        }
      }

      const finalModel = selected || modelIds[0] || cfg.defaultModel;
      modelCache[provider] = { model: finalModel, expiresAt: now + 3600 * 1000 };
      return finalModel;
    }
  } catch (err) {
    // Graceful fallback to default
  }

  return cfg.defaultModel;
}

export function invalidateModelCache(provider: string) {
  delete modelCache[provider];
}
