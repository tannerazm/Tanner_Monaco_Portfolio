// Inject the real /prop phone number at build time.
//
// The committed source only ever holds the placeholder "__PROP_PHONE__". The
// real number lives in the Netlify environment variable PROP_PHONE, so it never
// sits in the git repo. This runs as npm's "postbuild" hook, after Vite has
// copied public/prop -> dist/prop, and rewrites the deployed copy in place.
//
// If PROP_PHONE is not set (e.g. a local build), it falls back to a safe
// fictional number so the raw token never reaches the page.
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const FILE = "dist/prop/index.html";
const FALLBACK = "(806) 555-0173"; // fictional, reserved 555-01xx range

if (!existsSync(FILE)) {
  console.log("inject-prop-phone: dist/prop/index.html not found; skipping.");
  process.exit(0);
}

const phone = process.env.PROP_PHONE || FALLBACK;
const html = readFileSync(FILE, "utf8").split("__PROP_PHONE__").join(phone);
writeFileSync(FILE, html);

console.log(
  process.env.PROP_PHONE
    ? "inject-prop-phone: injected PROP_PHONE into dist/prop/index.html"
    : "inject-prop-phone: PROP_PHONE not set; used fallback number."
);
