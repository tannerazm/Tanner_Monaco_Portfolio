import { useEffect, type ReactNode } from "react";
import { PostHogProvider as Provider } from "posthog-js/react";
import { initPostHog, posthog } from "@/lib/posthog";

export function PostHogProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    initPostHog();
  }, []);

  if (!import.meta.env.VITE_POSTHOG_KEY) {
    // No-op when analytics aren't configured (e.g. local dev without a key).
    return <>{children}</>;
  }

  return <Provider client={posthog}>{children}</Provider>;
}
