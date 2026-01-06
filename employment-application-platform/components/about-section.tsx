import { Users, Award, MapPin } from "lucide-react"

const stats = [
  {
    icon: Users,
    number: "10,000+",
    label: "Customers Served",
  },
  {
    icon: Award,
    number: "95%",
    label: "Satisfaction Rating",
  },
  {
    icon: MapPin,
    number: "500+",
    label: "Employees Across Canada",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="bg-white px-4 py-24">
      <div className="container mx-auto max-w-6xl">
        <h2 className="mb-8 text-center text-4xl font-bold text-neutral-900 lg:text-5xl">About Voysus</h2>
        <div className="mx-auto mb-4 h-1 w-24 bg-primary-600" />

        <p className="mx-auto mb-16 max-w-3xl text-center text-xl leading-relaxed text-neutral-600">
          Voysus CE Inc is a leading provider of home comfort solutions across Canada. As a proud partner of Reliance
          Home Comfort, we deliver exceptional HVAC, water heating, and home protection services to thousands of
          Canadian homes.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-2xl bg-neutral-50 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-primary-50 p-4">
                  <stat.icon className="h-12 w-12 text-primary-600" />
                </div>
              </div>
              <div className="mb-2 text-5xl font-bold text-neutral-900">{stat.number}</div>
              <div className="text-sm uppercase tracking-wide text-neutral-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
