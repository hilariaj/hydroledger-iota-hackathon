"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const data = [
  { month: "Jan", usage: 186000, verified: 180000 },
  { month: "Feb", usage: 205000, verified: 198000 },
  { month: "Mar", usage: 237000, verified: 230000 },
  { month: "Apr", usage: 273000, verified: 268000 },
  { month: "May", usage: 209000, verified: 205000 },
  { month: "Jun", usage: 214000, verified: 210000 },
  { month: "Jul", usage: 252000, verified: 248000 },
  { month: "Aug", usage: 284000, verified: 278000 },
  { month: "Sep", usage: 248000, verified: 245000 },
  { month: "Oct", usage: 219000, verified: 215000 },
  { month: "Nov", usage: 195000, verified: 192000 },
  { month: "Dec", usage: 178000, verified: 175000 },
]

export function WaterUsageChart() {
  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Water Usage Trends</CardTitle>
        <CardDescription>
          Monthly water consumption vs. blockchain verified records
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.45 0.12 160)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.45 0.12 160)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorVerified" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.55 0.1 160)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.55 0.1 160)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.01 145)" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "oklch(0.5 0.02 145)", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "oklch(0.5 0.02 145)", fontSize: 12 }}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(1 0 0)",
                  border: "1px solid oklch(0.88 0.01 145)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                formatter={(value: number) => [`${(value / 1000).toFixed(0)}k gal`, ""]}
              />
              <Area
                type="monotone"
                dataKey="usage"
                stroke="oklch(0.45 0.12 160)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorUsage)"
                name="Total Usage"
              />
              <Area
                type="monotone"
                dataKey="verified"
                stroke="oklch(0.55 0.1 160)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorVerified)"
                name="Verified"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Total Usage</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-accent" />
            <span className="text-sm text-muted-foreground">Verified</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
