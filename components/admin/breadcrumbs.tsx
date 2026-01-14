"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"

export function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/")
    const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
    return { href, label }
  })

  return (
    <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm">
      <Link
        href="/admin/dashboard"
        className="flex items-center gap-1 text-slate-600 transition-colors hover:text-blue-600"
      >
        <Home className="h-4 w-4" />
        <span className="hidden sm:inline">Home</span>
      </Link>
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.href} className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4 text-slate-400" />
          {index === breadcrumbs.length - 1 ? (
            <span className="font-semibold text-slate-900">{crumb.label}</span>
          ) : (
            <Link
              href={crumb.href}
              className="text-slate-600 transition-colors hover:text-blue-600"
            >
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
