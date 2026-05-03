import { useEffect, useState, type FormEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import emailjs from "@emailjs/browser";
import { CheckCircle2, FileText, Github, Linkedin, Mail } from "lucide-react";
import { usePostHog } from "posthog-js/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { HiddenLogo } from "@/components/HiddenLogo";
import { cn } from "@/lib/utils";
import { CONTACT } from "@/data/contact";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\(\d{3}\) \d{3}-\d{4}$/;

function validateEmail(value: string): string | null {
  const v = value.trim();
  if (!v) return "Email is required.";
  if (!EMAIL_RE.test(v)) return "Please enter a valid email address.";
  return null;
}

function validatePhone(value: string): string | null {
  const v = value.trim();
  if (!v) return null; // optional
  if (!PHONE_RE.test(v)) return "Please enter a valid 10-digit phone number.";
  return null;
}

const EMAILJS_PUBLIC_KEY = "rMGN_hBsndMWWnEkb";
const EMAILJS_SERVICE = "service_uls9257";
const EMAILJS_TEMPLATE_TO_SELF = "template_mz33k3g";
const EMAILJS_TEMPLATE_AUTOREPLY = "template_n4wjd5j";

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

interface FormState {
  message: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
}

const initialForm: FormState = {
  message: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  companyName: "",
};

interface JdLocationState {
  jd?: string;
  matchedSkills?: string[];
  totalSkills?: number;
}

function buildJdMessage(state: JdLocationState): string {
  const matchedLine =
    state.matchedSkills && state.matchedSkills.length
      ? `Matched skills (${state.matchedSkills.length}${
          state.totalSkills ? ` of ${state.totalSkills}` : ""
        }): ${state.matchedSkills.join(", ")}\n\n`
      : "";
  return (
    "=== Job description (sent from the resume page) ===\n\n" +
    matchedLine +
    "--- Job description ---\n\n" +
    (state.jd ?? "")
  );
}

export function Contact() {
  const posthog = usePostHog();
  const location = useLocation();
  const jdState = (location.state ?? null) as JdLocationState | null;
  const hasJd = Boolean(jdState?.jd);

  const [form, setForm] = useState<FormState>(() =>
    hasJd && jdState
      ? { ...initialForm, message: buildJdMessage(jdState) }
      : initialForm,
  );
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState<{
    email?: boolean;
    phoneNumber?: boolean;
  }>({});

  const markTouched = (key: "email" | "phoneNumber") => () =>
    setTouched((t) => ({ ...t, [key]: true }));

  const emailError = touched.email ? validateEmail(form.email) : null;
  const phoneError = touched.phoneNumber
    ? validatePhone(form.phoneNumber)
    : null;

  // If a recruiter navigates from the JD highlighter while this page is
  // already mounted, refresh the message field.
  useEffect(() => {
    if (jdState?.jd) {
      setForm((f) => ({ ...f, message: buildJdMessage(jdState) }));
    }
  }, [jdState]);

  const update =
    <K extends keyof FormState>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  // Format US phone numbers as the user types: (XXX) XXX-XXXX. Strips
  // non-digits, caps at 10 digits, and rebuilds the display string so
  // pasted numbers in any format normalize automatically.
  function formatPhone(value: string): string {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length === 0) return "";
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6)
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, phoneNumber: formatPhone(e.target.value) }));
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const phone = form.phoneNumber.trim() || "(not provided)";
    const company = form.companyName.trim() || "(not provided)";

    try {
      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE_TO_SELF,
        {
          message: form.message,
          from_first_name: form.firstName,
          from_last_name: form.lastName,
          from_email_id: form.email,
          from_phone_number: phone,
          from_company: company,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );

      // Auto-reply is best-effort. Don't block success on it.
      // Send the same payload as the to-self template so the auto-reply
      // can echo everything the user submitted (and the BCC copy gives
      // Tanner the full record too).
      emailjs
        .send(
          EMAILJS_SERVICE,
          EMAILJS_TEMPLATE_AUTOREPLY,
          {
            message: form.message,
            from_first_name: form.firstName,
            from_last_name: form.lastName,
            from_email_id: form.email,
            from_phone_number: phone,
            from_company: company,
          },
          { publicKey: EMAILJS_PUBLIC_KEY },
        )
        .catch((e) => console.warn("Auto-reply failed:", e));

      posthog?.capture("contact_form_submitted", {
        has_jd: hasJd,
        has_company: Boolean(form.companyName.trim()),
        has_phone: Boolean(form.phoneNumber.trim()),
        matched_skills_count: jdState?.matchedSkills?.length ?? 0,
      });
      setSubmitted(true);
    } catch (err) {
      const e = err as { status?: number; text?: string; message?: string };
      console.error("EmailJS error:", e);
      const detail = e?.text || e?.message || "Unknown error";
      const statusPart = e?.status ? ` (${e.status})` : "";
      posthog?.capture("contact_form_error", {
        error_detail: detail,
        error_status: e?.status ?? null,
        has_jd: hasJd,
      });
      posthog?.captureException(err, { extra: { context: "contact_form_submit" } });
      setError(
        `Couldn't send: ${detail}${statusPart}. Email me directly at ${CONTACT.email} if this keeps failing.`,
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container-page py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl"
      >
        {submitted ? (
          <SuccessPanel firstName={form.firstName} />
        ) : (
          <>
            <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">
              Contact
              <HiddenLogo id="contact" size={11} />
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Let's talk.
            </h1>
            <p className="mt-4 text-muted-foreground">
              Hiring, contracting, or just curious? Drop me a line and I'll
              get back to you fast. I'm comfortable in PERN, PHP/CraftCMS, and
              everything in between.
            </p>

            {hasJd && (
              <div className="mt-6 flex items-start gap-3 rounded-lg border border-red-500/40 bg-red-500/5 p-4">
                <FileText className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                <div className="text-sm">
                  <p className="font-medium text-foreground">
                    Job description attached
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    The JD you pasted on the resume page is in the message
                    below. Add your contact info and hit send. Feel free to
                    add a note above the JD.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={onSubmit} className="mt-10 space-y-5">
              <Field label="Message" required>
                <Textarea
                  required
                  value={form.message}
                  onChange={update("message")}
                  placeholder="What inspires you to reach out?"
                  rows={hasJd ? 12 : 5}
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="First name" required>
                  <Input
                    required
                    value={form.firstName}
                    onChange={update("firstName")}
                  />
                </Field>
                <Field label="Last name" required>
                  <Input
                    required
                    value={form.lastName}
                    onChange={update("lastName")}
                  />
                </Field>
              </div>

              <Field label="Email" required>
                <Input
                  type="email"
                  required
                  inputMode="email"
                  autoComplete="email"
                  pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                  title="Enter a valid email address"
                  value={form.email}
                  onChange={update("email")}
                  onBlur={markTouched("email")}
                  placeholder="you@company.com"
                  aria-invalid={emailError ? "true" : undefined}
                  aria-describedby={emailError ? "email-error" : undefined}
                  className={cn(
                    emailError && "border-destructive focus-visible:ring-destructive",
                  )}
                />
                {emailError && (
                  <p
                    id="email-error"
                    className="mt-1 text-xs text-destructive"
                  >
                    {emailError}
                  </p>
                )}
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Phone">
                  <Input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    pattern="\(\d{3}\) \d{3}-\d{4}"
                    title="Format: (XXX) XXX-XXXX"
                    value={form.phoneNumber}
                    onChange={onPhoneChange}
                    onBlur={markTouched("phoneNumber")}
                    aria-invalid={phoneError ? "true" : undefined}
                    aria-describedby={phoneError ? "phone-error" : undefined}
                    className={cn(
                      phoneError && "border-destructive focus-visible:ring-destructive",
                    )}
                  />
                  {phoneError && (
                    <p
                      id="phone-error"
                      className="mt-1 text-xs text-destructive"
                    >
                      {phoneError}
                    </p>
                  )}
                </Field>
                <Field label="Company">
                  <Input
                    value={form.companyName}
                    onChange={update("companyName")}
                  />
                </Field>
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              <Button type="submit" size="lg" disabled={submitting}>
                {submitting ? "Sending…" : "Send message"}
              </Button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
        {label}
        {required && <span className="ml-1 text-primary">*</span>}
      </Label>
      {children}
    </div>
  );
}

function SuccessPanel({ firstName }: { firstName: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-8 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <CheckCircle2 className="h-6 w-6 text-primary" />
      </div>
      <h2 className="mt-6 text-2xl font-bold">
        Thanks{firstName ? `, ${firstName}` : ""}.
      </h2>
      <p className="mt-3 text-muted-foreground">
        Your message is on its way. I'll get back to you shortly.
      </p>

      <div className="mt-8 flex items-center justify-center gap-3">
        <SocialLink href={CONTACT.github} icon={Github} label="GitHub" />
        <SocialLink href={CONTACT.linkedin} icon={Linkedin} label="LinkedIn" />
        <SocialLink href={CONTACT.emailHref} icon={Mail} label="Email" />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm">
        <Link
          to="/projects"
          className="text-primary hover:underline underline-offset-4"
        >
          Projects
        </Link>
        <span className="text-muted-foreground">·</span>
        <Link
          to="/resume"
          className="text-primary hover:underline underline-offset-4"
        >
          Resume
        </Link>
        <span className="text-muted-foreground">·</span>
        <Link to="/" className="text-primary hover:underline underline-offset-4">
          Home
        </Link>
      </div>
    </div>
  );
}

function SocialLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: typeof Mail;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
    >
      <Icon className="h-4 w-4" />
    </a>
  );
}
