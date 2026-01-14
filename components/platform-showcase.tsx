"use client"

import {
  Zap,
  Globe,
  Lock,
  TrendingUp,
  Users,
  Clock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react"
import { Button } from "./ui/button"

const platformFeatures = [
  {
    icon: Zap,
    title: "Lightning Fast",
    metric: "< 2s",
    description: "Average response time with AI routing",
  },
  {
    icon: Globe,
    title: "Global Scale",
    metric: "150+",
    description: "Countries covered worldwide",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    metric: "SOC 2",
    description: "Type II certified infrastructure",
  },
  {
    icon: TrendingUp,
    title: "Cost Efficiency",
    metric: "40%",
    description: "Average operational cost reduction",
  },
]

const integrations = [
  "Salesforce",
  "HubSpot",
  "Zendesk",
  "Microsoft Dynamics",
  "ServiceNow",
  "Slack",
  "Teams",
  "WhatsApp",
]

export function PlatformShowcase() {
  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="mx-auto max-w-7xl px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Side - Content */}
          <div className="flex flex-col justify-center">
            <div className="mb-3 text-sm font-bold uppercase tracking-wider text-blue-600">
              Platform
            </div>
            <h2 className="mb-6 text-4xl font-black text-slate-900 lg:text-5xl">
              Built for Enterprise Scale
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-slate-600">
              Deploy globally in minutes. Our platform handles millions of interactions
              daily with enterprise-grade reliability and security.
            </p>

            {/* Feature Grid */}
            <div className="mb-8 grid grid-cols-2 gap-4">
              {platformFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <feature.icon className="h-5 w-5 text-blue-600" />
                    <span className="text-2xl font-black text-slate-900">
                      {feature.metric}
                    </span>
                  </div>
                  <div className="mb-1 text-sm font-bold text-slate-900">
                    {feature.title}
                  </div>
                  <div className="text-xs text-slate-600">{feature.description}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <Button
                size="lg"
                className="bg-blue-600 px-6 py-6 font-semibold text-white hover:bg-blue-700"
                onClick={() => {
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Request Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Users className="h-4 w-4" />
                <span>
                  <span className="font-bold text-slate-900">10,000+</span> active clients
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Integration Grid */}
          <div className="flex flex-col justify-center">
            <div className="rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">
                  Seamless Integrations
                </h3>
                <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                  Active
                </div>
              </div>

              <p className="mb-6 text-sm text-slate-600">
                Connect with your existing tools in minutes. Native integrations with
                leading CRM, helpdesk, and communication platforms.
              </p>

              {/* Integration Tags */}
              <div className="mb-6 flex flex-wrap gap-3">
                {integrations.map((integration, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm"
                  >
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    {integration}
                  </div>
                ))}
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 border-t border-slate-200 pt-6">
                <div>
                  <div className="text-2xl font-black text-blue-600">200+</div>
                  <div className="text-xs text-slate-600">Integrations</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-blue-600">API</div>
                  <div className="text-xs text-slate-600">REST & GraphQL</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-blue-600">SSO</div>
                  <div className="text-xs text-slate-600">SAML & OAuth</div>
                </div>
              </div>
            </div>

            {/* Bottom Badge */}
            <div className="mt-6 flex items-center gap-4 rounded-xl border border-blue-200 bg-blue-50 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">
                  Deploy in 48 hours
                </div>
                <div className="text-xs text-slate-600">
                  From contract to go-live in under 2 days
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
