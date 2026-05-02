import { useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Mail, MapPin, Phone } from "lucide-react";
import MeChicago from "@/assets/photos/MeChicago.jpg";
import MeAndAddison from "@/assets/photos/MeAndAddison.jpg";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ABOUT_SECTIONS } from "@/data/about";
import { CONTACT } from "@/data/contact";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  rot: number;
}

export function About() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const idRef = useRef(0);
  const lastSpawnRef = useRef(0);

  const handleAddisonMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const now = performance.now();
    if (now - lastSpawnRef.current < 55) return;
    lastSpawnRef.current = now;

    const rect = e.currentTarget.getBoundingClientRect();
    const id = idRef.current++;
    const sparkle: Sparkle = {
      id,
      x: e.clientX - rect.left + (Math.random() - 0.5) * 24,
      y: e.clientY - rect.top + (Math.random() - 0.5) * 24,
      size: 10 + Math.random() * 14,
      rot: Math.random() * 90 - 45,
    };
    setSparkles((prev) => [...prev, sparkle]);
    window.setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== id));
    }, 750);
  };

  return (
    <div>
      {/* Intro */}
      <section className="container-page pt-16 pb-16 md:pt-20">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">
              About
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Hi, I'm Tanner.
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              Full-stack developer with a non-linear path: entrepreneurship
              degree, sales career, then a hard pivot into code. Currently
              shipping production work at Repify Ai. Open to a conversation
              if you're building something I'd be a strong fit for.
            </p>
            <div className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> {CONTACT.location}
              </span>
              <a
                href={CONTACT.phoneHref}
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Phone className="h-4 w-4" /> {CONTACT.phone}
              </a>
              <a
                href={CONTACT.emailHref}
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" /> {CONTACT.email}
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="justify-self-center md:justify-self-end"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/30 to-transparent blur-md" />
              <img
                src={MeChicago}
                alt="Tanner Monaco"
                className="relative h-56 w-56 rounded-2xl object-cover ring-1 ring-border md:h-72 md:w-72"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Personal sections */}
      <section className="container-page py-20">
        <AnimatedSection>
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">
            Outside of code
          </p>
          <h2 className="text-2xl font-bold tracking-tight">A bit more.</h2>
        </AnimatedSection>

        <div className="mt-12 space-y-16">
          {/* Addison: #1 within Outside of code */}
          <AnimatedSection>
            <div
              onMouseMove={handleAddisonMouseMove}
              className="group relative overflow-hidden rounded-2xl border border-yellow-400/40 bg-yellow-400/5 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-yellow-400/70 hover:shadow-xl hover:shadow-yellow-400/20 md:p-10"
            >
              {/* Cursor-trailing sparkles */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 overflow-hidden"
              >
                <AnimatePresence>
                  {sparkles.map((s) => (
                    <motion.span
                      key={s.id}
                      initial={{ scale: 0, opacity: 0, rotate: s.rot }}
                      animate={{
                        scale: [0, 1, 0.6],
                        opacity: [0, 1, 0],
                        rotate: s.rot + 180,
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.75, ease: "easeOut" }}
                      style={{
                        left: s.x,
                        top: s.y,
                        width: s.size,
                        height: s.size,
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 text-yellow-400"
                    >
                      <SparkleStar />
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-yellow-400/25 blur-3xl transition-all duration-500 group-hover:bg-yellow-400/40"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-yellow-400/15 blur-3xl transition-all duration-500 group-hover:bg-yellow-400/30"
              />
              <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-yellow-400" />
                    <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      the most important person on this page
                    </p>
                  </div>
                  <h3 className="text-4xl font-bold italic tracking-tight sm:text-5xl md:text-6xl">
                    My Girlfriend.
                  </h3>
                  <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
                    My favorite person, full stop. Sharp, sweet, and quietly
                    the most creative person I know. The kind who turns a
                    blank page into something better than the rest of us
                    produce on a deadline. She lands on the kind thing first,
                    makes complicated things look easy, and somehow does all
                    of it without making a show of it. Top billing here on
                    purpose.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {[
                      "★ creative powerhouse",
                      "★ sharper mind in the room",
                      "★ the sweetest human alive",
                      "★ #1",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-yellow-400/50 bg-background/80 px-3 py-1 font-mono text-xs uppercase tracking-wider text-foreground/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="justify-self-center md:justify-self-end">
                  <div className="relative transition-transform duration-500 ease-out group-hover:-rotate-2 group-hover:scale-105">
                    <div
                      aria-hidden
                      className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-yellow-400/50 to-transparent blur-md transition-all duration-500 group-hover:-inset-2 group-hover:blur-lg"
                    />
                    <img
                      src={MeAndAddison}
                      alt="Tanner and Addison"
                      className="relative h-48 w-48 rounded-2xl object-cover ring-1 ring-yellow-400/40 transition-all duration-500 group-hover:ring-2 group-hover:ring-yellow-400/70 md:h-60 md:w-60"
                    />
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {ABOUT_SECTIONS.map((section) => (
            <div key={section.heading}>
              <AnimatedSection>
                <h3 className="mb-6 font-mono text-sm uppercase tracking-wider text-foreground">
                  · {section.heading}
                </h3>
              </AnimatedSection>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {section.items.map((item, i) => (
                  <AnimatedSection
                    key={item.title}
                    delay={i * 0.05}
                    direction="up"
                  >
                    <div className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary hover:shadow-md">
                      <div className="aspect-[4/3] overflow-hidden bg-muted">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-sm font-medium">{item.title}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function SparkleStar() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="h-full w-full drop-shadow-[0_0_6px_rgba(250,204,21,0.85)]"
    >
      <path d="M12 0L13 11L24 12L13 13L12 24L11 13L0 12L11 11Z" />
    </svg>
  );
}
