"use client"

import { ApplicationsTable } from "@/components/admin/applications-table"

export default function ApplicationsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-black text-slate-900">Applications</h1>
        <p className="text-slate-600">View and manage all submitted job applications</p>
      </div>
      <ApplicationsTable />
    </div>
  )
}
