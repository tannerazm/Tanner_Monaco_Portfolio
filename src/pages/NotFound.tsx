import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HiddenLogo } from "@/components/HiddenLogo";
import { useEggHunt } from "@/components/EggHuntProvider";
import { NOT_FOUND_ID, TOTAL_EGGS } from "@/lib/eggHunt";

const GAME_W = 720;
const GAME_H = 240;
const PLAYER_X = 96;
const PLANE_W = 32;
const PLANE_H = 18;
const GRAVITY = 0.3;
const LIFT = -1.05;
const MAX_VY = 6;
const HS_KEY = "tm_404_hs";

// Plane hitbox sample points (relative to player center). Only the body line,
// not the wingtips — those visual flourishes shouldn't trigger collisions.
const PLANE_HIT_POINTS = [
  { dx: 11, dy: 0 }, // near nose
  { dx: 4, dy: -3 }, // upper body
  { dx: 4, dy: 3 }, // lower body
  { dx: -3, dy: 0 }, // mid body
  { dx: -10, dy: 0 }, // tail
];

// Returns the spike's depth at horizontal position px, or 0 if outside the
// obstacle's horizontal range. Used for both the downward stalactite and the
// upward mountain (their geometry is mirror-symmetric).
function spikeDepthAt(px: number, ox: number, ow: number, oh: number) {
  if (px < ox || px > ox + ow) return 0;
  const centerDist = Math.abs(px - ox - ow / 2);
  const half = ow / 2;
  const ratio = 1 - centerDist / half;
  return Math.max(0, oh * ratio);
}

type GameState = "idle" | "playing" | "over";

interface ObstaclePair {
  x: number;
  gapY: number; // top of the gap
  gapH: number; // height of the gap
  w: number;
}

function readCssVar(name: string, fallback: string) {
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return v || fallback;
}

function drawPlane(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  vy: number,
  color: string,
) {
  ctx.save();
  ctx.translate(x, y);
  // Tilt plane proportionally to velocity (climb / dive feel)
  const tilt = Math.max(-0.45, Math.min(0.45, vy * 0.07));
  ctx.rotate(tilt);

  // Body — paper-airplane silhouette
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(16, 0); // nose
  ctx.lineTo(-16, -10); // top-back wingtip
  ctx.lineTo(-8, 0); // inner fold
  ctx.lineTo(-16, 10); // bottom-back wingtip
  ctx.closePath();
  ctx.fill();

  // Inner fold crease
  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(-16, -10);
  ctx.lineTo(-8, 0);
  ctx.lineTo(-16, 10);
  ctx.stroke();

  ctx.restore();
}

function drawTopSpike(
  ctx: CanvasRenderingContext2D,
  x: number,
  w: number,
  h: number,
  color: string,
) {
  if (h <= 0) return;
  const peakX = x + w / 2;
  // Base triangle (matches collision shape exactly)
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.lineTo(x + w, 0);
  ctx.lineTo(peakX, h);
  ctx.closePath();
  ctx.fill();
  // Right-side shadow for 3D depth
  ctx.fillStyle = "rgba(0,0,0,0.18)";
  ctx.beginPath();
  ctx.moveTo(peakX, h);
  ctx.lineTo(x + w, 0);
  ctx.lineTo(peakX, 0);
  ctx.closePath();
  ctx.fill();
  // Subtle ridgeline highlight on the left slope
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.lineTo(peakX, h);
  ctx.stroke();
}

