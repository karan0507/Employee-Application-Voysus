"use client";

import {
  Award,
  Users,
  TrendingUp,
  Building2,
  Shield,
  Star,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "./ui/button";

const mainMetrics = [
  {
    number: "10,000+",
    label: "Enterprise Clients",
    sublabel: "Fortune 500 companies",
  },
  {
    number: "50M+",
    label: "Annual Interactions",
    sublabel: "Handled seamlessly",
  },
  {
    number: "98.7%",
    label: "Uptime SLA",
    sublabel: "Mission-critical reliability",
  },
  { number: "20+", label: "Years Experience", sublabel: "Industry leadership" },
];

const achievements = [
  { label: "40% Cost Reduction", description: "Average savings" },
  { label: "2s Response Time", description: "AI-powered routing" },
  { label: "95%+ CSAT", description: "Customer satisfaction" },
  { label: "99.99% Uptime", description: "Last 12 months" },
];

const certifications = [
  { icon: Shield, label: "SOC 2 Type II" },
  { icon: CheckCircle2, label: "ISO 27001" },
  { icon: Award, label: "GDPR Compliant" },
  { icon: Star, label: "HIPAA Ready" },
];

const industries = [
  "Healthcare",
  "Finance",
  "Retail",
  "Technology",
  "Telecom",
  "Insurance",
  "HVAC Rental",
];

export function PremiumMetrics() {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-20">
      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e508_1px,transparent_1px),linear-gradient(to_bottom,#4f46e508_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 mx-auto max-w-7xl px-8">
        {/* Header */}
        <div className="mb-16 flex items-end justify-between">
          <div>
            <div className="mb-3 text-sm font-bold uppercase tracking-wider text-blue-400">
              Trusted Globally
            </div>
            <h2 className="text-4xl font-black text-white lg:text-5xl">
              Powering Customer <br />
              Experiences at Scale
            </h2>
          </div>
          <Button
            variant="outline"
            className="hidden border-2 border-slate-700 bg-transparent px-6 py-6 font-semibold text-white hover:border-slate-600 hover:bg-slate-800 lg:flex"
            onClick={() => {
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Main Metrics - Horizontal Strip */}
        <div className="mb-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {mainMetrics.map((metric, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-700 bg-slate-800/50 p-6"
            >
              <div className="mb-2 text-4xl font-black text-white">
                {metric.number}
              </div>
              <div className="mb-1 text-sm font-bold text-slate-300">
                {metric.label}
              </div>
              <div className="text-xs text-slate-500">{metric.sublabel}</div>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left - Achievements */}
          <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-8">
            <h3 className="mb-6 text-xl font-bold text-white">
              Key Achievements
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, idx) => (
                <div key={idx} className="rounded-lg bg-slate-900/50 p-4">
                  <div className="mb-1 text-lg font-bold text-white">
                    {achievement.label}
                  </div>
                  <div className="text-xs text-slate-400">
                    {achievement.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Certifications & Industries */}
          <div className="space-y-6">
            {/* Certifications */}
            <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-6">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-400">
                Security & Compliance
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/50 p-3"
                  >
                    <cert.icon className="h-5 w-5 text-green-400" />
                    <span className="text-sm font-semibold text-white">
                      {cert.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Industries */}
            <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-6">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-400">
                Industries Served
              </h3>
              <div className="flex flex-wrap gap-2">
                {industries.map((industry, idx) => (
                  <div
                    key={idx}
                    className="rounded-full border border-slate-700 bg-slate-900/50 px-4 py-2 text-sm font-semibold text-slate-300"
                  >
                    {industry}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 flex items-center justify-between rounded-2xl border border-blue-700 bg-blue-900/30 p-8 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-600">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">
                Enterprise Ready
              </div>
              <div className="text-sm text-blue-200">
                Trusted by Fortune 500 companies worldwide
              </div>
            </div>
          </div>
          <Button
            size="lg"
            className="hidden bg-white px-6 py-6 font-semibold text-blue-900 hover:bg-blue-50 lg:flex"
            onClick={() => {
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Schedule Demo <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
