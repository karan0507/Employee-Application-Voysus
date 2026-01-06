import { TrendingUp, Heart, GraduationCap, Scale, UsersIcon, Lightbulb } from "lucide-react"

const benefits = [
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Clear path to advancement with regular performance reviews and promotion opportunities",
  },
  {
    icon: Heart,
    title: "Competitive Benefits",
    description: "Health, dental, vision insurance, RRSP matching, and paid time off",
  },
  {
    icon: GraduationCap,
    title: "Training & Development",
    description: "Continuous learning programs, certifications, and professional development opportunities",
  },
  {
    icon: Scale,
    title: "Work-Life Balance",
    description: "Flexible schedules and supportive environment for personal wellbeing",
  },
  {
    icon: UsersIcon,
    title: "Team Culture",
    description: "Collaborative, inclusive workplace where every voice matters",
  },
  {
    icon: Lightbulb,
    title: "Innovation Focus",
    description: "Work with cutting-edge technology and contribute to industry-leading solutions",
  },
]

export function BenefitsSection() {
  return (
    <section id="benefits" className="bg-white px-4 py-24">
      <div className="container mx-auto max-w-6xl">
        <h2 className="mb-8 text-center text-4xl font-bold text-neutral-900 lg:text-5xl">Why Join Voysus?</h2>
        <div className="mx-auto mb-16 h-1 w-24 bg-primary-600" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-4 inline-flex rounded-full bg-primary-50 p-3">
                <benefit.icon className="h-14 w-14 text-primary-600" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-neutral-900">{benefit.title}</h3>
              <p className="leading-relaxed text-neutral-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
