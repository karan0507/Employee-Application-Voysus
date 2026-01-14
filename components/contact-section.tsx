"use client"

import { useState } from "react"
import { ContactFormChat } from "./contact-form-chat"
import { ContactFormGlass } from "./contact-form-glass"
import { ContactFormSplit } from "./contact-form-split"

type FormStyle = "chat" | "glass" | "split"

export function ContactSection() {
  const [activeForm, setActiveForm] = useState<FormStyle>("chat")

  return (
    <section id="contact" className="bg-neutral-50 px-4 py-24">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-neutral-900 lg:text-4xl">
            Get in Touch
          </h2>
          <p className="text-lg text-neutral-600">
            Ready to transform your customer experience? Let's start the conversation.
          </p>
        </div>

        {/* Form Style Selector */}
        <div className="mb-12 flex justify-center gap-2">
          <button
            onClick={() => setActiveForm("chat")}
            className={`rounded-lg px-6 py-3 text-sm font-semibold transition-all ${
              activeForm === "chat"
                ? "bg-primary-600 text-white shadow-lg"
                : "bg-white text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            Chat Style
          </button>
          <button
            onClick={() => setActiveForm("glass")}
            className={`rounded-lg px-6 py-3 text-sm font-semibold transition-all ${
              activeForm === "glass"
                ? "bg-primary-600 text-white shadow-lg"
                : "bg-white text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            Glassmorphism
          </button>
          <button
            onClick={() => setActiveForm("split")}
            className={`rounded-lg px-6 py-3 text-sm font-semibold transition-all ${
              activeForm === "split"
                ? "bg-primary-600 text-white shadow-lg"
                : "bg-white text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            Split Screen
          </button>
        </div>

        {/* Render Active Form */}
        <div className="mx-auto max-w-4xl">
          {activeForm === "chat" && <ContactFormChat />}
          {activeForm === "glass" && <ContactFormGlass />}
          {activeForm === "split" && <ContactFormSplit />}
        </div>
      </div>
    </section>
  )
}
