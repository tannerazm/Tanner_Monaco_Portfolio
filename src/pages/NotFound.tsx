import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-4">
        404 // wrong turn
      </p>
      <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
        You're lost.
      </h1>
      <p className="mt-6 max-w-xl text-muted-foreground">
        So was I once. Buffalo → Texas → Oklahoma → Colorado → back to
        Oklahoma. Worked out fine. Try one of these instead.
      </p>
      <p className="mt-3 font-mono text-xs text-muted-foreground">
        (and check the console; there's something for you there too)
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <Link to="/">Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/projects">Projects</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/resume">Resume</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/contact">Contact</Link>
        </Button>
      </div>
    </div>
  );
}
