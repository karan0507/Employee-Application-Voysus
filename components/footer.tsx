import { Phone, Mail, MapPin, Linkedin, Twitter, Facebook } from "lucide-react"
import { VoysusLogo } from "./voysus-logo"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-neutral-900 px-4 py-12 text-neutral-300">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <VoysusLogo size={60} className="text-white" />
            </div>
            <p className="mb-4 text-sm leading-relaxed text-neutral-400">
              Enterprise-grade contact center solutions powered by AI. Transforming customer experiences across North America.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://linkedin.com/company/voysus"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 transition-colors hover:bg-primary-600"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/voysus"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 transition-colors hover:bg-primary-600"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/voysus"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 transition-colors hover:bg-primary-600"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Services</h3>
            <div className="space-y-2 text-sm">
              <div>
                <a href="#services" className="transition-colors hover:text-white">
                  Omnichannel Support
                </a>
              </div>
              <div>
                <a href="#services" className="transition-colors hover:text-white">
                  AI Automation
                </a>
              </div>
              <div>
                <a href="#services" className="transition-colors hover:text-white">
                  Quality Assurance
                </a>
              </div>
              <div>
                <a href="#services" className="transition-colors hover:text-white">
                  Workforce Management
                </a>
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Company</h3>
            <div className="space-y-2 text-sm">
              <div>
                <a href="#solutions" className="transition-colors hover:text-white">
                  About Us
                </a>
              </div>
              <div>
                <Link href="/apply" className="transition-colors hover:text-white">
                  Careers
                </Link>
              </div>
              <div>
                <a href="#contact" className="transition-colors hover:text-white">
                  Contact
                </a>
              </div>
              <div>
                <Link href="/admin/dashboard" className="transition-colors hover:text-white">
                  Admin Portal
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-400" />
                <div>
                  5900 Finch Avenue East
                  <br />
                  Suite 200B
                  <br />
                  Toronto, ON M1B 5K7
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-primary-400" />
                <a href="tel:18338697871" className="transition-colors hover:text-white">
                  +1 (833) VOYSUS1
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-primary-400" />
                <a href="mailto:info@voysus.com" className="transition-colors hover:text-white">
                  info@voysus.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-700 pt-8 text-center text-sm">
          <p className="mb-2">&copy; 2026 Voysus CE Inc. All rights reserved.</p>
          <div className="mb-4 flex flex-wrap items-center justify-center gap-4">
            <a href="#" className="transition-colors hover:text-white">
              Privacy Policy
            </a>
            <span className="text-neutral-600">|</span>
            <a href="#" className="transition-colors hover:text-white">
              Terms of Service
            </a>
            <span className="text-neutral-600">|</span>
            <a href="#" className="transition-colors hover:text-white">
              Accessibility
            </a>
          </div>
          <p className="font-semibold text-white">Equal Opportunity Employer</p>
        </div>
      </div>
    </footer>
  )
}