function drawBottomMountain(
  ctx: CanvasRenderingContext2D,
  x: number,
  w: number,
  h: number,
  color: string,
) {
  if (h <= 0) return;
  const peakX = x + w / 2;
  const peakY = GAME_H - h;
  const baseY = GAME_H;

  // Base mountain triangle (matches collision exactly)
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, baseY);
  ctx.lineTo(x + w, baseY);
  ctx.lineTo(peakX, peakY);
  ctx.closePath();
  ctx.fill();

  // Right-side shadow (assume light from the left)
  ctx.fillStyle = "rgba(0,0,0,0.22)";
  ctx.beginPath();
  ctx.moveTo(peakX, peakY);
  ctx.lineTo(x + w, baseY);
  ctx.lineTo(peakX, baseY);
  ctx.closePath();
  ctx.fill();

  // Ridgeline highlight on left slope
  ctx.strokeStyle = "rgba(255,255,255,0.22)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x, baseY);
  ctx.lineTo(peakX, peakY);
  ctx.stroke();

  // Snow cap — small jagged white triangle at the peak (only on tall enough)
  if (h >= 36) {
    const capDepth = Math.min(h * 0.32, 14);
    const ratio = capDepth / h;
    const capHalfW = (w / 2) * ratio;
    const capBaseY = peakY + capDepth;

    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.beginPath();
    ctx.moveTo(peakX, peakY); // peak
    ctx.lineTo(peakX + capHalfW, capBaseY); // bottom-right of cap
    // Two-step jag along the snow line so the bottom edge isn't a clean line
    ctx.lineTo(peakX + capHalfW * 0.45, capBaseY - 2);
    ctx.lineTo(peakX, capBaseY + 1);
    ctx.lineTo(peakX - capHalfW * 0.45, capBaseY - 2);
    ctx.lineTo(peakX - capHalfW, capBaseY); // bottom-left of cap
    ctx.closePath();
    ctx.fill();

    // Tiny shadow under-side on the cap's right edge
    ctx.fillStyle = "rgba(0,0,0,0.12)";
    ctx.beginPath();
    ctx.moveTo(peakX, peakY);
    ctx.lineTo(peakX + capHalfW, capBaseY);
    ctx.lineTo(peakX, capBaseY);
    ctx.closePath();
    ctx.fill();
  }
}

function drawHorizon(ctx: CanvasRenderingContext2D, color: string) {
  // Subtle horizon line + dotted ground texture for some atmosphere
  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.fillStyle = color;
  ctx.fillRect(0, GAME_H - 1, GAME_W, 1);
  ctx.fillRect(0, 0, GAME_W, 1);
  ctx.restore();
}

