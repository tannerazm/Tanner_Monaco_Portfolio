import { cn } from "@/lib/utils";
import { useEggHunt } from "@/components/EggHuntProvider";
import TMLogo from "@/assets/logos/TM_Logo_Mountain_And_Brackets.png";
import TMLogoBW from "@/assets/logos/TM_Logo_Mountain_And_Brackets_BW.png";

// A small brand mark hidden on a page. Visually subtle (low opacity, BW) when
// unfound; once clicked, swaps to the red logo at higher opacity so the user
// can see what they spotted.
export function HiddenLogo({
  id,
  className,
  size = 18,
  title,
}: {
  id: string;
  className?: string;
  size?: number;
  title?: string;
}) {
  const { findEgg, foundIds } = useEggHunt();
  const isFound = foundIds.includes(id);

  return (
    <button
      type="button"
      onClick={() => findEgg(id)}
      aria-label={title || "Tanner Monaco mark"}
      title={isFound ? "Found." : "Ohh, what's this?"}
      className={cn(
        "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm transition-opacity duration-200",
        isFound
          ? "opacity-90 hover:opacity-100"
          : "opacity-15 hover:opacity-90 dark:invert",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <img
        src={isFound ? TMLogo : TMLogoBW}
        alt=""
        aria-hidden
        className="h-full w-full object-contain"
        draggable={false}
      />
    </button>
  );
}
