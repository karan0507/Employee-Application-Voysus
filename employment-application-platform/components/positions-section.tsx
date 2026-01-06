import { MapPin, Briefcase, DollarSign } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"

const positions = [
  {
    title: "Technical Sales Representative",
    location: "Scarborough, ON",
    type: "Full-time",
    salary: "$$$",
    description:
      "Join our dynamic sales team and help homeowners find the perfect comfort solutions. Great earning potential with commission structure.",
  },
  {
    title: "Customer Service Specialist",
    location: "Scarborough, ON",
    type: "Full-time",
    salary: "$$",
    description:
      "Be the first point of contact for our valued customers. Provide exceptional service and support across multiple channels.",
  },
  {
    title: "HVAC Technician",
    location: "Greater Toronto Area",
    type: "Full-time",
    salary: "$$$",
    description:
      "Install, maintain, and repair heating and cooling systems. Certification required. Company vehicle and tools provided.",
  },
]

export function PositionsSection() {
  return (
    <section id="positions" className="bg-neutral-50 px-4 py-24">
      <div className="container mx-auto max-w-6xl">
        <h2 className="mb-8 text-center text-4xl font-bold text-neutral-900 lg:text-5xl">Current Openings</h2>
        <div className="mx-auto mb-16 h-1 w-24 bg-primary-600" />

        <div className="space-y-6">
          {positions.map((position, index) => (
            <div
              key={index}
              className="rounded-xl border-l-4 border-primary-600 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl lg:p-8"
            >
              <h3 className="mb-4 text-2xl font-semibold text-neutral-900">{position.title}</h3>

              <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-neutral-600">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{position.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span>{position.type}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  <span>{position.salary}</span>
                </div>
              </div>

              <p className="mb-4 text-neutral-600">{position.description}</p>

              <Link href="/apply">
                <Button variant="ghost" className="text-primary-600 hover:text-primary-700">
                  View Details →
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/apply">
            <Button size="lg" className="bg-primary text-white hover:bg-primary-700">
              View All Positions
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
