"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Users, MessageSquare } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

export function RedesignedContact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-white py-20">
      <div className="mx-auto max-w-7xl px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Left Side - Contact Info (2 columns) */}
          <div className="lg:col-span-2">
            <div className="mb-4 text-sm font-bold uppercase tracking-wider text-blue-600">
              Get In Touch
            </div>
            <h2 className="mb-6 text-4xl font-black text-slate-900 lg:text-5xl">
              Let's Transform Your Customer Experience
            </h2>
            <p className="mb-8 text-lg text-slate-600">
              Ready to elevate your customer engagement? Our team is here to help you get started.
            </p>

            {/* Contact Cards */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="mb-1 font-bold text-slate-900">Email Us</div>
                  <a href="mailto:contact@voysus.com" className="text-sm text-blue-600 hover:underline">
                    contact@voysus.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-green-100">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="mb-1 font-bold text-slate-900">Call Us</div>
                  <a href="tel:+1234567890" className="text-sm text-blue-600 hover:underline">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-purple-100">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <div className="mb-1 font-bold text-slate-900">Visit Us</div>
                  <p className="text-sm text-slate-600">123 Business Ave, Suite 100<br />San Francisco, CA 94105</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
                <Clock className="mb-2 h-6 w-6 text-blue-600" />
                <div className="text-2xl font-black text-slate-900">24/7</div>
                <div className="text-xs text-slate-600">Support Available</div>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 p-4">
                <Users className="mb-2 h-6 w-6 text-green-600" />
                <div className="text-2xl font-black text-slate-900">48hr</div>
                <div className="text-xs text-slate-600">Deployment Time</div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form (3 columns) */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-xl">
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-slate-900">Message Sent!</h3>
                  <p className="text-slate-600">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                      <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Send us a message</h3>
                      <p className="text-sm text-slate-600">Fill out the form below</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                          Full Name *
                        </label>
                        <Input
                          required
                          placeholder="John Doe"
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="border-slate-300"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                          Email Address *
                        </label>
                        <Input
                          required
                          type="email"
                          placeholder="john@company.com"
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className="border-slate-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                          Company Name
                        </label>
                        <Input
                          placeholder="Acme Inc."
                          value={formState.company}
                          onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                          className="border-slate-300"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          placeholder="+1 (234) 567-890"
                          value={formState.phone}
                          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                          className="border-slate-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Message *
                      </label>
                      <Textarea
                        required
                        placeholder="Tell us about your requirements..."
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="min-h-32 border-slate-300"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-blue-600 py-6 text-base font-bold text-white hover:bg-blue-700"
                    >
                      Send Message <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
