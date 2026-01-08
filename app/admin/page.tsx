"use client"

import { ApplicationsTable } from "@/components/admin/applications-table"

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-neutral-900">
            Job Applications Dashboard
          </h1>
          <p className="mt-2 text-neutral-600">
            View and manage all submitted applications
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <ApplicationsTable />
      </div>
    </div>
  )
}
