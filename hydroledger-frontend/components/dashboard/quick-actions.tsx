import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FilePlus, ShieldCheck, Award } from "lucide-react"

const actions = [
  {
    name: "Generate Proof",
    description: "Create new water usage proof",
    icon: FilePlus,
    href: "/generate-proof",
  },
  {
    name: "Verify Proof",
    description: "Verify a proof on blockchain",
    icon: ShieldCheck,
    href: "/verify",
  },
  {
    name: "View Certificate",
    description: "Access proof certificate",
    icon: Award,
    href: "/certificate",
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        <CardDescription>Get started with the MVP flow</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {actions.map((action) => (
            <Button
              key={action.name}
              variant="outline"
              className="h-auto flex items-start gap-3 p-4 text-left justify-start"
              asChild
            >
              <Link href={action.href}>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <action.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{action.name}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
