import React, { createContext, useContext, useState, useCallback } from 'react';
import * as auth from '../services/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => auth.getStoredUser());

  const signIn = useCallback(async (data) => setUser(await auth.signIn(data)), []);
  const signUp = useCallback(async (data) => setUser(await auth.signUp(data)), []);
  const signOut = useCallback(async () => {
    await auth.signOut();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signIn, signUp, signOut, resetPassword: auth.requestPasswordReset, isDemo: auth.AUTH_IS_DEMO }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
