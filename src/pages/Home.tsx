import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/AnimatedSection";
import { HiddenLogo } from "@/components/HiddenLogo";
import { CONTACT } from "@/data/contact";
import TwigLogo from "@/assets/programmingicons/TwigLogo.png";

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

interface StackLogo {
  name: string;
  url: string;
}

const STACK_LOGOS: StackLogo[] = [
  { name: "Python", url: `${DEVICON}/python/python-original.svg` },
  { name: "Django", url: `${DEVICON}/django/django-plain.svg` },
  { name: "JavaScript", url: `${DEVICON}/javascript/javascript-original.svg` },
  { name: "React", url: `${DEVICON}/react/react-original.svg` },
  { name: "Vue.js", url: `${DEVICON}/vuejs/vuejs-original.svg` },
  { name: "Node.js", url: `${DEVICON}/nodejs/nodejs-original.svg` },
  { name: "Express", url: `${DEVICON}/express/express-original.svg` },
  { name: "PHP", url: `${DEVICON}/php/php-original.svg` },
  { name: "Laravel", url: `${DEVICON}/laravel/laravel-original.svg` },
  { name: "Twig", url: TwigLogo },
  { name: "MongoDB", url: `${DEVICON}/mongodb/mongodb-original.svg` },
  { name: "PostgreSQL", url: `${DEVICON}/postgresql/postgresql-original.svg` },
  { name: "MySQL", url: `${DEVICON}/mysql/mysql-original.svg` },
  { name: "AWS", url: `${DEVICON}/amazonwebservices/amazonwebservices-original-wordmark.svg` },
  { name: "Docker", url: `${DEVICON}/docker/docker-original.svg` },
  { name: "Kubernetes", url: `${DEVICON}/kubernetes/kubernetes-plain.svg` },
  { name: "Tailwind CSS", url: `${DEVICON}/tailwindcss/tailwindcss-original.svg` },
  { name: "HTML5", url: `${DEVICON}/html5/html5-original.svg` },
  { name: "CSS3", url: `${DEVICON}/css3/css3-original.svg` },
  { name: "Git", url: `${DEVICON}/git/git-original.svg` },
  { name: "Linux", url: `${DEVICON}/linux/linux-original.svg` },
  { name: "Stripe", url: "https://cdn.simpleicons.org/stripe/635BFF" },
];

const HERO_NAME = "Tanner.Monaco";
const HERO_TAIL = "...";
const HERO_FULL = HERO_NAME + HERO_TAIL;
const BRAND_DOT_INDEX = "Tanner".length; // position of the brand period

function TypedName() {
  const [text, setText] = useState("");
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setReduceMotion(true);
      setText(HERO_FULL);
      return;
    }

    let cancelled = false;
    let i = 0;
    let timer: number | undefined;

    const advance = () => {
      if (cancelled) return;
      i += 1;
      setText(HERO_FULL.slice(0, i));
      if (i >= HERO_FULL.length) return;

      let nextDelay: number;
      if (i === HERO_NAME.length) nextDelay = 750; // pause before first dot
      else if (i > HERO_NAME.length) nextDelay = 420; // between dots
      else nextDelay = 140; // typing the name
      timer = window.setTimeout(advance, nextDelay);
    };

    timer = window.setTimeout(advance, 400);
    return () => {
      cancelled = true;
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);

  const beforeDot = text.slice(0, BRAND_DOT_INDEX);
  const showDot = text.length > BRAND_DOT_INDEX;
  const afterDot = text.length > BRAND_DOT_INDEX + 1
    ? text.slice(BRAND_DOT_INDEX + 1)
    : "";

  return (
    <>
      <span className="sr-only">Tanner Monaco.</span>
      <span
        aria-hidden="true"
        className="font-mono"
        style={{ fontFeatureSettings: '"liga" 0, "calt" 0' }}
      >
        {beforeDot}
        {showDot && <span className="text-primary">.</span>}
        {afterDot}
        <span
          className={`ml-1 inline-block h-[0.75em] w-[0.55em] bg-current align-baseline ${
            reduceMotion ? "" : "animate-[caret-blink_1.1s_linear_infinite]"
          }`}
        />
      </span>
    </>
  );
}

