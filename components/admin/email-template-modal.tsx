"use client"

import { useState } from "react"
import { X, Mail, Send, ChevronRight, FileText } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface EmailTemplateModalProps {
  open: boolean
  onClose: () => void
  selectedEmails: string[]
  selectedNames: string[]
}

const templates = [
  {
    id: "interview",
    name: "Interview Invitation",
    subject: "Interview Invitation - {position}",
    body: "Dear {name},\n\nWe're impressed with your application and would like to invite you for an interview.\n\nBest regards,\nVOYSUS Team",
  },
  {
    id: "rejection",
    name: "Application Rejection",
    subject: "Application Update - {position}",
    body: "Dear {name},\n\nThank you for your interest. We've decided to move forward with other candidates.\n\nBest regards,\nVOYSUS Team",
  },
  {
    id: "received",
    name: "Application Received",
    subject: "Application Received - {position}",
    body: "Dear {name},\n\nWe've received your application and will review it shortly.\n\nBest regards,\nVOYSUS Team",
  },
]

export function EmailTemplateModal({
  open,
  onClose,
  selectedEmails,
  selectedNames,
}: EmailTemplateModalProps) {
  const [step, setStep] = useState<"select" | "review">("select")
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId)
    if (template) {
      setSelectedTemplate(templateId)
      setSubject(template.subject)
      setBody(template.body)
      setStep("review")
    }
  }

  const handleSend = () => {
    // Frontend only - would call API to send emails
    alert(`Emails sent to ${selectedEmails.length} recipients!`)
    onClose()
    resetModal()
  }

  const resetModal = () => {
    setStep("select")
    setSelectedTemplate(null)
    setSubject("")
    setBody("")
  }

  const handleClose = () => {
    onClose()
    resetModal()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl p-6">
        <DialogHeader className="mb-6">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Mail className="h-5 w-5 text-blue-600" />
            Send Email Template
          </DialogTitle>
        </DialogHeader>

        {step === "select" && (
          <div className="space-y-4">
            <div className="rounded-lg bg-blue-50 p-4">
              <div className="text-sm font-semibold text-blue-900">
                {selectedEmails.length} recipient{selectedEmails.length !== 1 ? "s" : ""} selected
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedNames.map((name, idx) => (
                  <span
                    key={idx}
                    className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold text-slate-900">Choose Template</h3>
              <div className="space-y-3">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateSelect(template.id)}
                    className="group flex w-full items-center justify-between rounded-lg border-2 border-slate-200 bg-white p-4 text-left transition-all hover:border-blue-300 hover:bg-blue-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{template.name}</div>
                        <div className="text-sm text-slate-600">{template.subject}</div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-600" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === "review" && (
          <div className="space-y-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStep("select")}
              className="mb-2"
            >
              ← Back to Templates
            </Button>

            <div className="rounded-lg bg-slate-50 p-4">
              <div className="text-sm font-semibold text-slate-900">
                Sending to {selectedEmails.length} recipient{selectedEmails.length !== 1 ? "s" : ""}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedEmails.map((email, idx) => (
                  <span
                    key={idx}
                    className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700"
                  >
                    {email}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Subject Line
              </label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Email subject"
                className="border-slate-300"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Message Body
              </label>
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Email content..."
                className="min-h-48 border-slate-300"
              />
              <div className="mt-2 text-xs text-slate-500">
                Variables: {"{name}"}, {"{position}"}, {"{date}"}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSend}
                className="flex-1 bg-blue-600 py-6 font-bold hover:bg-blue-700"
              >
                <Send className="mr-2 h-4 w-4" />
                Send to {selectedEmails.length} Recipient{selectedEmails.length !== 1 ? "s" : ""}
              </Button>
              <Button
                variant="outline"
                onClick={handleClose}
                className="border-2 px-8"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
