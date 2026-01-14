import { Award, Users, TrendingUp, Star } from "lucide-react"

const metrics = [
  {
    icon: Award,
    number: "20+",
    label: "Years Experience",
  },
  {
    icon: Users,
    number: "10,000+",
    label: "Enterprise Clients",
  },
  {
    icon: TrendingUp,
    number: "50M+",
    label: "Interactions/Year",
  },
  {
    icon: Star,
    number: "98%",
    label: "Uptime SLA",
  },
]

export function TrustMetricsSection() {
  return (
    <section id="solutions" className="relative overflow-hidden bg-gradient-to-br from-primary-900 to-primary-800 px-4 py-24 text-white">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, white 2px, transparent 2px), radial-gradient(circle at 80% 80%, white 2px, transparent 2px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-white/90">
            Delivering exceptional results for enterprises across North America
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
            >
              {/* Icon */}
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-accent-green/20 p-3">
                  <metric.icon className="h-8 w-8 text-accent-green" />
                </div>
              </div>

              {/* Number */}
              <div className="mb-2 text-5xl font-bold">{metric.number}</div>

              {/* Label */}
              <div className="text-sm font-medium uppercase tracking-wide text-white/80">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
