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

// OpenAI's Simple Icons mask URL doesn't render reliably, so this one mark is
// drawn as an inline SVG (24x24 path) filled with currentColor instead. Every
// other monochrome mark uses the mask approach below (mono: true).
const OPENAI_ICON_PATH =
  "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z";

interface StackLogo {
  name: string;
  url?: string;
  // Monochrome brand marks (Next.js, Prisma, etc.) render via a CSS mask
  // filled with the theme foreground color, so they stay legible in both
  // light and dark mode instead of disappearing into the background.
  mono?: boolean;
  // Inline SVG path, used only for marks whose mask URL is unreliable (OpenAI).
  path?: string;
}

const STACK_LOGOS: StackLogo[] = [
  { name: "Python", url: `${DEVICON}/python/python-original.svg` },
  { name: "Django", url: `${DEVICON}/django/django-plain.svg` },
  { name: "JavaScript", url: `${DEVICON}/javascript/javascript-original.svg` },
  { name: "TypeScript", url: `${DEVICON}/typescript/typescript-original.svg` },
  { name: "React", url: `${DEVICON}/react/react-original.svg` },
  { name: "Next.js", url: "https://cdn.simpleicons.org/nextdotjs", mono: true },
  { name: "Vue.js", url: `${DEVICON}/vuejs/vuejs-original.svg` },
  { name: "Node.js", url: `${DEVICON}/nodejs/nodejs-original.svg` },
  { name: "Express", url: "https://cdn.simpleicons.org/express", mono: true },
  { name: "PHP", url: `${DEVICON}/php/php-original.svg` },
  { name: "Laravel", url: `${DEVICON}/laravel/laravel-original.svg` },
  { name: "WordPress", url: `${DEVICON}/wordpress/wordpress-plain.svg` },
  { name: "Twig", url: TwigLogo },
  { name: "MongoDB", url: `${DEVICON}/mongodb/mongodb-original.svg` },
  { name: "PostgreSQL", url: `${DEVICON}/postgresql/postgresql-original.svg` },
  { name: "MySQL", url: `${DEVICON}/mysql/mysql-original.svg` },
  { name: "Prisma", url: "https://cdn.simpleicons.org/prisma", mono: true },
  { name: "AWS", url: `${DEVICON}/amazonwebservices/amazonwebservices-original-wordmark.svg` },
  { name: "Docker", url: `${DEVICON}/docker/docker-original.svg` },
  { name: "Kubernetes", url: `${DEVICON}/kubernetes/kubernetes-plain.svg` },
  { name: "Terraform", url: `${DEVICON}/terraform/terraform-original.svg` },
  { name: "Tailwind CSS", url: `${DEVICON}/tailwindcss/tailwindcss-original.svg` },
  { name: "HTML5", url: `${DEVICON}/html5/html5-original.svg` },
  { name: "CSS3", url: `${DEVICON}/css3/css3-original.svg` },
  { name: "Git", url: `${DEVICON}/git/git-original.svg` },
  { name: "Linux", url: `${DEVICON}/linux/linux-original.svg` },
  { name: "Stripe", url: "https://cdn.simpleicons.org/stripe/635BFF" },
  { name: "Anthropic", url: "https://cdn.simpleicons.org/anthropic", mono: true },
  { name: "OpenAI", path: OPENAI_ICON_PATH },
  { name: "Gemini", url: "https://cdn.simpleicons.org/googlegemini/8E75B2" },
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
            I build software people actually enjoy using. My approach pairs
            strong engineering fundamentals and best practices with AI as a
            development partner, producing technically sound code and
            infrastructure at high velocity. Currently shipping AI-powered
            products at Repify Ai, plus leading engineering on @Team App, an
            AI social publishing platform for athletic departments built on a
            two-person team. Previously at Resi; trained at Fullstack Academy via the
            University of Oklahoma.
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
              {logo.path ? (
                <svg
                  role="img"
                  aria-label={logo.name}
                  viewBox="0 0 24 24"
                  className="h-12 w-12 fill-current text-foreground transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14"
                >
                  <path d={logo.path} />
                </svg>
              ) : logo.mono ? (
                <span
                  role="img"
                  aria-label={logo.name}
                  className="h-12 w-12 bg-foreground transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14"
                  style={{
                    maskImage: `url(${logo.url})`,
                    WebkitMaskImage: `url(${logo.url})`,
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskPosition: "center",
                    maskSize: "contain",
                    WebkitMaskSize: "contain",
                  }}
                />
              ) : (
                <img
                  src={logo.url}
                  alt={logo.name}
                  loading="lazy"
                  className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14"
                />
              )}
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

