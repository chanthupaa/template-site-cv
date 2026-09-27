import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, IS_FIREBASE_ENABLED } from '../config/firebase';
import {
  getCurrentSession,
  setSession,
  loginUser,
  registerUser,
  loginDemoUser,
  loginWithGoogle,
  loginWithFacebook,
  logoutUser,
  getUserResumesFromDb,
  fetchCloudResumes,
  saveResumeToDb,
  deleteResumeFromDb,
  duplicateResumeInDb,
} from '../services/authDatabaseService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signin'); // 'signin' | 'signup'

  useEffect(() => {
    // 1. Initial local session check
    const cached = getCurrentSession();
    if (cached) {
      setUser(cached);
    }

    // 2. Firebase live auth state listener
    let unsubscribe = () => {};
    if (IS_FIREBASE_ENABLED && auth) {
      unsubscribe = onAuthStateChanged(auth, (fbUser) => {
        if (fbUser) {
          const profile = {
            id: fbUser.uid,
            name: fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
            email: fbUser.email,
            createdAt: fbUser.metadata?.creationTime || new Date().toISOString(),
            avatar: fbUser.photoURL || null,
          };
          setUser(profile);
          setSession(profile);
          fetchCloudResumes(fbUser.uid).catch(() => {});
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }

    return () => unsubscribe();
  }, []);

  const login = useCallback(async (email, password) => {
    const loggedIn = await loginUser({ email, password });
    setUser(loggedIn);
    setIsAuthModalOpen(false);
    return loggedIn;
  }, []);

  const signup = useCallback(async (name, email, password) => {
    const registered = await registerUser({ name, email, password });
    setUser(registered);
    setIsAuthModalOpen(false);
    return registered;
  }, []);

  const loginDemo = useCallback(async () => {
    const demo = await loginDemoUser();
    setUser(demo);
    setIsAuthModalOpen(false);
    return demo;
  }, []);

  const loginGoogle = useCallback(async (preferredEmail = '') => {
    const googleUser = await loginWithGoogle(preferredEmail);
    setUser(googleUser);
    setIsAuthModalOpen(false);
    return googleUser;
  }, []);

  const loginFacebook = useCallback(async (preferredEmail = '') => {
    const fbUser = await loginWithFacebook(preferredEmail);
    setUser(fbUser);
    setIsAuthModalOpen(false);
    return fbUser;
  }, []);

  const logout = useCallback(async () => {
    await logoutUser();
    setUser(null);
  }, []);

  const openAuthModal = useCallback((mode = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  // Database access for current user
  const getUserResumes = useCallback(() => {
    return getUserResumesFromDb(user?.id);
  }, [user?.id]);

  const saveResume = useCallback((resumeData) => {
    return saveResumeToDb(resumeData, user?.id || 'guest');
  }, [user?.id]);

  const deleteResume = useCallback((resumeId) => {
    return deleteResumeFromDb(resumeId, user?.id);
  }, [user?.id]);

  const duplicateResume = useCallback((resumeId) => {
    return duplicateResumeInDb(resumeId, user?.id);
  }, [user?.id]);

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    loading,
    login,
    signup,
    loginDemo,
    loginGoogle,
    loginFacebook,
    logout,
    isAuthModalOpen,
    authModalMode,
    openAuthModal,
    closeAuthModal,
    getUserResumes,
    saveResume,
    deleteResume,
    duplicateResume,
  }), [
    user,
    loading,
    login,
    signup,
    loginDemo,
    loginGoogle,
    loginFacebook,
    logout,
    isAuthModalOpen,
    authModalMode,
    openAuthModal,
    closeAuthModal,
    getUserResumes,
    saveResume,
    deleteResume,
    duplicateResume,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
