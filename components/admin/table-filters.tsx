"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, RotateCcw, Download } from "lucide-react"

interface TableFiltersProps {
  selectedCount?: number
}

export function TableFilters({ selectedCount = 0 }: TableFiltersProps) {
  const handleBulkDownload = () => {
    // TODO: Implement bulk PDF download functionality
    console.log('Bulk download requested for', selectedCount, 'applications')
  }
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      {/* Bulk Actions Bar */}
      {selectedCount > 0 && (
        <div className="mb-4 flex items-center justify-between rounded-lg bg-primary-50 border border-primary-200 px-4 py-3">
          <span className="text-sm font-medium text-primary-900">
            {selectedCount} application{selectedCount !== 1 ? 's' : ''} selected
          </span>
          <Button
            onClick={handleBulkDownload}
            size="sm"
            className="bg-primary-600 hover:bg-primary-700"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Selected PDFs
          </Button>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-12">
        {/* Search */}
        <div className="md:col-span-4">
          <label className="mb-2 block text-sm font-medium text-neutral-700">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <Input
              placeholder="Search by email or name..."
              className="pl-10"
              disabled
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="md:col-span-3">
          <label className="mb-2 block text-sm font-medium text-neutral-700">
            Status
          </label>
          <select
            className="h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled
          >
            <option>All Statuses</option>
            <option>Submitted</option>
            <option>Reviewing</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>

        {/* Date From */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-neutral-700">
            From Date
          </label>
          <Input
            type="date"
            disabled
          />
        </div>

        {/* Date To */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-neutral-700">
            To Date
          </label>
          <Input
            type="date"
            disabled
          />
        </div>

        {/* Reset Button */}
        <div className="flex items-end md:col-span-1">
          <Button
            variant="outline"
            className="w-full"
            disabled
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Disabled Notice */}
      <p className="mt-4 text-xs text-neutral-500 italic">
        Note: Filters are UI-only. Functionality will be added in next phase.
      </p>
    </div>
  )
}
