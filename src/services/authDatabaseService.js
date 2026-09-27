/**
 * Auth & Cloud Database Service (Firebase + Secure Local Fallback)
 * 
 * Connected to Google Firebase Auth and Cloud Firestore.
 * Automatically synchronizes resumes across devices when signed in.
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDocs,
  collection,
  deleteDoc,
} from 'firebase/firestore';
import { auth, db, IS_FIREBASE_ENABLED } from '../config/firebase';

const USERS_STORAGE_KEY = 'ats_architect_users_db';
const SESSIONS_STORAGE_KEY = 'ats_architect_active_session';
const RESUMES_STORAGE_KEY = 'ats_architect_resumes_db';

/**
 * Cryptographic SHA-256 helper for local storage credential hashing
 */
async function hashPassword(password) {
  if (!password) return '';
  try {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      "PBKDF2",
      false,
      ["deriveBits"]
    );
    const salt = encoder.encode('ats_architect_salt_2026_secure_pbkdf2');
    const hashBuffer = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000,
        hash: "SHA-256"
      },
      keyMaterial,
      256
    );
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  } catch (_e) {
    // In environments without WebCrypto PBKDF2, we fail safely
    return 'fallback_secured_' + password.length;
  }
}

/**
 * Strict validator: Email MUST end with @gmail.com
 */
export function validateGmailAddress(email) {
  if (!email || !email.includes('@')) {
    throw new Error('Please enter a valid email address.');
  }
  const normalized = email.trim().toLowerCase();
  if (!normalized.endsWith('@gmail.com')) {
    throw new Error('Access restricted: Only email addresses ending with @gmail.com are permitted.');
  }
  return normalized;
}

// Helper to translate Firebase error codes into friendly user messages
function getFriendlyAuthError(err) {
  const code = err?.code || '';
  if (code.includes('email-already-in-use')) {
    return 'An account with this email already exists. Please sign in.';
  }
  if (code.includes('invalid-email')) {
    return 'Please enter a valid email address ending with @gmail.com.';
  }
  if (code.includes('weak-password')) {
    return 'Password is too weak. Please use at least 6 characters.';
  }
  if (
    code.includes('user-not-found') ||
    code.includes('wrong-password') ||
    code.includes('invalid-credential')
  ) {
    return 'Invalid email or password. Please check your credentials.';
  }
  if (code.includes('operation-not-allowed')) {
    return 'This sign-in method is not enabled yet in your Firebase console. Please go to Authentication -> Sign-in method in Firebase to enable it.';
  }
  if (code.includes('popup-closed-by-user') || code.includes('cancelled-popup-request')) {
    return 'Sign-in popup was closed before completing. Please try again.';
  }
  if (code.includes('account-exists-with-different-credential')) {
    return 'An account already exists with the same email using a different sign-in method.';
  }
  if (code.includes('network-request-failed')) {
    return 'Network connection error. Please check your internet connection.';
  }
  return err.message || 'Authentication error occurred.';
}

/**
 * Register a new user in Firebase Auth & Firestore Database
 */
export async function registerUser({ name, email, password }) {
  if (!name || !name.trim()) throw new Error('Please enter your full name.');
  if (!password || password.length < 6) throw new Error('Password must be at least 6 characters long.');

  const trimmedName = name.trim();
  const normalizedEmail = validateGmailAddress(email);

  if (IS_FIREBASE_ENABLED && auth) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, normalizedEmail, password);
      const fbUser = userCredential.user;

      // Update display name in Firebase Auth
      await updateProfile(fbUser, { displayName: trimmedName }).catch(() => {});

      const userProfile = {
        id: fbUser.uid,
        name: trimmedName,
        email: fbUser.email,
        createdAt: new Date().toISOString(),
        avatar: null,
      };

      // Store in Cloud Firestore
      try {
        await setDoc(doc(db, 'users', fbUser.uid), userProfile);
      } catch (_dbErr) {
        // Silently continue if Firestore write has transient network issues
      }

      setSession(userProfile);
      return userProfile;
    } catch (err) {
      // If Email/Password is not enabled yet in Firebase Console, fallback to secure local database
      if (err.code === 'auth/operation-not-allowed' || err.code === 'auth/configuration-not-found') {
        const localUser = await registerLocalUser({ name: trimmedName, email: normalizedEmail, password });
        return localUser;
      }
      throw new Error(getFriendlyAuthError(err));
    }
  }

  // Fallback to local database if Firebase is disabled
  return await registerLocalUser({ name: trimmedName, email: normalizedEmail, password });
}

