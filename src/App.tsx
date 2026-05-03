import { Routes, Route } from "react-router-dom";
import { CONTACT } from "@/data/contact";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PostHogPageView } from "@/components/PostHogPageView";
import { EggHuntProvider } from "@/components/EggHuntProvider";
import { EggHuntToast } from "@/components/EggHuntToast";
import { EggHuntComplete } from "@/components/EggHuntComplete";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { Projects } from "@/pages/Projects";
import { ProjectDetail } from "@/pages/ProjectDetail";
import { Resume } from "@/pages/Resume";
import { Contact } from "@/pages/Contact";
import { NotFound } from "@/pages/NotFound";

// Console easter egg. Runs once when this module is first imported, instead
// of on every App mount, so React StrictMode's double-mount in dev doesn't
// double-print it.
if (typeof window !== "undefined") {
  console.log(
    "%chi 👋. You found me.",
    "font:bold 14px ui-monospace,SFMono-Regular,Menlo,monospace;color:#ef4444;",
  );
  console.log(
    `%cif you're hiring or just curious: ${CONTACT.email}`,
    "color:#888;font:13px ui-monospace,SFMono-Regular,Menlo,monospace;",
  );
  console.log(
    `%csource: ${CONTACT.github}`,
    "color:#888;font:13px ui-monospace,SFMono-Regular,Menlo,monospace;",
  );
}

export function App() {
  return (
    <EggHuntProvider>
      <div className="flex min-h-screen flex-col">
        <ScrollToTop />
        <PostHogPageView />
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <BackToTop />
        <EggHuntToast />
        <EggHuntComplete />
      </div>
    </EggHuntProvider>
  );
}
