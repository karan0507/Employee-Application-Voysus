"use client"

import { Info } from "lucide-react"

export default function SettingsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-black text-slate-900">Settings</h1>
        <p className="text-slate-600">Configure system settings and application preferences</p>
      </div>

      <div className="space-y-6">
        {/* Employment History Settings */}
        <div className="rounded-lg border bg-white p-6">
          <h2 className="mb-4 text-xl font-bold text-slate-900">Employment History Configuration</h2>

          <div className="space-y-4">
            <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4">
              <div className="flex items-start gap-3">
                <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                <div>
                  <h3 className="mb-1 font-semibold text-blue-900">Years of Experience</h3>
                  <p className="text-sm text-blue-700">
                    Employment history uses "years of experience" instead of start/end dates.
                    Applicants enter number of years (e.g., 3 years, 5.5 years).
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border-l-4 border-purple-500 bg-purple-50 p-4">
              <div className="flex items-start gap-3">
                <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-600" />
                <div>
                  <h3 className="mb-1 font-semibold text-purple-900">Position Selection</h3>
                  <p className="text-sm text-purple-700">
                    Position field in employment history is a dropdown (select only).
                    Positions are stored in database and dynamically loaded.
                    Not free-text input to maintain data consistency.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-slate-50 p-4">
            <h3 className="mb-3 text-sm font-bold text-slate-900">Available Positions</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Software Engineer",
                "Senior Developer",
                "Team Lead",
                "Product Manager",
                "QA Engineer",
                "DevOps Engineer",
                "UI/UX Designer",
                "Data Analyst",
              ].map((position) => (
                <span
                  key={position}
                  className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700"
                >
                  {position}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Note: Positions can be managed from admin panel filters
            </p>
          </div>
        </div>

        {/* General Settings Placeholder */}
        <div className="rounded-lg border bg-white p-6">
          <h2 className="mb-4 text-xl font-bold text-slate-900">General Settings</h2>
          <p className="text-slate-600">Additional system settings will appear here.</p>
        </div>
      </div>
    </div>
  )
}
