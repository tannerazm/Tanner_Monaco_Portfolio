import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/AnimatedSection";
import { PROJECTS } from "@/data/projects";

export function Projects() {
  return (
    <div className="container-page py-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 max-w-2xl"
      >
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">
          Projects
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Things I've built.
        </h1>
        <p className="mt-4 text-muted-foreground">
          A mix of bootcamp work, paid contract work, and personal builds. Most
          have a live link. Click in for the build notes.
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, i) => (
          <AnimatedSection key={project.slug} delay={i * 0.05} direction="up">
            <Link
              to={`/projects/${project.slug}`}
              className="group relative block overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary hover:shadow-lg"
            >
              <div className="aspect-[16/10] overflow-hidden bg-muted">
                <img
                  src={project.image}
                  alt={project.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h2 className="text-lg font-semibold tracking-tight">
                    {project.name}
                  </h2>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {project.tagline}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="mono" className="text-[10px]">
                      {tech}
                    </Badge>
                  ))}
                  {project.stack.length > 4 && (
                    <Badge variant="mono" className="text-[10px]">
                      +{project.stack.length - 4}
                    </Badge>
                  )}
                </div>
                <div className="mt-3 font-mono text-xs text-muted-foreground">
                  {project.date.split(" - ")[0]}
                </div>
              </div>
            </Link>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
