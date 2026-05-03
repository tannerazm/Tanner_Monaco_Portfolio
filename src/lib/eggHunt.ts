// Hidden-logo "hunt": one tiny brand mark on each top-level page. Click each
// to register a find. Progress lives in localStorage so refreshes/page nav
// don't reset state.

export interface EggSpec {
  id: string;
  label: string;
  hint: string; // shown in the toast when this is among the unfound
  path: string; // route to this page (used for auto-navigation)
}

// Order matters: hints surface in reverse order, so the LAST id here is the
// one whose hint shows when only it (and possibly its tail) remain unfound.
// 404 sits last on purpose so its hint fires last.
export const EGG_HUNT: EggSpec[] = [
  {
    id: "home",
    label: "Home",
    hint: "One sits where I introduce myself.",
    path: "/",
  },
  {
    id: "about",
    label: "About",
    hint: "One sits with the people who matter most.",
    path: "/about",
  },
  {
    id: "projects",
    label: "Projects",
    hint: "One sits among the things I've built.",
    path: "/projects",
  },
  {
    id: "resume",
    label: "Resume",
    hint: "One sits where a recruiter would paste a JD.",
    path: "/resume",
  },
  {
    id: "contact",
    label: "Contact",
    hint: "One sits where you'd reach out.",
    path: "/contact",
  },
  {
    id: "404",
    label: "404",
    hint: "It's on the page you land on when you take a wrong turn. Try any URL that doesn't exist on this site.",
    path: "/off-trail",
  },
];

export const TOTAL_EGGS = EGG_HUNT.length;
export const NOT_FOUND_ID = "404";

// Real, valid routes that this site responds to. Anything else triggers the
// 404 catch-all. Used to decide whether the safety-net auto-redirect should
// kick in (no point redirecting if the user is already on a 404 route).
export const KNOWN_ROUTE_PREFIXES = ["/", "/about", "/projects", "/resume", "/contact"];

export function isKnownRoute(pathname: string): boolean {
  if (pathname === "/") return true;
  return KNOWN_ROUTE_PREFIXES.some(
    (p) => p !== "/" && (pathname === p || pathname.startsWith(p + "/")),
  );
}


const STORAGE_KEY = "tm_egg_found";

export function loadFound(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((s): s is string => typeof s === "string");
  } catch {
    return [];
  }
}

export function saveFound(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // ignore storage errors (quota / private mode)
  }
}

// Toast hint logic. While there's still more than just the 404 mark to find,
// stay generic ("there's one on every page"). Once 5/6 are found AND the
// missing one is the 404 mark, switch to the specific 404 hint that almost
// gives it away. If the user happens to find the 404 mark earlier, this
// stays generic.
export function getActiveHint(found: string[]): string {
  if (found.length >= TOTAL_EGGS) return "";
  const unfound = EGG_HUNT.filter((e) => !found.includes(e.id));
  if (unfound.length === 1 && unfound[0].id === NOT_FOUND_ID) {
    return unfound[0].hint;
  }
  return "There is one on every single page.";
}
