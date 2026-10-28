import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient, StudentUser } from '../lib/apiClient';

interface AuthContextType {
  user: StudentUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  sessionRevokedMessage: string | null;
  login: (phone: string, password: string) => Promise<void>;
  register: (fullName: string, phone: string, targetExam: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearRevokedMessage: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<StudentUser | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('lp_session_token'));
  const [isLoading, setIsLoading] = useState(true);
  const [sessionRevokedMessage, setSessionRevokedMessage] = useState<string | null>(null);

  // Check active session on initial load
  useEffect(() => {
    let isMounted = true;

    async function checkCurrentSession() {
      const storedToken = localStorage.getItem('lp_session_token');
      if (!storedToken) {
        if (isMounted) {
          setIsLoading(false);
        }
        return;
      }

      try {
        const res = await apiClient.verifySession();
        if (isMounted) {
          if (res.valid && res.user) {
            setUser(res.user);
            setToken(storedToken);
          } else {
            // Invalid or revoked
            apiClient.setToken(null);
            setUser(null);
            setToken(null);
            if (res.error === 'SESSION_REVOKED_CONCURRENT_LOGIN') {
              setSessionRevokedMessage(res.message || 'Your session was terminated due to a concurrent login on another device.');
            }
          }
        }
      } catch (err: any) {
        if (isMounted) {
          if (err.code === 'SESSION_REVOKED_CONCURRENT_LOGIN' || err.status === 401) {
            apiClient.setToken(null);
            setUser(null);
            setToken(null);
            setSessionRevokedMessage(err.message || 'Single active device policy: Another login was detected.');
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    checkCurrentSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (phone: string, password: string) => {
    setSessionRevokedMessage(null);
    const res = await apiClient.login(phone, password);
    if (res.user && res.sessionToken) {
      setUser(res.user);
      setToken(res.sessionToken);
      // Keep legacy item for backwards compatibility if needed
      localStorage.setItem('lp_student_session', JSON.stringify({
        id: res.user.id,
        phone: res.user.phone,
        name: res.user.fullName,
        targetExam: res.user.targetExam,
        token: res.sessionToken,
      }));
    }
  };

  const register = async (fullName: string, phone: string, targetExam: string, password: string) => {
    setSessionRevokedMessage(null);
    const res = await apiClient.register(fullName, phone, targetExam, password);
    if (res.user && res.sessionToken) {
      setUser(res.user);
      setToken(res.sessionToken);
      localStorage.setItem('lp_student_session', JSON.stringify({
        id: res.user.id,
        phone: res.user.phone,
        name: res.user.fullName,
        targetExam: res.user.targetExam,
        token: res.sessionToken,
      }));
    }
  };

  const logout = async () => {
    await apiClient.logout();
    setUser(null);
    setToken(null);
    setSessionRevokedMessage(null);
  };

  const clearRevokedMessage = () => {
    setSessionRevokedMessage(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(user && token),
        isLoading,
        sessionRevokedMessage,
        login,
        register,
        logout,
        clearRevokedMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
