"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Droplets,
  FileCheck,
  FilePlus,
  ShieldCheck,
  Award,
  Settings,
  Users,
  BarChart3,
  Shield,
  HelpCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const mainNav = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Generate Proof", href: "/generate-proof", icon: FilePlus },
  { name: "Verify Proof", href: "/verify", icon: ShieldCheck },
  { name: "Certificate", href: "/certificate", icon: Award },
]

const secondaryNav = [
  { name: "Water Usage", href: "/water-usage", icon: Droplets },
  { name: "Verifications", href: "/verifications", icon: FileCheck },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Stakeholders", href: "/stakeholders", icon: Users },
  { name: "Compliance", href: "/compliance", icon: Shield },
  { name: "Settings", href: "/settings", icon: Settings },
]

const supportNav = [
  { name: "Help", href: "/help", icon: HelpCircle },
]

export function Sidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-200 lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 px-6 border-b border-sidebar-border">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Droplets className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold tracking-tight">HydroLedger</span>
            <span className="text-xs text-sidebar-foreground/60">Water Verification</span>
          </div>
        </div>

        {/* Main navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div>
            <p className="px-3 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/40 mb-2">
              Main
            </p>
            <ul className="space-y-1">
              {mainNav.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="mt-6">
            <p className="px-3 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/40 mb-2">
              Secondary
            </p>
            <ul className="space-y-1">
              {secondaryNav.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="mt-6">
            <p className="px-3 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/40 mb-2">
              Support
            </p>
            <ul className="space-y-1">
              {supportNav.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>

        {/* User section */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-accent text-sm font-medium">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">Farm Administrator</p>
            </div>
            <Button variant="ghost" size="icon" className="shrink-0 text-sidebar-foreground/60 hover:text-sidebar-foreground">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
