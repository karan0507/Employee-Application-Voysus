"use client"

import { useState } from "react"
import { Send } from "lucide-react"

export function ContactFormChat() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Chat form submitted:", formData)
    alert("Thank you! We'll get back to you shortly.")
    setFormData({ name: "", email: "", company: "", message: "" })
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl">
      {/* Chat Header */}
      <div className="bg-primary-600 px-6 py-4">
        <h3 className="text-lg font-semibold text-white">Start a Conversation</h3>
        <p className="text-sm text-white/80">We typically respond within 24 hours</p>
      </div>

      {/* Chat Body */}
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="chat-name" className="mb-2 block text-sm font-medium text-neutral-700">
              Your Name
            </label>
            <input
              id="chat-name"
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
            <label htmlFor="chat-email" className="mb-2 block text-sm font-medium text-neutral-700">
              Email Address
            </label>
            <input
              id="chat-email"
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
            <label htmlFor="chat-company" className="mb-2 block text-sm font-medium text-neutral-700">
              Company Name
            </label>
            <input
              id="chat-company"
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              placeholder="Acme Inc."
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="chat-message" className="mb-2 block text-sm font-medium text-neutral-700">
              How can we help?
            </label>
            <textarea
              id="chat-message"
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
  )
}
