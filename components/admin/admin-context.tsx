"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { getFirebaseApp, ADMIN_EMAIL } from "@/config/firebase";
import type { Locale } from "@/lib/i18n";

interface AdminContextValue {
  user: User | null;
  loading: boolean;
  isAuthorized: boolean;
  authError: string | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  locale: Locale;
  toggleLocale: () => void;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [locale, setLocale] = useState<Locale>("ar");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("reda_admin_locale");
      if (saved === "en" || saved === "ar") {
        setLocale(saved);
      }
    } catch {}
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale((prev) => {
      const next = prev === "ar" ? "en" : "ar";
      try {
        window.localStorage.setItem("reda_admin_locale", next);
      } catch {}
      return next;
    });
  }, []);

  useEffect(() => {
    const auth = getAuth(getFirebaseApp());
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      const email = (currentUser.email || "").trim().toLowerCase();
      if (email !== ADMIN_EMAIL) {
        setAuthError(
          `Unauthorized account (${currentUser.email}). Only ${ADMIN_EMAIL} is allowed.`,
        );
        await firebaseSignOut(auth);
        setUser(null);
        setLoading(false);
        return;
      }

      setAuthError(null);
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setAuthError(null);
    setLoading(true);
    try {
      const auth = getAuth(getFirebaseApp());
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const cred = await signInWithPopup(auth, provider);
      const email = (cred.user.email || "").trim().toLowerCase();
      if (email !== ADMIN_EMAIL) {
        await firebaseSignOut(auth);
        setAuthError(
          `Access denied for ${cred.user.email}. Strictly limited to ${ADMIN_EMAIL}.`,
        );
        setUser(null);
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to sign in with Google.";
      setAuthError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    const auth = getAuth(getFirebaseApp());
    await firebaseSignOut(auth);
    setUser(null);
  }, []);

  const isAuthorized =
    !!user && (user.email || "").trim().toLowerCase() === ADMIN_EMAIL;

  return (
    <AdminContext.Provider
      value={{
        user,
        loading,
        isAuthorized,
        authError,
        signInWithGoogle,
        signOut,
        locale,
        toggleLocale,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return ctx;
}
