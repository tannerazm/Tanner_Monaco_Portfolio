import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/AnimatedSection";
import { getProjectBySlug } from "@/data/projects";
import { NotFound } from "@/pages/NotFound";

export function ProjectDetail() {
  const { slug } = useParams();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) return <NotFound />;

  const displayDate = project.date.split(" - ")[0];

  return (
    <div className="container-page py-12 md:py-16">
      <Button asChild variant="ghost" size="sm" className="mb-8 -ml-3">
        <Link to="/projects">
          <ArrowLeft className="h-4 w-4" /> All projects
        </Link>
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {displayDate}
        </div>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          {project.name}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
          {project.tagline}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button asChild>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View live <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </Button>
          {project.reference && (
            <Button asChild variant="outline">
              <a
                href={project.reference}
                target="_blank"
                rel="noopener noreferrer"
              >
                Reference <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </Button>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <Badge key={tech} variant="mono">
              {tech}
            </Badge>
          ))}
        </div>
      </motion.div>

      <AnimatedSection delay={0.1}>
        <div className="mt-12 overflow-hidden rounded-xl border border-border bg-card">
          <img
            src={project.image}
            alt={project.name}
            className="h-auto w-full object-cover"
          />
        </div>
      </AnimatedSection>

      <div className="mt-12 grid gap-8 md:grid-cols-[1fr_2fr]">
        <AnimatedSection direction="left">
          <div className="md:sticky md:top-24">
            <div className="space-y-6 rounded-xl border border-border bg-card p-6">
              <Detail label="When" value={displayDate} />
              <Detail label="Stack" value={project.stack.join(" · ")} />
              <Detail label="Live" value={project.liveUrl} link={project.liveUrl} />
              {project.reference && (
                <Detail
                  label="Reference"
                  value={project.reference}
                  link={project.reference}
                />
              )}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="right" delay={0.05}>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {project.description.map((paragraph, i) => (
              <p
                key={i}
                className="mb-5 text-base leading-relaxed text-foreground/90"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
  link,
}: {
  label: string;
  value: string;
  link?: string;
}) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 block text-sm break-words text-primary hover:underline"
        >
          {value}
        </a>
      ) : (
        <div className="mt-1 text-sm">{value}</div>
      )}
    </div>
  );
}
