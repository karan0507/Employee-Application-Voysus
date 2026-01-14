"use client"

import {
  ArrowRight,
  Phone,
  MessageSquare,
  BarChart3,
  Zap,
  TrendingUp,
  Shield,
} from "lucide-react"
import { Button } from "./ui/button"

export function PremiumHero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-white">
      {/* Asymmetric Background - Left Side Blue */}
      <div className="absolute left-0 top-0 h-full w-2/5 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900" />

      {/* Diagonal Accent */}
      <div className="absolute left-[38%] top-0 h-full w-[4%] bg-gradient-to-b from-cyan-400 to-blue-500" />

      <div className="relative z-10 mx-auto grid min-h-[90vh] max-w-7xl grid-cols-1 lg:grid-cols-5">
        {/* Left Content - 2 columns */}
        <div className="col-span-2 flex flex-col justify-center px-8 py-16 text-white lg:px-12">
          <div className="mb-6 inline-block rounded-lg border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur-sm">
            Enterprise CX Platform
          </div>

          <h1 className="mb-6 text-5xl font-black leading-[1.1] lg:text-6xl">
            Customer Experience
            <br />
            That Drives
            <br />
            <span className="text-cyan-300">Revenue</span>
          </h1>

          <p className="mb-8 text-lg leading-relaxed text-blue-100">
            AI-powered contact center platform trusted by Fortune 500 companies.
            Voice, chat, analytics unified.
          </p>

          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-cyan-400/20">
                <TrendingUp className="h-4 w-4 text-cyan-300" />
              </div>
              <span className="text-sm">40% average cost reduction</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-cyan-400/20">
                <Shield className="h-4 w-4 text-cyan-300" />
              </div>
              <span className="text-sm">SOC 2 & ISO 27001 certified</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-cyan-400/20">
                <Zap className="h-4 w-4 text-cyan-300" />
              </div>
              <span className="text-sm">99.99% uptime guarantee</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="bg-white px-6 py-6 font-semibold text-blue-900 transition-all hover:bg-blue-50"
              onClick={() => {
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/30 bg-transparent px-6 py-6 font-semibold text-white hover:bg-white/10"
              onClick={() => {
                document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              View Demo
            </Button>
          </div>
        </div>

        {/* Right Content - 3 columns */}
        <div className="col-span-3 flex items-center justify-end px-8 py-16 lg:px-12">
          <div className="w-full max-w-2xl">
            {/* Stats Grid */}
            <div className="mb-8 grid grid-cols-3 gap-4">
              <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <div className="text-3xl font-black text-blue-600">98.7%</div>
                <div className="text-xs font-medium text-slate-600">Uptime SLA</div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <div className="text-3xl font-black text-blue-600">50M+</div>
                <div className="text-xs font-medium text-slate-600">Interactions</div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <div className="text-3xl font-black text-blue-600">10K+</div>
                <div className="text-xs font-medium text-slate-600">Clients</div>
              </div>
            </div>

            {/* Platform Features - Stacked Cards */}
            <div className="space-y-3">
              <div className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-blue-300 hover:shadow-md">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-slate-900">Voice CX Solutions</div>
                  <div className="text-xs text-slate-600">Intelligent routing & real-time analytics</div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-600" />
              </div>

              <div className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-purple-300 hover:shadow-md">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-purple-50">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-slate-900">Omnichannel Messaging</div>
                  <div className="text-xs text-slate-600">WhatsApp, SMS, chat & social media</div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-purple-600" />
              </div>

              <div className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-green-300 hover:shadow-md">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-green-50">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-slate-900">AI-Powered Analytics</div>
                  <div className="text-xs text-slate-600">Real-time dashboards & predictive insights</div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-green-600" />
              </div>

              <div className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-orange-300 hover:shadow-md">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-orange-50">
                  <Zap className="h-6 w-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-slate-900">Automation Engine</div>
                  <div className="text-xs text-slate-600">AI chatbots & workflow automation</div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
