"use client"

import {
  Phone,
  MessageSquare,
  Bot,
  BarChart3,
  Users,
  Shield,
  ArrowRight,
  CheckCircle,
} from "lucide-react"

const services = [
  {
    icon: Phone,
    title: "Voice CX",
    description: "Enterprise voice platform with intelligent routing and real-time monitoring.",
    features: ["Smart IVR & ACD", "Call recording", "Speech analytics"],
    color: "blue",
  },
  {
    icon: MessageSquare,
    title: "Omnichannel",
    description: "Unified messaging across WhatsApp, SMS, chat, email, and social platforms.",
    features: ["Unified inbox", "WhatsApp API", "Social integration"],
    color: "purple",
  },
  {
    icon: Bot,
    title: "AI Automation",
    description: "Conversational AI and intelligent workflows to reduce costs by 40%.",
    features: ["AI chatbots", "Auto-routing", "Sentiment analysis"],
    color: "green",
  },
  {
    icon: BarChart3,
    title: "Analytics & BI",
    description: "Real-time dashboards and predictive analytics for data-driven decisions.",
    features: ["Live dashboards", "Forecasting", "Custom reports"],
    color: "orange",
  },
  {
    icon: Users,
    title: "Workforce Mgmt",
    description: "Smart scheduling and performance optimization for maximum productivity.",
    features: ["Forecasting", "Scheduling", "Performance tracking"],
    color: "indigo",
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "Enterprise-grade security with SOC 2, ISO 27001, and GDPR compliance.",
    features: ["SOC 2 certified", "Audit trails", "Data encryption"],
    color: "teal",
  },
]

export function PremiumServices() {
  return (
    <section id="services" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-8">
        {/* Header - Left Aligned */}
        <div className="mb-16">
          <div className="mb-3 text-sm font-bold uppercase tracking-wider text-blue-600">
            Solutions
          </div>
          <h2 className="mb-4 text-4xl font-black text-slate-900 lg:text-5xl">
            Everything You Need
          </h2>
          <p className="max-w-2xl text-lg text-slate-600">
            Six integrated modules that work together to deliver exceptional customer
            experiences at enterprise scale.
          </p>
        </div>

        {/* Services - Bento Grid Layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <div
              key={idx}
              className={`group relative overflow-hidden rounded-2xl border-2 ${
                idx === 0 || idx === 5
                  ? "md:col-span-2 lg:col-span-1"
                  : ""
              } border-slate-200 bg-white p-6 transition-all hover:border-${service.color}-300 hover:shadow-lg`}
            >
              {/* Icon */}
              <div className={`mb-4 inline-flex rounded-xl bg-${service.color}-50 p-3`}>
                <service.icon className={`h-7 w-7 text-${service.color}-600`} />
              </div>

              {/* Content */}
              <h3 className="mb-2 text-xl font-bold text-slate-900">{service.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-slate-600">
                {service.description}
              </p>

              {/* Features List */}
              <ul className="mb-4 space-y-2">
                {service.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle className={`h-3.5 w-3.5 text-${service.color}-500`} />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Learn More */}
              <button className="flex items-center gap-1 text-sm font-semibold text-slate-900 transition-all group-hover:gap-2">
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
