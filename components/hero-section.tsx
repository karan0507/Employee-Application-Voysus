import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { VoysusLogo } from "./voysus-logo";
import { Button } from "./ui/button";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-primary-800 to-primary-600 px-4 text-white">
      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Logo with fade-in animation */}
        <div className="mb-8 flex justify-center animate-fade-in">
          {/* <VoysusLogo size={120} className="text-white animate-scale-up" /> */}
        </div>

        {/* Heading */}
        <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-balance animate-slide-up lg:text-6xl">
          Join Our Growing Team
        </h1>

        <div className="mb-4 h-1 w-64 bg-white/50 mx-auto" />

        {/* Subheading */}
        <p className="mb-6 text-2xl font-medium text-white/90 text-pretty animate-slide-up lg:text-3xl delay-200">
          Building Tomorrow's Home Comfort Solutions Today
        </p>

        {/* Description */}
        <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-white/80 text-pretty animate-fade-in delay-400 lg:text-xl">
          We're hiring passionate professionals to join Canada's leading home
          comfort provider in partnership with Reliance Home Comfort
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 pb-20 sm:flex-row sm:pb-0 animate-slide-up delay-600">
          <Link href="/apply">
            <Button
              size="lg"
              className="w-full bg-white px-8 py-6 text-lg font-semibold text-primary-800 shadow-xl transition-all hover:scale-105 hover:shadow-2xl sm:w-auto"
            >
              Start Your Application →
            </Button>
          </Link>
          <a href="#about">
            <Button
              size="lg"
              variant="outline"
              className="w-full border-2 border-white bg-transparent px-8 py-6 text-lg font-semibold text-white hover:bg-white/10 sm:w-auto"
            >
              Learn More
            </Button>
          </a>
        </div>
      </div>

      {/* Scroll indicator - moved outside content container */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
        <ChevronDown className="h-8 w-8 text-white/60" />
        <p className="mt-2 text-sm text-white/60">Scroll to explore</p>
      </div>
    </section>
  );
}
