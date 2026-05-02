import posthog from "posthog-js";

const apiKey = import.meta.env.VITE_POSTHOG_KEY;
const apiHost = import.meta.env.VITE_POSTHOG_HOST ?? "https://us.i.posthog.com";

let initialized = false;

export function initPostHog() {
  if (initialized) return;
  if (!apiKey) {
    if (import.meta.env.DEV) {
      console.warn(
        "[posthog] VITE_POSTHOG_KEY is not set. Analytics disabled.",
      );
    }
    return;
  }

  posthog.init(apiKey, {
    api_host: apiHost,
    // SPA pageviews are captured manually via PostHogPageView.
    capture_pageview: false,
    capture_pageleave: true,
    persistence: "localStorage+cookie",
    autocapture: true,
    disable_session_recording: false,
    loaded: (ph) => {
      if (import.meta.env.DEV) ph.debug();
    },
  });

  initialized = true;
}

export { posthog };
