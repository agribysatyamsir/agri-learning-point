/**
 * Learning Point — Client-Side Offline Attempt Buffer & IndexedDB Recovery
 * 
 * Persists responses locally instantly so that candidate selections are NEVER lost
 * during network hiccups, browser reloads, or device power disruptions.
 */

const DB_NAME = 'LearningPointExamDB';
const DB_VERSION = 1;
const STORE_NAME = 'attempt_buffer';

export interface LocalAttemptState {
  attemptId: string;
  testId: string;
  expiresAt: string;
  responses: Record<string, string>; // questionId -> optionId
  markedForReview: Record<string, boolean>;
  lastSavedAt: string;
}

// In-memory fallback for environments without localStorage or IndexedDB
const memoryStore = new Map<string, LocalAttemptState>();

export async function saveLocalAttempt(state: LocalAttemptState): Promise<void> {
  const payload = { ...state, lastSavedAt: new Date().toISOString() };
  
  // 1. In-memory store
  memoryStore.set(state.attemptId, payload);

  // 2. LocalStorage mirror
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(`lp_attempt_${state.attemptId}`, JSON.stringify(payload));
    }
  } catch {
    // Ignore storage quota
  }

  // 3. IndexedDB for persistent blob storage
  try {
    if (typeof window !== 'undefined' && window.indexedDB) {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'attemptId' });
        }
      };
      request.onsuccess = () => {
        try {
          const db = request.result;
          const tx = db.transaction(STORE_NAME, 'readwrite');
          tx.objectStore(STORE_NAME).put(payload);
        } catch {
          // Fallback handled
        }
      };
    }
  } catch {
    // Fallback handled
  }
}

export async function getLocalAttempt(attemptId: string): Promise<LocalAttemptState | null> {
  // 1. Check in-memory first
  if (memoryStore.has(attemptId)) {
    return memoryStore.get(attemptId) || null;
  }

  // 2. Check localStorage
  try {
    if (typeof localStorage !== 'undefined') {
      const raw = localStorage.getItem(`lp_attempt_${attemptId}`);
      if (raw) {
        return JSON.parse(raw);
      }
    }
  } catch {
    // Fall through
  }

  // 3. Check IndexedDB
  try {
    if (typeof window !== 'undefined' && window.indexedDB) {
      return new Promise((resolve) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onsuccess = () => {
          try {
            const db = request.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
              resolve(null);
              return;
            }
            const tx = db.transaction(STORE_NAME, 'readonly');
            const req = tx.objectStore(STORE_NAME).get(attemptId);
            req.onsuccess = () => resolve(req.result || null);
            req.onerror = () => resolve(null);
          } catch {
            resolve(null);
          }
        };
        request.onerror = () => resolve(null);
      });
    }
  } catch {
    // Fall through
  }

  return null;
}

export async function clearLocalAttempt(attemptId: string): Promise<void> {
  memoryStore.delete(attemptId);

  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(`lp_attempt_${attemptId}`);
    }
  } catch {
    // Ignored
  }

  try {
    if (typeof window !== 'undefined' && window.indexedDB) {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onsuccess = () => {
        try {
          const db = request.result;
          if (db.objectStoreNames.contains(STORE_NAME)) {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            tx.objectStore(STORE_NAME).delete(attemptId);
          }
        } catch {
          // Ignored
        }
      };
    }
  } catch {
    // Ignored
  }
}