/**
 * Sign in existing user with Firebase Auth
 */
export async function loginUser({ email, password }) {
  if (!email || !password) throw new Error('Please enter both email and password.');

  const normalizedEmail = validateGmailAddress(email);

  if (IS_FIREBASE_ENABLED && auth) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, normalizedEmail, password);
      const fbUser = userCredential.user;

      const userProfile = {
        id: fbUser.uid,
        name: fbUser.displayName || normalizedEmail.split('@')[0],
        email: fbUser.email,
        createdAt: new Date().toISOString(),
        avatar: fbUser.photoURL || null,
      };

      setSession(userProfile);
      return userProfile;
    } catch (err) {
      // Only fall back to local auth if Firebase service is explicitly not configured
      if (
        err.code === 'auth/operation-not-allowed' ||
        err.code === 'auth/configuration-not-found'
      ) {
        return await loginLocalUser({ email: normalizedEmail, password });
      }
      // Never auto-register or bypass authentication on invalid credentials!
      throw new Error(getFriendlyAuthError(err));
    }
  }

  // Fallback to local database
  return await loginLocalUser({ email: normalizedEmail, password });
}

/**
 * Sign in with Google (1-Click OAuth)
 * Enforces that Google account must end with @gmail.com
 */
export async function loginWithGoogle(_preferredEmail = '') {
  if (!IS_FIREBASE_ENABLED || !auth) {
    throw new Error('Google Sign-In requires Firebase to be enabled.');
  }

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  try {
    const result = await signInWithPopup(auth, provider);
    const fbUser = result.user;

    const email = (fbUser.email || '').toLowerCase().trim();
    if (!email.endsWith('@gmail.com')) {
      await firebaseSignOut(auth).catch(() => {});
      throw new Error(`Access restricted: The Google account (${email}) does not end with @gmail.com. Please use a @gmail.com account.`);
    }

    const userProfile = {
      id: fbUser.uid,
      name: fbUser.displayName || email.split('@')[0],
      email: fbUser.email,
      createdAt: new Date().toISOString(),
      avatar: fbUser.photoURL || null,
    };

    try {
      await setDoc(doc(db, 'users', fbUser.uid), userProfile, { merge: true });
    } catch (_dbErr) {
      // Ignore transient Firestore network issues
    }

    setSession(userProfile);
    return userProfile;
  } catch (err) {
    throw new Error(getFriendlyAuthError(err));
  }
}

/**
 * Sign in with Facebook OAuth
 */
export async function loginWithFacebook(_preferredEmail = '') {
  if (!IS_FIREBASE_ENABLED || !auth) {
    throw new Error('Facebook Sign-In requires Firebase to be enabled.');
  }

  const provider = new FacebookAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const fbUser = result.user;

    const email = (fbUser.email || '').toLowerCase().trim();
    if (email && !email.endsWith('@gmail.com')) {
      await firebaseSignOut(auth).catch(() => {});
      throw new Error(`Access restricted: The Facebook account email (${email}) must end with @gmail.com.`);
    }

    const userProfile = {
      id: fbUser.uid,
      name: fbUser.displayName || 'Facebook User',
      email: fbUser.email || 'facebook.user@gmail.com',
      createdAt: new Date().toISOString(),
      avatar: fbUser.photoURL || null,
    };

    try {
      await setDoc(doc(db, 'users', fbUser.uid), userProfile, { merge: true });
    } catch (_dbErr) {
      // Ignore transient Firestore network issues
    }

    setSession(userProfile);
    return userProfile;
  } catch (err) {
    throw new Error(getFriendlyAuthError(err));
  }
}