export function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="container-page pt-20 pb-24 md:pt-28 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <Badge variant="mono" className="mb-6">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Currently at Repify Ai. Open to the right conversation
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <TypedName />
            <br />
            <span className="text-muted-foreground">
              Full-stack developer.
            </span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            I build clean, well-tested software end-to-end. Currently on a
            Python, Django + MongoDB, and React stack at Repify Ai,
            containerized with Docker, orchestrated on Kubernetes, and
            deployed to AWS via infrastructure-as-code. I scale small teams
            by treating AI as core engineering infrastructure across the
            SDLC: code generation, AI-driven CI/CD, automated PR reviews,
            and ticket/epic generation. Previously at Resi; trained at
            Fullstack Academy via the University of Oklahoma.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link to="/contact">
                Get in touch <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/projects">View projects</Link>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {CONTACT.location}
            </span>
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href={CONTACT.emailHref}
              className="flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
              {CONTACT.email}
            </a>
            <HiddenLogo id="home" size={12} />
          </div>
        </motion.div>
      </section>

      {/* Stack marquee */}
      <section className="border-y border-border bg-secondary/30 py-16 md:py-20">
        <AnimatedSection>
          <div className="container-page mb-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">
                Stack
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                The tools.
              </h2>
            </div>
          </div>
        </AnimatedSection>

        <StackMarquee />
      </section>

      {/* If you're hiring */}
      <section className="border-t border-border bg-secondary/30">
        <div className="container-page py-20 md:py-24">
          <AnimatedSection>
            <div className="mb-10 max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">
                Hiring?
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                If you're building something interesting, I want to hear
                about it.
              </h2>
              <p className="mt-4 text-muted-foreground">
                I love hearing about what other teams are building,
                especially where AI, infrastructure, or product engineering
                meets real-world impact. Drop me a note below, or a phone
                call or email also works.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link to="/contact">
                  Get in touch <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/resume">View resume</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

function StackMarquee() {
  const [paused, setPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Infinite manual scroll: render 3 copies, start in the middle copy, and
  // teleport-wrap when the user scrolls past either copy boundary. The wrap
  // is invisible because the copies are identical.
  useEffect(() => {
    const scrollEl = scrollRef.current;
    const innerEl = innerRef.current;
    if (!scrollEl || !innerEl) return;

    let copyWidth = 0;
    let positioned = false;

    const measure = () => {
      const next = innerEl.scrollWidth / 3;
      if (next <= 0) return;
      copyWidth = next;
      if (!positioned) {
        scrollEl.scrollLeft = copyWidth;
        positioned = true;
      }
    };

    const initialTimer = window.setTimeout(measure, 50);
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(innerEl);

    const handleScroll = () => {
      if (copyWidth === 0) return;
      if (scrollEl.scrollLeft >= copyWidth * 2) {
        scrollEl.scrollLeft -= copyWidth;
      } else if (scrollEl.scrollLeft <= 0) {
        scrollEl.scrollLeft += copyWidth;
      }
    };

    scrollEl.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.clearTimeout(initialTimer);
      resizeObserver.disconnect();
      scrollEl.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="relative"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div
        ref={scrollRef}
        className="overflow-x-auto overscroll-x-contain touch-pan-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div
          ref={innerRef}
          className="flex w-max gap-12 motion-safe:animate-[marquee_45s_linear_infinite]"
          style={{ animationPlayState: paused ? "paused" : "running" }}
          aria-label="Technology stack"
        >
          {[...STACK_LOGOS, ...STACK_LOGOS, ...STACK_LOGOS].map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="group flex flex-shrink-0 flex-col items-center gap-2 px-2"
            >
              <img
                src={logo.url}
                alt={logo.name}
                loading="lazy"
                className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14"
              />
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Edge fades */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-secondary/30 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-secondary/30 to-transparent"
      />
    </div>
  );
}

