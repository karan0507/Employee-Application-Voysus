"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  User,
  MapPin,
  Shield,
  GraduationCap,
  Briefcase,
  Award,
  MessageSquare,
  Calendar,
  Mail,
  Phone,
  Building2,
  CheckCircle2,
  XCircle,
} from "lucide-react"

interface ApplicationDetailModalProps {
  application: any
  open: boolean
  onClose: () => void
}

export function ApplicationDetailModal({
  application,
  open,
  onClose,
}: ApplicationDetailModalProps) {
  const { payload, email, status, created_at, updated_at, id, version, source } = application

  if (!payload) return null

  const {
    personalDetails,
    address,
    privateInfo,
    education,
    employment,
    skills,
    experience,
  } = payload

  const getStatusColor = (status: string) => {
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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-2xl">Application Details</span>
            <Badge className={getStatusColor(status)}>{status}</Badge>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-100px)] pr-4">
          <div className="space-y-8 pb-8">
            {/* Application Meta Info */}
            <div className="rounded-lg border bg-neutral-50 p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-neutral-700">Application ID:</span>
                  <p className="mt-1 font-mono text-xs text-neutral-900">{id}</p>
                </div>
                <div>
                  <span className="font-medium text-neutral-700">Version:</span>
                  <p className="mt-1 text-neutral-900">{version}</p>
                </div>
                <div>
                  <span className="font-medium text-neutral-700">Source:</span>
                  <p className="mt-1 text-neutral-900">{source}</p>
                </div>
                <div>
                  <span className="font-medium text-neutral-700">Submitted:</span>
                  <p className="mt-1 text-neutral-900">
                    {new Date(created_at).toLocaleString('en-US', {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 1: Personal Details */}
            <Section icon={User} title="Step 1: Personal Details">
              <InfoGrid>
                <InfoItem label="First Name" value={personalDetails?.firstName} />
                <InfoItem label="Middle Name" value={personalDetails?.middleName || 'N/A'} />
                <InfoItem label="Last Name" value={personalDetails?.lastName} />
                <InfoItem label="Email" value={personalDetails?.email} icon={Mail} />
                <InfoItem label="Phone" value={personalDetails?.phone} icon={Phone} />
                <InfoItem label="Alternate Phone" value={personalDetails?.alternatePhone || 'N/A'} />
              </InfoGrid>
            </Section>

            <Separator />

            {/* Step 2: Address */}
            <Section icon={MapPin} title="Step 2: Address Information">
              <InfoGrid>
                <InfoItem label="Street Address" value={address?.street} fullWidth />
                <InfoItem label="City" value={address?.city} />
                <InfoItem label="Province" value={address?.province} />
                <InfoItem label="Postal Code" value={address?.postalCode} />
              </InfoGrid>
            </Section>

            <Separator />

            {/* Step 3: Private & Security */}
            <Section icon={Shield} title="Step 3: Private & Security Information">
              <InfoGrid>
                <InfoItem
                  label="Date of Birth"
                  value={privateInfo?.dateOfBirth}
                  icon={Calendar}
                />
                <InfoItem label="SIN" value={privateInfo?.sin || 'Not provided'} />
                <InfoItem
                  label="Eligible to Work in Canada"
                  value={
                    <BooleanBadge value={privateInfo?.eligibleToWork} />
                  }
                />
                <InfoItem
                  label="Criminal Record"
                  value={
                    <BooleanBadge value={privateInfo?.criminalRecord} />
                  }
                />
                <InfoItem label="Referral" value={privateInfo?.referral || 'N/A'} fullWidth />
              </InfoGrid>
            </Section>

            <Separator />

            {/* Step 4: Education */}
            <Section icon={GraduationCap} title="Step 4: Education Background">
              <InfoGrid>
                <InfoItem label="Education Level" value={education?.level} />
                <InfoItem label="Field of Study" value={education?.fieldOfStudy} />
                <InfoItem label="Institution" value={education?.institution} icon={Building2} />
                <InfoItem label="Graduation Year" value={education?.graduationYear} />
              </InfoGrid>
            </Section>

            <Separator />

            {/* Step 5: Employment History */}
            <Section icon={Briefcase} title="Step 5: Employment History">
              <InfoGrid>
                <InfoItem label="Company Name" value={employment?.companyName} icon={Building2} />
                <InfoItem label="Position" value={employment?.position} />
                <InfoItem label="Start Date" value={employment?.startDate} />
                <InfoItem
                  label="End Date"
                  value={employment?.current ? 'Current' : employment?.endDate}
                />
                <InfoItem
                  label="Currently Employed"
                  value={<BooleanBadge value={employment?.current} />}
                />
                <InfoItem
                  label="May Contact Supervisor"
                  value={<BooleanBadge value={employment?.mayContact} />}
                />
                <InfoItem label="Supervisor Name" value={employment?.supervisorName || 'N/A'} />
                <InfoItem label="Supervisor Phone" value={employment?.supervisorPhone || 'N/A'} />
                <InfoItem label="Reason for Leaving" value={employment?.reasonForLeaving} fullWidth />
                <InfoItem label="Job Duties" value={employment?.jobDuties} fullWidth />
              </InfoGrid>
            </Section>

            <Separator />

            {/* Step 6: Skills */}
            <Section icon={Award} title="Step 6: Skills & Qualifications">
              <div className="space-y-3">
                {skills && skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill: string, index: number) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-primary-50 text-primary-700 border-primary-200"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-neutral-500">No skills selected</p>
                )}
                <p className="text-xs text-neutral-500 mt-2">
                  Total Skills: {skills?.length || 0}
                </p>
              </div>
            </Section>

            <Separator />

            {/* Step 7: Experience Question */}
            <Section icon={MessageSquare} title="Step 7: Why Join Voysus?">
              <div className="rounded-lg bg-neutral-50 border p-4">
                {experience?.whyVoysus ? (
                  <p className="text-sm leading-relaxed text-neutral-700 whitespace-pre-wrap">
                    {experience.whyVoysus}
                  </p>
                ) : (
                  <p className="text-sm text-neutral-500 italic">No response provided</p>
                )}
                {experience?.whyVoysus && (
                  <p className="mt-3 text-xs text-neutral-500">
                    Word count: {experience.whyVoysus.trim().split(/\s+/).filter((w: string) => w.length > 0).length}
                  </p>
                )}
              </div>
            </Section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

// Helper Components
function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: any
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-primary-600" />
        <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
      </div>
      {children}
    </div>
  )
}

function InfoGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
}

function InfoItem({
  label,
  value,
  icon: Icon,
  fullWidth = false,
}: {
  label: string
  value: React.ReactNode
  icon?: any
  fullWidth?: boolean
}) {
  return (
    <div className={fullWidth ? 'md:col-span-2' : ''}>
      <label className="text-sm font-medium text-neutral-700">{label}</label>
      <div className="mt-1 flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-neutral-400" />}
        <p className="text-sm text-neutral-900">
          {value || <span className="text-neutral-400">Not provided</span>}
        </p>
      </div>
    </div>
  )
}

function BooleanBadge({ value }: { value: boolean }) {
  return value ? (
    <Badge className="bg-green-100 text-green-800 border-green-200">
      <CheckCircle2 className="h-3 w-3 mr-1" />
      Yes
    </Badge>
  ) : (
    <Badge className="bg-red-100 text-red-800 border-red-200">
      <XCircle className="h-3 w-3 mr-1" />
      No
    </Badge>
  )
}
