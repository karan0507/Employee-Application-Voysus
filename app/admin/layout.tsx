"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { SidebarNav } from "@/components/admin/sidebar-nav"
import { Breadcrumbs } from "@/components/admin/breadcrumbs"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isLoginPage = pathname === "/admin/login"

  useEffect(() => {
    if (!isLoginPage) {
      // Simple auth check - in real app would check token/session
      const isAuthenticated = sessionStorage.getItem("admin_authenticated")
      if (!isAuthenticated) {
        router.push("/admin/login")
      }
    }
  }, [pathname, router, isLoginPage])

  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <SidebarNav />
      <main className="flex-1 overflow-y-auto lg:ml-64">
        <div className="p-8">
          <Breadcrumbs />
          {children}
        </div>
      </main>
    </div>
  )
}
