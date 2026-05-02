import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { CONTACT } from "@/data/contact";
import { Wordmark } from "@/components/Wordmark";

const FOOTER_LINKS = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/resume", label: "Resume" },
  { to: "/contact", label: "Contact" },
];

const SOCIAL = [
  { href: CONTACT.github, icon: Github, label: "GitHub" },
  { href: CONTACT.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: CONTACT.emailHref, icon: Mail, label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-page py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <Link
              to="/"
              className="font-mono text-base font-semibold tracking-tight"
            >
              <Wordmark />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Full-stack web developer based in Oklahoma. Building practical,
              well-tested software.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <MapPin className="h-3 w-3" />
              {CONTACT.location}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 font-mono uppercase tracking-wider text-muted-foreground">
              Sitemap
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 font-mono uppercase tracking-wider text-muted-foreground">
              Elsewhere
            </h3>
            <div className="flex gap-3">
              {SOCIAL.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} {CONTACT.name}</span>
          <span className="font-mono">
            Built with React, Vite, Tailwind &amp; shadcn/ui.
          </span>
        </div>
      </div>
    </footer>
  );
}
