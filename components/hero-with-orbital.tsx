"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  TrendingUp,
  Shield,
  Zap,
  Phone,
  MessageSquare,
  BarChart3,
  Users,
  Database,
  Globe,
} from "lucide-react";
import { Button } from "./ui/button";

const orbitIcons = [
  { icon: Phone, color: "blue", angle: 0, label: "Voice CX" },
  { icon: MessageSquare, color: "purple", angle: 60, label: "Messaging" },
  { icon: BarChart3, color: "green", angle: 120, label: "Analytics" },
  { icon: Users, color: "orange", angle: 180, label: "Workforce" },
  { icon: Database, color: "teal", angle: 240, label: "CRM" },
  { icon: Globe, color: "indigo", angle: 300, label: "Global" },
];

export function HeroWithOrbital() {
  const [isHovered, setIsHovered] = useState(false);
  const radius = 180;

  const getPosition = (angle: number) => {
    const radian = (angle - 90) * (Math.PI / 180);
    return {
      x: radius * Math.cos(radian),
      y: radius * Math.sin(radian),
    };
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-12 px-8 py-20 lg:grid-cols-2">
        {/* Left Content */}
        <div>
          <div className="mb-4 inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-blue-700">
            Enterprise CX Platform
          </div>

          <h1 className="mb-6 text-5xl font-black leading-[1.1] text-slate-900 lg:text-6xl">
            Customer Experience
            <br />
            That Drives
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Revenue Growth
            </span>
          </h1>

          <p className="mb-8 text-xl leading-relaxed text-slate-600">
            AI-powered contact center platform trusted by Fortune 500 companies.
            Unify voice, chat, and analytics in one powerful ecosystem.
          </p>

          <div className="mb-8 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-slate-700">
                40% average cost reduction
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                <Shield className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-sm font-semibold text-slate-700">
                SOC 2 & ISO 27001 certified
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100">
                <Zap className="h-4 w-4 text-orange-600" />
              </div>
              <span className="text-sm font-semibold text-slate-700">
                99.99% uptime guarantee
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="bg-blue-600 px-8 py-6 text-base font-bold text-white hover:bg-blue-700"
              onClick={() =>
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-slate-300 px-8 py-6 text-base font-bold hover:bg-slate-50"
              onClick={() =>
                document
                  .querySelector("#services")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Demo
            </Button>
          </div>
        </div>

        {/* Right - Orbital Design */}
        <div className="flex items-center justify-center">
          <div
            className="relative"
            style={{ width: "440px", height: "440px" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Orbit Circle */}
            <div
              className="absolute inset-0 rounded-full border-2 border-dashed border-blue-300"
              style={{
                animation: isHovered ? "none" : "spin 60s linear infinite",
              }}
            >
              {orbitIcons.map((item, idx) => {
                const pos = getPosition(item.angle);
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className={`absolute flex h-14 w-14 items-center justify-center rounded-full border-2 border-slate-200 bg-${item.color}-50 shadow-lg transition-transform hover:scale-110`}
                    style={{
                      left: `calc(50% + ${pos.x}px)`,
                      top: `calc(50% + ${pos.y}px)`,
                      transform: "translate(-50%, -50%)",
                    }}
                    title={item.label}
                  >
                    <Icon className={`h-6 w-6 text-${item.color}-600`} />
                  </div>
                );
              })}
            </div>

            {/* Center Image */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-white bg-white shadow-2xl">
                <Image
                  src="/images/partnerBusiness.jpg"
                  alt="VOYSUS Partner Business"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
