import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, Phone, Users, FileText, Award } from "lucide-react";
import { VoysusLogo } from "@/components/voysus-logo";

export default function ApplicationSuccessPage() {
  const confirmationNumber = `APP-${new Date().getFullYear()}-${Math.floor(
    Math.random() * 100000
  )
    .toString()
    .padStart(5, "0")}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="text-center">
          <div className="mb-8 flex justify-center">
            <VoysusLogo size={80} className="text-primary" />
          </div>

          <div className="mb-6 flex justify-center">
            <div className="animate-scale-up rounded-full bg-accent-green p-4">
              <CheckCircle className="h-16 w-16 text-white" />
            </div>
          </div>

          <h1 className="mb-4 text-4xl font-bold text-neutral-900 lg:text-5xl">
            Application Submitted!
          </h1>
          <div className="mx-auto mb-2 h-1 w-32 bg-primary-600" />

          <p className="mb-8 text-xl text-neutral-600">
            Thank you for applying to Voysus CE Inc
          </p>

          <div className="mb-12 rounded-lg bg-white p-6 shadow-lg">
            <p className="mb-2 text-sm text-neutral-600">Confirmation Number</p>
            <p className="text-2xl font-bold text-primary-600">
              {confirmationNumber}
            </p>
          </div>

          <div className="mb-12 rounded-lg bg-blue-50 p-6 text-left">
            <div className="mb-4 flex items-center gap-3">
              <Mail className="h-6 w-6 text-primary-600" />
              <div>
                <p className="font-semibold text-neutral-900">
                  Confirmation Email Sent
                </p>
                <p className="text-sm text-neutral-600">
                  Check your inbox for application details
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-neutral-900">
              What Happens Next?
            </h2>

            <div className="grid gap-6 text-left md:grid-cols-2">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-lg font-bold text-primary-600">
                    1
                  </div>
                  <FileText className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="mb-2 font-semibold text-neutral-900">
                  Application Review
                </h3>
                <p className="mb-1 text-sm text-neutral-600">
                  1-2 business days
                </p>
                <p className="text-sm text-neutral-500">
                  Our HR team reviews your application
                </p>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-lg font-bold text-primary-600">
                    2
                  </div>
                  <Phone className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="mb-2 font-semibold text-neutral-900">
                  Initial Screening
                </h3>
                <p className="mb-1 text-sm text-neutral-600">
                  3-5 business days
                </p>
                <p className="text-sm text-neutral-500">
                  If selected, we'll contact you for a phone interview
                </p>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-lg font-bold text-primary-600">
                    3
                  </div>
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="mb-2 font-semibold text-neutral-900">
                  In-Person Interview
                </h3>
                <p className="mb-1 text-sm text-neutral-600">Week 2</p>
                <p className="text-sm text-neutral-500">
                  Meet with our hiring manager and team
                </p>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-lg font-bold text-primary-600">
                    4
                  </div>
                  <Award className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="mb-2 font-semibold text-neutral-900">
                  Decision & Offer
                </h3>
                <p className="mb-1 text-sm text-neutral-600">Within 2 weeks</p>
                <p className="text-sm text-neutral-500">
                  Receive our decision and potential job offer
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-lg border-2 border-primary-200 bg-primary-50 p-6">
            <h3 className="mb-3 text-lg font-semibold text-neutral-900">
              Need Help?
            </h3>
            <div className="space-y-2 text-neutral-700">
              <div className="flex items-center justify-center gap-2">
                <Phone className="h-4 w-4" />
                <span>(416) 291-0224</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Mail className="h-4 w-4" />
                <span>careers@voysus.com</span>
              </div>
            </div>
          </div>

          <Link href="/">
            <Button size="lg" className="bg-primary">
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
