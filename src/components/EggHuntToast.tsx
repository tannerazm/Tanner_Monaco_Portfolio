import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEggHunt } from "@/components/EggHuntProvider";
import { getActiveHint } from "@/lib/eggHunt";

export function EggHuntToast() {
  const {
    toastEgg,
    nudgeMessage,
    totalEggs,
    foundIds,
    dismissToast,
    dismissNudge,
  } = useEggHunt();

  // Auto-dismiss the find toast after 8s
  useEffect(() => {
    if (!toastEgg) return;
    const t = window.setTimeout(dismissToast, 8000);
    return () => window.clearTimeout(t);
  }, [toastEgg, dismissToast]);

  // Auto-dismiss the nudge after 9s
  useEffect(() => {
    if (!nudgeMessage) return;
    const t = window.setTimeout(dismissNudge, 9000);
    return () => window.clearTimeout(t);
  }, [nudgeMessage, dismissNudge]);

  const hint = getActiveHint(foundIds);
  const showFind = !!toastEgg && !nudgeMessage;
  const showNudge = !!nudgeMessage;

  return (
    <AnimatePresence>
      {showNudge && (
        <motion.div
          key="nudge"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 max-w-sm rounded-lg border border-primary/40 bg-background p-4 shadow-lg"
          role="status"
        >
          <button
            type="button"
            onClick={dismissNudge}
            aria-label="Dismiss"
            className="absolute right-2 top-2 rounded p-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-3 w-3" />
          </button>
          <p className="font-mono text-xs uppercase tracking-wider text-primary">
            ✦ You're warm
          </p>
          <p className="mt-1 pr-4 text-sm">{nudgeMessage}</p>
        </motion.div>
      )}
      {showFind && (
        <motion.div
          key="find"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 max-w-sm rounded-lg border border-border bg-background p-4 shadow-lg"
          role="status"
        >
          <button
            type="button"
            onClick={dismissToast}
            aria-label="Dismiss"
            className="absolute right-2 top-2 rounded p-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-3 w-3" />
          </button>
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            ✦{" "}
            <span className="font-semibold text-foreground">
              {foundIds.length}
            </span>{" "}
            of {totalEggs} marks found
          </p>
          {hint && (
            <p className="mt-1.5 pr-4 text-sm leading-relaxed">
              <span className="text-muted-foreground">Hint: </span>
              {hint}
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
