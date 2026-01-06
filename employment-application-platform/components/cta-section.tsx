import { Phone, Mail } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="bg-gradient-to-br from-primary-700 to-primary-900 px-4 py-20 text-white">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="mb-6 text-4xl font-bold">Ready to Start Your Journey?</h2>

        <p className="mb-12 text-xl text-white/90">
          Our team reviews applications within 3-5 business days. Take the first step today!
        </p>

        <Link href="/apply">
          <Button
            size="lg"
            className="mb-12 animate-pulse-glow bg-white px-12 py-6 text-lg font-semibold text-primary-800 shadow-2xl transition-all hover:scale-110"
          >
            Begin Application →
          </Button>
        </Link>

        <div className="space-y-2 text-lg text-white/80">
          <p>Questions? We're here to help!</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="tel:4162910224" className="flex items-center gap-2 underline-offset-4 hover:underline">
              <Phone className="h-5 w-5" />
              (416) 291-0224
            </a>
            <span className="hidden sm:inline">|</span>
            <a href="mailto:careers@voysus.com" className="flex items-center gap-2 underline-offset-4 hover:underline">
              <Mail className="h-5 w-5" />
              careers@voysus.com
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
