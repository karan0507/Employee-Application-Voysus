"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogIn, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdminLogin() {
  const router = useRouter()
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Frontend only validation
    if (credentials.email && credentials.password) {
      // Mock login - set auth flag in sessionStorage
      sessionStorage.setItem("admin_authenticated", "true")
      router.push("/admin/dashboard")
    } else {
      setError("Please enter both email and password")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="w-full max-w-md px-6">
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-8 shadow-2xl">
          {/* Logo */}
          <div className="mb-6 flex items-center justify-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-black text-slate-900">VOYSUS</span>
          </div>

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-2xl font-bold text-slate-900">Admin Login</h1>
            <p className="text-sm text-slate-600">Enter your credentials to access the dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="admin@voysus.com"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="border-slate-300"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="border-slate-300"
                required
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-blue-600 py-6 font-bold text-white hover:bg-blue-700"
            >
              <LogIn className="mr-2 h-5 w-5" />
              Login to Dashboard
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-slate-500">
            Protected area. Authorized personnel only.
          </div>
        </div>
      </div>
    </div>
  )
}
