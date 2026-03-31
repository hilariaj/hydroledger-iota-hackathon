import { Card, CardContent } from "@/components/ui/card"
import { Droplets, FileCheck, TrendingDown, Shield } from "lucide-react"

const stats = [
  {
    name: "Total Water Usage",
    value: "2.4M",
    unit: "gallons",
    change: "-12%",
    changeType: "positive" as const,
    icon: Droplets,
    description: "vs. last month",
  },
  {
    name: "Verified Records",
    value: "1,284",
    unit: "transactions",
    change: "+8%",
    changeType: "positive" as const,
    icon: FileCheck,
    description: "vs. last month",
  },
  {
    name: "Water Efficiency",
    value: "94.2",
    unit: "%",
    change: "+3.2%",
    changeType: "positive" as const,
    icon: TrendingDown,
    description: "vs. last month",
  },
  {
    name: "Compliance Score",
    value: "A+",
    unit: "",
    change: "Maintained",
    changeType: "neutral" as const,
    icon: Shield,
    description: "ESG Rating",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.name} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                  stat.changeType === "positive"
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-semibold tracking-tight">{stat.value}</span>
                {stat.unit && (
                  <span className="text-sm text-muted-foreground">{stat.unit}</span>
                )}
              </div>
              <p className="text-sm font-medium text-foreground mt-1">{stat.name}</p>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
