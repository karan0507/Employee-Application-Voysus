"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, Send } from "lucide-react"

export function ContactFormSplit() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Split form submitted:", formData)
    alert("Thank you! We'll get back to you shortly.")
    setFormData({ name: "", email: "", company: "", message: "" })
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Contact Info */}
        <div className="bg-gradient-to-br from-primary-900 to-primary-800 p-8 text-white lg:p-12">
          <h3 className="mb-4 text-2xl font-bold">Contact Information</h3>
          <p className="mb-8 text-white/80">
            Reach out to us and we'll respond as soon as possible
          </p>

          <div className="space-y-6">
            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-white/10 p-3">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-medium text-white/60">Phone</div>
                <div className="text-base">+1 (833) VOYSUS1</div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-white/10 p-3">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-medium text-white/60">Email</div>
                <div className="text-base">info@voysus.com</div>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-white/10 p-3">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-medium text-white/60">Address</div>
                <div className="text-base">
                  5900 Finch Avenue East
                  <br />
                  Suite 200B, Toronto, ON
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="p-8 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="split-name" className="mb-2 block text-sm font-medium text-neutral-700">
                Your Name
              </label>
              <input
                id="split-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="split-email" className="mb-2 block text-sm font-medium text-neutral-700">
                Email Address
              </label>
              <input
                id="split-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                placeholder="john@company.com"
              />
            </div>

            {/* Company */}
            <div>
              <label htmlFor="split-company" className="mb-2 block text-sm font-medium text-neutral-700">
                Company Name
              </label>
              <input
                id="split-company"
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                placeholder="Acme Inc."
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="split-message" className="mb-2 block text-sm font-medium text-neutral-700">
                Message
              </label>
              <textarea
                id="split-message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                placeholder="Tell us about your needs..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg"
            >
              Send Message
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
