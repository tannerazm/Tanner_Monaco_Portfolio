import { CONTACT } from "@/data/contact";

// "Tanner.Monaco" with the brand period in primary color, rendered consistently
// wherever the brand wordmark appears (navbar, footer, etc.). Sourced from
// CONTACT.name so changing the name there updates every wordmark on the site.
export function Wordmark({ className }: { className?: string }) {
  const [first, last] = CONTACT.name.split(" ");
  return (
    <span className={className}>
      {first}
      <span className="text-primary">.</span>
      {last}
    </span>
  );
}