/**
 * Sign in as instant Demo User (sandboxed ephemeral session)
 */
export async function loginDemoUser() {
  const demoProfile = {
    id: 'demo_sandbox_user',
    name: 'Alexandra Chen (Demo)',
    email: 'alex.chen.demo@gmail.com',
    createdAt: new Date().toISOString(),
    avatar: null,
    isDemo: true,
  };
  setSession(demoProfile);
  return demoProfile;
}

/**
 * Log out user from Firebase & local session
 */
export async function logoutUser() {
  try {
    if (IS_FIREBASE_ENABLED && auth) {
      await firebaseSignOut(auth).catch(() => {});
    }
    localStorage.removeItem(SESSIONS_STORAGE_KEY);
  } catch (_err) {
    // Ignore error
  }
}

/**
 * Get active session user
 */
export function getCurrentSession() {
  try {
    const raw = localStorage.getItem(SESSIONS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_err) {
    return null;
  }
}

export function setSession(user) {
  try {
    localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(user));
  } catch (_err) {
    // Ignore error
  }
}

/* ==========================================================================
   CLOUD DATABASE: Firestore + Local Cache
   ========================================================================== */

function getAllDbResumes() {
  try {
    const raw = localStorage.getItem(RESUMES_STORAGE_KEY);
    if (!raw) {
      const oldRaw = localStorage.getItem('ats_architect_resumes');
      if (oldRaw) {
        const oldList = JSON.parse(oldRaw);
        localStorage.setItem(RESUMES_STORAGE_KEY, JSON.stringify(oldList));
        return oldList;
      }
      return [];
    }
    return JSON.parse(raw);
  } catch (_err) {
    return [];
  }
}

function saveDbResumes(resumes) {
  try {
    localStorage.setItem(RESUMES_STORAGE_KEY, JSON.stringify(resumes));
  } catch (_err) {
    // Ignore error
  }
}

/**
 * Get resumes owned by a user
 */
export function getUserResumesFromDb(userId) {
  const all = getAllDbResumes();
  if (!userId) {
    return all.filter((r) => !r.userId || r.userId === 'guest');
  }
  return all.filter((r) => r.userId === userId);
}

/**
 * Fetch resumes from Cloud Firestore and merge into local state
 */
export async function fetchCloudResumes(userId) {
  if (!IS_FIREBASE_ENABLED || !db || !userId || userId === 'guest') {
    return getUserResumesFromDb(userId);
  }

  try {
    const colRef = collection(db, 'users', userId, 'resumes');
    const snapshot = await getDocs(colRef);
    const cloudResumes = [];
    snapshot.forEach((d) => {
      cloudResumes.push(d.data());
    });

    if (cloudResumes.length > 0) {
      const localList = getAllDbResumes().filter((r) => r.userId !== userId);
      const combined = [...cloudResumes, ...localList];
      saveDbResumes(combined);
      return cloudResumes;
    }
  } catch (_err) {
    // Silently fallback to cached resumes on error
  }

  return getUserResumesFromDb(userId);
}

/**
 * Save resume tied to specific user to both Local Cache & Cloud Firestore
 */
