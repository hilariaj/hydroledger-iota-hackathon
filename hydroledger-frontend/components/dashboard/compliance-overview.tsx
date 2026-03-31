import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num)
}

const complianceMetrics = [
  {
    name: "Water Rights Allocation",
    current: 2400000,
    limit: 3000000,
    unit: "gallons",
  },
  {
    name: "Monthly Usage Target",
    current: 178000,
    limit: 200000,
    unit: "gallons",
  },
  {
    name: "Verification Rate",
    current: 97,
    limit: 100,
    unit: "%",
  },
  {
    name: "Sensor Coverage",
    current: 48,
    limit: 50,
    unit: "devices",
  },
]

export function ComplianceOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Compliance Overview</CardTitle>
        <CardDescription>Current usage against regulatory limits</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {complianceMetrics.map((metric) => {
          const percentage = (metric.current / metric.limit) * 100
          const isNearLimit = percentage >= 80
          return (
            <div key={metric.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{metric.name}</span>
                <span className="text-sm text-muted-foreground">
                  {formatNumber(metric.current)} / {formatNumber(metric.limit)} {metric.unit}
                </span>
              </div>
              <Progress
                value={percentage}
                className={`h-2 ${isNearLimit ? "[&>div]:bg-amber-500" : ""}`}
              />
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
