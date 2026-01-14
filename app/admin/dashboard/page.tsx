"use client"

import { Users, FileText, TrendingUp, Clock } from "lucide-react"

const stats = [
  { icon: FileText, label: "Total Applications", value: "1,234", change: "+12%", color: "blue" },
  { icon: Users, label: "Active Users", value: "856", change: "+8%", color: "green" },
  { icon: TrendingUp, label: "Conversion Rate", value: "23.4%", change: "+3%", color: "purple" },
  { icon: Clock, label: "Avg Response Time", value: "2.3h", change: "-15%", color: "orange" },
]

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900">Dashboard</h1>
        <p className="text-slate-600">Welcome back! Here's your overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div key={idx} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-${stat.color}-100`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <span className="text-sm font-semibold text-green-600">{stat.change}</span>
              </div>
              <div className="text-3xl font-black text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-bold text-slate-900">Recent Activity</h2>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4 rounded-lg border border-slate-100 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-slate-900">New application submitted</div>
                <div className="text-sm text-slate-600">John Doe applied for Senior Developer</div>
              </div>
              <div className="text-sm text-slate-500">2h ago</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
