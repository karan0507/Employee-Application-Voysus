import { TrendingUp, Clock, Users } from "lucide-react";
import { Button } from "./ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 to-primary-800 px-4 py-24 text-white lg:py-32">
      {/* Subtle dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Content */}
          <div className="flex flex-col justify-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight lg:text-5xl xl:text-6xl">
              Transform Customer Experiences with AI-Powered Contact Center Solutions
            </h1>

            <p className="mb-8 text-lg leading-relaxed text-white/90 lg:text-xl">
              Reduce costs by 40%, improve satisfaction by 32%, and scale effortlessly with enterprise-grade omnichannel support.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <a href="#contact">
                <Button
                  size="lg"
                  className="w-full bg-white px-8 py-6 text-lg font-semibold text-primary-800 shadow-xl transition-all hover:scale-105 hover:shadow-2xl sm:w-auto"
                >
                  Schedule Consultation →
                </Button>
              </a>
              <a href="#services">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-2 border-white bg-transparent px-8 py-6 text-lg font-semibold text-white transition-all hover:bg-white/10 sm:w-auto"
                >
                  View Services
                </Button>
              </a>
            </div>
          </div>

          {/* Right: Metrics Cards */}
          <div className="flex flex-col justify-center gap-6">
            {/* Card 1 */}
            <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm transition-all hover:bg-white/15">
              <div className="mb-2 flex items-center gap-3">
                <div className="rounded-lg bg-accent-green/20 p-2">
                  <TrendingUp className="h-6 w-6 text-accent-green" />
                </div>
                <span className="text-3xl font-bold">98.7%</span>
              </div>
              <p className="text-sm text-white/80">Uptime SLA Guarantee</p>
            </div>

            {/* Card 2 */}
            <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm transition-all hover:bg-white/15">
              <div className="mb-2 flex items-center gap-3">
                <div className="rounded-lg bg-accent-green/20 p-2">
                  <Users className="h-6 w-6 text-accent-green" />
                </div>
                <span className="text-3xl font-bold">24/7</span>
              </div>
              <p className="text-sm text-white/80">Omnichannel Support</p>
            </div>

            {/* Card 3 */}
            <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm transition-all hover:bg-white/15">
              <div className="mb-2 flex items-center gap-3">
                <div className="rounded-lg bg-accent-green/20 p-2">
                  <Clock className="h-6 w-6 text-accent-green" />
                </div>
                <span className="text-3xl font-bold">40%</span>
              </div>
              <p className="text-sm text-white/80">Average Cost Reduction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
