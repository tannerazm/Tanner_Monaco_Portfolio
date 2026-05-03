import { AnimatePresence, motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/Confetti";
import { useEggHunt } from "@/components/EggHuntProvider";

export function EggHuntComplete() {
  const { showComplete, totalEggs, dismissComplete } = useEggHunt();
  const navigate = useNavigate();

  const closeAndGoHome = () => {
    dismissComplete();
    navigate("/");
  };

  return (
    <AnimatePresence>
      {showComplete && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={closeAndGoHome}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="egg-hunt-complete-title"
            className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-background p-8 text-center shadow-2xl"
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
              All marks found
            </p>
            <h2
              id="egg-hunt-complete-title"
              className="text-3xl font-bold tracking-tight"
            >
              You found all {totalEggs}.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Sharp eye. The same attention to detail I bring to my code.
              Since you're already here, the rest of the portfolio is worth a
              real look.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <Button asChild size="sm">
                <Link to="/projects" onClick={dismissComplete}>
                  Browse projects
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link to="/resume" onClick={dismissComplete}>
                  Read my resume
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link to="/contact" onClick={dismissComplete}>
                  Get in touch
                </Link>
              </Button>
            </div>
            <button
              type="button"
              onClick={closeAndGoHome}
              className="mt-5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Take me back home
            </button>
          </motion.div>
          <Confetti />
        </>
      )}
    </AnimatePresence>
  );
}
