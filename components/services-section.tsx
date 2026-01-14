import { MessageSquare, Bot, ShieldCheck, Users2 } from "lucide-react"

const services = [
  {
    icon: MessageSquare,
    title: "Omnichannel Support",
    description: "Unified customer engagement across email, chat, SMS, voice, and social media with seamless handoffs.",
    metric: "24/7 Coverage",
  },
  {
    icon: Bot,
    title: "AI-Powered Automation",
    description: "Intelligent routing, chatbots, and predictive analytics to optimize workflows and reduce response times.",
    metric: "40% Cost Reduction",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description: "Real-time monitoring, agent coaching, and compliance management to maintain service excellence.",
    metric: "95%+ CSAT",
  },
  {
    icon: Users2,
    title: "Workforce Management",
    description: "Advanced scheduling, forecasting, and performance optimization to maximize agent productivity.",
    metric: "30% Efficiency Gain",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="bg-white px-4 py-24">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-neutral-900 lg:text-4xl">
            Enterprise Contact Center Solutions
          </h2>
          <p className="text-lg text-neutral-600">
            Comprehensive platform to transform your customer experience operations
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="group rounded-xl border border-neutral-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Icon */}
              <div className="mb-4 inline-flex rounded-lg bg-primary-50 p-3">
                <service.icon className="h-8 w-8 text-primary-600" />
              </div>

              {/* Metric Badge */}
              <div className="mb-3 inline-block rounded-full bg-accent-green/10 px-3 py-1 text-xs font-semibold text-accent-green">
                {service.metric}
              </div>

              {/* Title */}
              <h3 className="mb-3 text-xl font-bold text-neutral-900">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-neutral-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
