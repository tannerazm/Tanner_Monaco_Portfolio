import { useMemo } from "react";
import { motion } from "motion/react";

const COLORS = [
  "#dc2626", // red
  "#facc15", // yellow
  "#10b981", // green
  "#3b82f6", // blue
  "#a855f7", // purple
  "#f97316", // orange
];

interface Piece {
  id: number;
  startX: number; // vw
  drift: number; // px horizontal sway
  size: number;
  rotate: number;
  color: string;
  duration: number;
  delay: number;
}

export function Confetti({ count = 90 }: { count?: number }) {
  const pieces = useMemo<Piece[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      startX: Math.random() * 100,
      drift: (Math.random() - 0.5) * 240,
      size: 6 + Math.random() * 8,
      rotate: (Math.random() - 0.5) * 720,
      color: COLORS[i % COLORS.length],
      duration: 2.2 + Math.random() * 1.6,
      delay: Math.random() * 0.5,
    }));
  }, [count]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
    >
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          initial={{
            top: -20,
            left: `${p.startX}vw`,
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            top: "110vh",
            left: `calc(${p.startX}vw + ${p.drift}px)`,
            rotate: p.rotate,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeIn",
            times: [0, 0.85, 1],
          }}
          className="absolute"
          style={{
            width: p.size,
            height: p.size * 0.4,
            backgroundColor: p.color,
            borderRadius: 1,
          }}
        />
      ))}
    </div>
  );
}
