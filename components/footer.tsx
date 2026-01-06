import { Phone, Fan as Fax, Globe } from "lucide-react"
import { VoysusLogo } from "./voysus-logo"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-neutral-900 px-4 py-12 text-neutral-300">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          {/* Logo and info */}
          <div className="text-center md:text-left">
            <div className="mb-4 flex justify-center md:justify-start">
              <VoysusLogo size={60} className="text-white" />
            </div>
            <address className="mb-4 not-italic">
              <p>5900 Finch Avenue East, Suite 200B</p>
              <p>Scarborough, ON M1B 5K7</p>
            </address>
            <div className="space-y-1 text-sm">
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <Phone className="h-4 w-4" />
                <span>Tel: (416) 291-0224</span>
              </div>
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <Fax className="h-4 w-4" />
                <span>Fax: (416) 291-0223</span>
              </div>
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <Globe className="h-4 w-4" />
                <a href="https://www.voysus.com" className="hover:text-white">
                  www.voysus.com
                </a>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="text-center md:text-right">
            <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
            <div className="space-y-2">
              <div>
                <a href="#about" className="hover:text-white">
                  About Us
                </a>
              </div>
              <div>
                <Link href="/apply" className="hover:text-white">
                  Apply Now
                </Link>
              </div>
              <div>
                <a href="#positions" className="hover:text-white">
                  Current Openings
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-700 pt-8 text-center text-sm">
          <p className="mb-2">&copy; 2026 Voysus CE Inc. All rights reserved.</p>
          <div className="space-x-4">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
          </div>
          <p className="mt-4 font-semibold text-white">Equal Opportunity Employer</p>
        </div>
      </div>
    </footer>
  )
}