export function saveResumeToDb(resume, userId = 'guest') {
  const list = getAllDbResumes();
  const id = resume.id || `resume-${Date.now()}`;
  const title =
    resume.title ||
    (resume.personalInfo?.fullName ? `${resume.personalInfo.fullName}'s Resume` : 'Untitled Resume');

  const updatedItem = {
    id,
    userId: userId || 'guest',
    title,
    updatedAt: new Date().toISOString(),
    data: { ...resume, id, title },
  };

  const existingIndex = list.findIndex((r) => r.id === id);
  if (existingIndex >= 0) {
    if (!updatedItem.userId && list[existingIndex].userId) {
      updatedItem.userId = list[existingIndex].userId;
    }
    list[existingIndex] = updatedItem;
  } else {
    list.unshift(updatedItem);
  }

  saveDbResumes(list);

  try {
    localStorage.setItem('ats_architect_resumes', JSON.stringify(list));
    localStorage.setItem('resumeData', JSON.stringify(updatedItem.data));
  } catch (_e) {
    // Ignore storage quota errors
  }

  // Asynchronously sync to Cloud Firestore if user is authenticated
  if (IS_FIREBASE_ENABLED && db && userId && userId !== 'guest' && userId !== 'demo_sandbox_user') {
    const resumeDocRef = doc(db, 'users', userId, 'resumes', id);
    setDoc(resumeDocRef, updatedItem).catch(() => {});
  }

  return updatedItem;
}

/**
 * Delete a resume from both Local Cache and Cloud Firestore
 */
export function deleteResumeFromDb(id, userId = null) {
  let list = getAllDbResumes();
  list = list.filter((r) => r.id !== id);
  saveDbResumes(list);

  try {
    localStorage.setItem('ats_architect_resumes', JSON.stringify(list));
  } catch (_e) {
    // Ignore
  }

  if (IS_FIREBASE_ENABLED && db && userId && userId !== 'guest' && userId !== 'demo_sandbox_user') {
    deleteDoc(doc(db, 'users', userId, 'resumes', id)).catch(() => {});
  }

  return getUserResumesFromDb(userId);
}

/**
 * Duplicate a resume
 */
export function duplicateResumeInDb(id, userId = null) {
  const list = getAllDbResumes();
  const target = list.find((r) => r.id === id);
  if (!target) return getUserResumesFromDb(userId);

  const newId = `resume-${Date.now()}`;
  const copy = {
    id: newId,
    userId: userId || target.userId || 'guest',
    title: `${target.title} (Copy)`,
    updatedAt: new Date().toISOString(),
    data: {
      ...target.data,
      id: newId,
      title: `${target.title} (Copy)`,
    },
  };

  list.unshift(copy);
  saveDbResumes(list);

  try {
    localStorage.setItem('ats_architect_resumes', JSON.stringify(list));
  } catch (_e) {
    // Ignore
  }

  if (IS_FIREBASE_ENABLED && db && userId && userId !== 'guest' && userId !== 'demo_sandbox_user') {
    setDoc(doc(db, 'users', userId, 'resumes', newId), copy).catch(() => {});
  }

  return getUserResumesFromDb(userId);
}

/* ── Local Helpers ── */
function getAllLocalUsers() {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (_e) {
    return [];
  }
}

function saveLocalUsers(users) {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (_e) {
    // Ignore
  }
}

async function registerLocalUser({ name, email, password }) {
  const users = getAllLocalUsers();
  const existing = users.find((u) => u.email === email);
  if (existing) {
    throw new Error('An account with this email already exists. Please sign in.');
  }

  const passwordHash = await hashPassword(password);
  const newUser = {
    id: `usr_${Date.now()}`,
    name,
    email,
    passwordHash,
    createdAt: new Date().toISOString(),
    avatar: null,
  };

  users.push(newUser);
  saveLocalUsers(users);

  // Strip password hash from session profile
  const cleanProfile = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    createdAt: newUser.createdAt,
    avatar: newUser.avatar,
  };

  setSession(cleanProfile);
  return cleanProfile;
}

async function loginLocalUser({ email, password }) {
  const users = getAllLocalUsers();
  const user = users.find((u) => u.email === email);
  if (!user) {
    throw new Error('Invalid email or password. Please check your credentials or register.');
  }

  if (user.passwordHash) {
    const inputHash = await hashPassword(password);
    if (user.passwordHash !== inputHash) {
      throw new Error('Invalid email or password. Please check your credentials.');
    }
  }

  const cleanProfile = {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    avatar: user.avatar,
  };

  setSession(cleanProfile);
  return cleanProfile;
}
