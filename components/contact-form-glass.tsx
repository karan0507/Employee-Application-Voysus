"use client"

import { useState } from "react"
import { Send } from "lucide-react"

export function ContactFormGlass() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Glass form submitted:", formData)
    alert("Thank you! We'll get back to you shortly.")
    setFormData({ name: "", email: "", company: "", message: "" })
  }

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800" />

      {/* Glass card */}
      <div className="relative backdrop-blur-xl">
        <div className="rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl">
          <h3 className="mb-2 text-2xl font-bold text-white">Let's Connect</h3>
          <p className="mb-6 text-sm text-white/80">
            Fill out the form below and we'll be in touch soon
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="glass-name" className="mb-2 block text-sm font-medium text-white">
                Your Name
              </label>
              <input
                id="glass-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="glass-email" className="mb-2 block text-sm font-medium text-white">
                Email Address
              </label>
              <input
                id="glass-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder="john@company.com"
              />
            </div>

            {/* Company */}
            <div>
              <label htmlFor="glass-company" className="mb-2 block text-sm font-medium text-white">
                Company Name
              </label>
              <input
                id="glass-company"
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder="Acme Inc."
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="glass-message" className="mb-2 block text-sm font-medium text-white">
                Message
              </label>
              <textarea
                id="glass-message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder="Tell us about your project..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-primary-800 transition-all hover:scale-105 hover:shadow-xl"
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
