import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { usePostHog } from "posthog-js/react";
import {
  EGG_HUNT,
  NOT_FOUND_ID,
  TOTAL_EGGS,
  isKnownRoute,
  loadFound,
  saveFound,
} from "@/lib/eggHunt";

interface EggHuntState {
  foundIds: string[];
  totalEggs: number;
  toastEgg: string | null;
  nudgeMessage: string | null;
  showComplete: boolean;
  findEgg: (id: string) => void;
  showNudge: (message: string) => void;
  dismissToast: () => void;
  dismissNudge: () => void;
  dismissComplete: () => void;
}

const Ctx = createContext<EggHuntState | null>(null);

const SAFETY_REDIRECT_MS = 60_000;

export function EggHuntProvider({ children }: { children: ReactNode }) {
  const posthog = usePostHog();
  const [foundIds, setFoundIds] = useState<string[]>(() => loadFound());
  const [toastEgg, setToastEgg] = useState<string | null>(null);
  const [nudgeMessage, setNudgeMessage] = useState<string | null>(null);
  const [showComplete, setShowComplete] = useState(false);
  const navigate = useNavigate();

  const findEgg = useCallback(
    (id: string) => {
      setFoundIds((prev) => {
        if (prev.includes(id)) return prev;
        const next = [...prev, id];
        saveFound(next);

        if (next.length === TOTAL_EGGS) {
          posthog?.capture("egg_hunt_completed", {
            total_eggs: TOTAL_EGGS,
          });
          setShowComplete(true);
          return next;
        }

        posthog?.capture("egg_found", {
          egg_id: id,
          eggs_found: next.length,
          eggs_remaining: TOTAL_EGGS - next.length,
        });
        setToastEgg(id);
        setNudgeMessage(null);
        return next;
      });
    },
    [posthog],
  );

  const showNudge = useCallback((message: string) => {
    setNudgeMessage(message);
    setToastEgg(null);
  }, []);

  // Safety net: when 5 of 6 are found and the only missing one is the 404
  // mark, give them 60 seconds to wander to the 404 page themselves. If
  // they haven't, redirect them to a non-existent route so the catch-all
  // renders and they can spot the last logo.
  useEffect(() => {
    if (foundIds.length !== TOTAL_EGGS - 1) return;
    if (foundIds.includes(NOT_FOUND_ID)) return;

    const timer = window.setTimeout(() => {
      if (isKnownRoute(window.location.pathname)) {
        navigate("/off-trail");
      }
    }, SAFETY_REDIRECT_MS);

    return () => window.clearTimeout(timer);
  }, [foundIds, navigate]);

  return (
    <Ctx.Provider
      value={{
        foundIds,
        totalEggs: TOTAL_EGGS,
        toastEgg,
        nudgeMessage,
        showComplete,
        findEgg,
        showNudge,
        dismissToast: () => setToastEgg(null),
        dismissNudge: () => setNudgeMessage(null),
        dismissComplete: () => setShowComplete(false),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useEggHunt(): EggHuntState {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error("useEggHunt must be used inside <EggHuntProvider>");
  }
  return ctx;
}

// Re-export so consumers don't need a separate import
export { EGG_HUNT };