export function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<GameState>("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const stateRef = useRef<GameState>("idle");
  stateRef.current = state;

  const animRef = useRef<number | undefined>(undefined);
  const liftingRef = useRef(false);

  const { foundIds, showNudge } = useEggHunt();

  // Load high score
  useEffect(() => {
    const stored = Number(localStorage.getItem(HS_KEY) || 0);
    if (Number.isFinite(stored)) setHighScore(stored);
  }, []);

  // If they land on the 404 page with 5/6 marks found and the 404 mark is
  // the missing one, give them a friendly nudge.
  useEffect(() => {
    if (
      foundIds.length === TOTAL_EGGS - 1 &&
      !foundIds.includes(NOT_FOUND_ID)
    ) {
      showNudge("Now where's that final one?");
    }
  }, [foundIds, showNudge]);

  // Static idle / over frame
  const drawStaticFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const primary = readCssVar("--primary", "#dc2626");
    const fg = readCssVar("--foreground", "#000");

    ctx.clearRect(0, 0, GAME_W, GAME_H);
    drawHorizon(ctx, fg);
    drawPlane(ctx, PLAYER_X, GAME_H / 2, 0, primary);
  }, []);

  useEffect(() => {
    if (state === "idle" || state === "over") drawStaticFrame();
  }, [state, drawStaticFrame]);

  // Game loop
  useEffect(() => {
    if (state !== "playing") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const primary = readCssVar("--primary", "#dc2626");
    const fg = readCssVar("--foreground", "#000");

    const player = { y: GAME_H / 2, vy: 0 };
    let obstacles: ObstaclePair[] = [];
    let speed = 2.6;
    let lastTime = performance.now();
    let ticks = 0;
    let localScore = 0;

    const endRun = () => {
      if (animRef.current !== undefined) {
        cancelAnimationFrame(animRef.current);
        animRef.current = undefined;
      }
      setHighScore((prev) => {
        const next = Math.max(prev, localScore);
        if (next !== prev) localStorage.setItem(HS_KEY, String(next));
        return next;
      });
      setScore(localScore);
      setState("over");
    };

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 16.67, 2);
      lastTime = time;
      ticks += 1;

      // Physics
      if (liftingRef.current) player.vy += LIFT * dt;
      player.vy += GRAVITY * dt;
      player.vy = Math.max(-MAX_VY, Math.min(MAX_VY, player.vy));
      player.y += player.vy * dt;

      // Out of bounds = game over
      if (player.y - PLANE_H / 2 < 0 || player.y + PLANE_H / 2 > GAME_H) {
        endRun();
        return;
      }

      // Spawn obstacle pairs with generous spacing
      const last = obstacles[obstacles.length - 1];
      if (!last || last.x < GAME_W - 290 - Math.random() * 140) {
        const gapH = 100 + Math.random() * 35;
        const gapY = 30 + Math.random() * (GAME_H - gapH - 60);
        obstacles.push({ x: GAME_W, gapY, gapH, w: 38 });
      }

      // Move + cull
      for (const o of obstacles) o.x -= speed * dt;
      obstacles = obstacles.filter((o) => o.x > -50);

      // Collision: sample the plane's body (not wings) against the actual
      // triangle shape of each spike. Way more forgiving than a bbox check.
      for (const o of obstacles) {
        const topH = o.gapY;
        const bottomH = GAME_H - (o.gapY + o.gapH);
        for (const p of PLANE_HIT_POINTS) {
          const px = PLAYER_X + p.dx;
          const py = player.y + p.dy;
          const topDepth = spikeDepthAt(px, o.x, o.w, topH);
          if (topDepth > 0 && py < topDepth) {
            endRun();
            return;
          }
          const bottomDepth = spikeDepthAt(px, o.x, o.w, bottomH);
          if (bottomDepth > 0 && py > GAME_H - bottomDepth) {
            endRun();
            return;
          }
        }
      }

      // Score & gentle difficulty ramp
      if (ticks % 4 === 0) {
        localScore += 1;
        setScore(localScore);
      }
      if (ticks % 320 === 0) speed = Math.min(speed + 0.2, 5);

      // Render
      ctx.clearRect(0, 0, GAME_W, GAME_H);
      drawHorizon(ctx, fg);
      for (const o of obstacles) {
        drawTopSpike(ctx, o.x, o.w, o.gapY, primary);
        drawBottomMountain(ctx, o.x, o.w, GAME_H - (o.gapY + o.gapH), primary);
      }
      drawPlane(ctx, PLAYER_X, player.y, player.vy, primary);

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current !== undefined) {
        cancelAnimationFrame(animRef.current);
        animRef.current = undefined;
      }
    };
  }, [state]);

  const startGame = useCallback(() => {
    setScore(0);
    setState("playing");
  }, []);

  // Keyboard
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        if (stateRef.current !== "playing") {
          startGame();
        } else {
          liftingRef.current = true;
        }
      }
    };
    const up = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        liftingRef.current = false;
      }
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [startGame]);

  // Pointer (mouse + touch unified)
  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    if (stateRef.current !== "playing") {
      startGame();
    } else {
      liftingRef.current = true;
    }
  };
  const onPointerUp = () => {
    liftingRef.current = false;
  };

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-16 text-center md:py-20">
      <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-4">
        404 // off trail
      </p>
      <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
        You're lost... or are you?
      </h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        While you figure out where you meant to go, fly the plane. Hold SPACE
        (or click / tap) to climb. Release to descend. Don't hit the
        mountains.
      </p>

      <div className="mt-8 w-full max-w-[720px]">
        <div className="mb-2 flex items-center justify-between font-mono text-xs">
          <span className="text-muted-foreground">
            Score:{" "}
            <span className="font-semibold text-foreground">{score}</span>
          </span>
          <span className="flex items-center gap-2 text-muted-foreground">
            High:{" "}
            <span className="font-semibold text-foreground">{highScore}</span>
            <HiddenLogo id="404" size={11} />
          </span>
        </div>
        <canvas
          ref={canvasRef}
          width={GAME_W}
          height={GAME_H}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          className="block h-auto w-full touch-none cursor-pointer rounded-lg border border-border bg-background"
        />
        <p className="mt-2 font-mono text-xs text-muted-foreground">
          {state === "idle" && "Click the canvas or press SPACE to start."}
          {state === "playing" && "Hold to climb. Release to descend."}
          {state === "over" &&
            (score > 0 && score >= highScore
              ? `Crashed. New high score: ${score}. Press SPACE to fly again.`
              : `Crashed. Score: ${score}. Press SPACE to fly again.`)}
        </p>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <Link to="/">Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/projects">Projects</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/resume">Resume</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/contact">Contact</Link>
        </Button>
      </div>
    </div>
  );
}
