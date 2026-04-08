"use client";

import { useEffect } from "react";
import { loadFirebaseAnalytics } from "@/config/firebase";

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export default function FirebaseAnalyticsLoader() {
  useEffect(() => {
    const idleWindow = window as IdleWindow;
    const load = () => {
      void loadFirebaseAnalytics();
    };

    if (typeof idleWindow.requestIdleCallback === "function") {
      const handle = idleWindow.requestIdleCallback(load, { timeout: 4000 });

      return () => {
        if (typeof idleWindow.cancelIdleCallback === "function") {
          idleWindow.cancelIdleCallback(handle);
        }
      };
    }

    const timeout = window.setTimeout(load, 2500);
    return () => window.clearTimeout(timeout);
  }, []);

  return null;
}
