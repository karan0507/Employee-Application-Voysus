"use client"

import { useEffect, useState } from "react"
import { TableFilters } from "./table-filters"
import { ApplicationDetailModal } from "./application-detail-modal"
import { EmailTemplateModal } from "./email-template-modal"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Eye, Loader2, MoreVertical, FileDown, Edit, Trash2, Mail } from "lucide-react"

interface Application {
  id: string
  email: string
  status: string
  created_at: string
  version: string
}

interface ApplicationDetail extends Application {
  payload: any
  updated_at: string
  source: string
}

export function ApplicationsTable() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedApp, setSelectedApp] = useState<ApplicationDetail | null>(null)
  const [loadingDetail, setLoadingDetail] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [emailModalOpen, setEmailModalOpen] = useState(false)

  // Fetch applications list
  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/admin/applications')

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }

      const data = await response.json()
      setApplications(data.applications || [])
    } catch (err) {
      console.error('Failed to fetch applications:', err)
      setError(err instanceof Error ? err.message : 'Failed to load applications')
    } finally {
      setLoading(false)
    }
  }

  // Fetch single application details
  const fetchApplicationDetail = async (id: string) => {
    try {
      setLoadingDetail(true)
      const response = await fetch(`/api/admin/applications/${id}`)

      if (!response.ok) {
        throw new Error(`Failed to fetch application details`)
      }

      const data = await response.json()
      setSelectedApp(data)
    } catch (err) {
      console.error('Failed to fetch application details:', err)
      alert('Failed to load application details')
    } finally {
      setLoadingDetail(false)
    }
  }

  const handleViewClick = (id: string) => {
    fetchApplicationDetail(id)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(applications.map(app => app.id)))
    } else {
      setSelectedIds(new Set())
    }
  }

  const handleSelectOne = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedIds)
    if (checked) {
      newSelected.add(id)
    } else {
      newSelected.delete(id)
    }
    setSelectedIds(newSelected)
  }

  const handleDownloadPDF = (id: string) => {
    // TODO: Implement PDF download functionality
    console.log('Download PDF for application:', id)
  }

  const handleEdit = (id: string) => {
    // TODO: Implement edit functionality
    console.log('Edit application:', id)
  }

  const handleDelete = (id: string) => {
    // TODO: Implement delete functionality
    console.log('Delete application:', id)
  }

  const getSelectedEmails = () => {
    return applications
      .filter(app => selectedIds.has(app.id))
      .map(app => app.email)
  }

  const getSelectedNames = () => {
    return applications
      .filter(app => selectedIds.has(app.id))
      .map(app => app.email.split('@')[0])
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800'
      case 'reviewing':
        return 'bg-yellow-100 text-yellow-800'
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-neutral-100 text-neutral-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        <span className="ml-3 text-neutral-600">Loading applications...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6">
        <h3 className="font-semibold text-red-800">Error Loading Applications</h3>
        <p className="mt-2 text-sm text-red-700">{error}</p>
        <Button
          onClick={fetchApplications}
          className="mt-4"
          variant="outline"
        >
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      {selectedIds.size > 0 && (
        <div className="flex items-center justify-between rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
              {selectedIds.size}
            </div>
            <span className="font-semibold text-blue-900">
              {selectedIds.size} application{selectedIds.size !== 1 ? 's' : ''} selected
            </span>
          </div>
          <Button
            onClick={() => setEmailModalOpen(true)}
            className="bg-blue-600 font-semibold hover:bg-blue-700"
          >
            <Mail className="mr-2 h-4 w-4" />
            Send Email Template
          </Button>
        </div>
      )}

      {/* Filters - UI Only */}
      <TableFilters selectedCount={selectedIds.size} />

      {/* Mobile Cards View */}
      <div className="space-y-4 md:hidden">
        {applications.length === 0 ? (
          <div className="rounded-lg border bg-white p-8 text-center text-slate-500">
            No applications found
          </div>
        ) : (
          applications.map((app) => (
            <div key={app.id} className="rounded-lg border bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedIds.has(app.id)}
                    onCheckedChange={(checked) => handleSelectOne(app.id, checked as boolean)}
                  />
                  <div>
                    <div className="font-semibold text-slate-900">{app.email}</div>
                    <div className="mt-1 text-xs text-slate-500">
                      {new Date(app.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleViewClick(app.id)}>
                      <Eye className="mr-2 h-4 w-4" /> View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDownloadPDF(app.id)}>
                      <FileDown className="mr-2 h-4 w-4" /> Download
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEdit(app.id)}>
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(app.id)} className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center justify-between">
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusBadgeColor(app.status)}`}>
                  {app.status}
                </span>
                <Button
                  onClick={() => handleDownloadPDF(app.id)}
                  size="sm"
                  variant="outline"
                  className="text-xs"
                >
                  <FileDown className="mr-1 h-3 w-3" /> PDF
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden rounded-lg border bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-neutral-50">
              <tr>
                <th className="w-12 px-6 py-4">
                  <Checkbox
                    checked={selectedIds.size === applications.length && applications.length > 0}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all applications"
                  />
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                  Submitted Date
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-neutral-900">
                  Download
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-neutral-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-neutral-500">
                    No applications found
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="w-12 px-6 py-4">
                      <Checkbox
                        checked={selectedIds.has(app.id)}
                        onCheckedChange={(checked) => handleSelectOne(app.id, checked as boolean)}
                        aria-label={`Select application ${app.email}`}
                      />
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-900">
                      {app.email}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusBadgeColor(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {new Date(app.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button
                        onClick={() => handleDownloadPDF(app.id)}
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        title="Download PDF"
                      >
                        <FileDown className="h-4 w-4" />
                      </Button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            disabled={loadingDetail}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewClick(app.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(app.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(app.id)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer with count */}
        <div className="border-t bg-neutral-50 px-6 py-4">
          <p className="text-sm text-neutral-600">
            Showing <span className="font-medium text-neutral-900">{applications.length}</span> application{applications.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Application Detail Modal */}
      {selectedApp && (
        <ApplicationDetailModal
          application={selectedApp}
          open={!!selectedApp}
          onClose={() => setSelectedApp(null)}
        />
      )}

      {/* Email Template Modal */}
      <EmailTemplateModal
        open={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        selectedEmails={getSelectedEmails()}
        selectedNames={getSelectedNames()}
      />
    </div>
  )
}
