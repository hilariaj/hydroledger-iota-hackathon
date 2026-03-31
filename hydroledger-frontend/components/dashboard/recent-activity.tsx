import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock, AlertCircle } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "verified",
    description: "Field A irrigation data verified",
    timestamp: "2 minutes ago",
    blockHash: "0x7f3e...8a2c",
  },
  {
    id: 2,
    type: "pending",
    description: "Field B water usage submitted",
    timestamp: "15 minutes ago",
    blockHash: "Pending...",
  },
  {
    id: 3,
    type: "verified",
    description: "Monthly compliance report generated",
    timestamp: "1 hour ago",
    blockHash: "0x2d4f...9b1e",
  },
  {
    id: 4,
    type: "alert",
    description: "Unusual water flow detected",
    timestamp: "3 hours ago",
    blockHash: "Investigation",
  },
  {
    id: 5,
    type: "verified",
    description: "Sensor calibration verified",
    timestamp: "5 hours ago",
    blockHash: "0x8c2a...4f7d",
  },
]

const statusConfig = {
  verified: {
    icon: CheckCircle2,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  pending: {
    icon: Clock,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  alert: {
    icon: AlertCircle,
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
        <CardDescription>Latest blockchain verifications and alerts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const config = statusConfig[activity.type as keyof typeof statusConfig]
            const Icon = config.icon
            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${config.bg}`}>
                  <Icon className={`h-4 w-4 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{activity.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <code className="text-xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                      {activity.blockHash}
                    </code>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
