import { Mail, FileText, Eye, CheckCircle } from "lucide-react"

const steps = [
  {
    number: 1,
    icon: Mail,
    title: "Request Access Link",
    description: "Submit your email to receive a unique application link",
  },
  {
    number: 2,
    icon: FileText,
    title: "Complete Form",
    description: "Fill out the comprehensive application (10-15 minutes)",
  },
  {
    number: 3,
    icon: Eye,
    title: "Review & Submit",
    description: "Review your information and submit (2-3 minutes)",
  },
  {
    number: 4,
    icon: CheckCircle,
    title: "Receive Confirmation",
    description: "Get instant confirmation via email",
  },
]

export function ProcessSection() {
  return (
    <section id="process" className="bg-neutral-50 px-4 py-24">
      <div className="container mx-auto max-w-6xl">
        <h2 className="mb-8 text-center text-4xl font-bold text-neutral-900 lg:text-5xl">How to Apply</h2>
        <div className="mx-auto mb-4 h-1 w-24 bg-primary-600" />

        <p className="mx-auto mb-16 text-center text-xl text-neutral-600">Simple 4-step process to join our team</p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="flex flex-col items-center text-center">
                {/* Step number circle */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-600 text-2xl font-bold text-white shadow-lg">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="mb-4 rounded-full bg-white p-4 shadow-md">
                  <step.icon className="h-8 w-8 text-primary-600" />
                </div>

                {/* Title */}
                <h3 className="mb-3 text-xl font-semibold text-neutral-900">{step.title}</h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-neutral-600">{step.description}</p>
              </div>

              {/* Connecting line (hidden on mobile and last item) */}
              {index < steps.length - 1 && (
                <div className="absolute left-full top-8 hidden w-full -translate-x-1/2 lg:block">
                  <div className="h-0.5 w-full border-t-2 border-dashed border-neutral-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
