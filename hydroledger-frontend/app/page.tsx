import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { WaterUsageChart } from "@/components/dashboard/water-usage-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { ComplianceOverview } from "@/components/dashboard/compliance-overview"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      {/* Main content */}
      <main className="lg:pl-64">
        <div className="px-4 py-6 sm:px-6 lg:px-8 pt-16 lg:pt-6">
          <Header 
            title="Dashboard" 
            subtitle="Water usage overview and verification status"
          />
          
          {/* Stats */}
          <section className="mt-8">
            <StatsCards />
          </section>
          
          {/* Charts and Activity */}
          <section className="mt-8 grid gap-6 lg:grid-cols-3">
            <WaterUsageChart />
            <RecentActivity />
          </section>
          
          {/* Bottom section */}
          <section className="mt-8 grid gap-6 lg:grid-cols-2">
            <ComplianceOverview />
            <QuickActions />
          </section>
          
          {/* Footer */}
          <footer className="mt-12 border-t border-border pt-6 pb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <p>HydroLedger — Blockchain-verified water management</p>
              <div className="flex items-center gap-4">
                <span>Powered by Ethereum</span>
                <span>•</span>
                <span>ESG Compliant</span>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}
