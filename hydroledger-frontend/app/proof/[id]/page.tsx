"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  FileCheck, 
  ShieldCheck, 
  Copy, 
  Check, 
  ArrowLeft,
  ExternalLink,
  Clock,
  Droplets,
  MapPin,
  Hash,
  Link2,
  Loader2
} from "lucide-react"
import Link from "next/link"

// Mock proof data - in production this would come from an API
const mockProofData = {
  id: "PROOF-2026-0319-A7F2",
  farmName: "Green Valley Farm",
  meterId: "MTR-7842-NW",
  waterUsage: 12500,
  unit: "liters",
  cropType: "Wheat",
  region: "Northern Plains",
  timestamp: "2026-03-19T14:30:00Z",
  generatedHash: "0x8f4e2c1a9b3d7e6f5a0c8b2d1e4f7a3c9b8e2d1f4a7c3b9e8d2f1a4c7b3e9d8f2a1c",
  iotaAnchorRef: "iota1qp8h7q4k6x3j2m5n9w8r7t6y5u4i3o2p1a0s9d8f7g6h5j4k3l2z1x0c9v8b7n6m",
  status: "anchored" as "pending" | "anchored" | "verified",
  blockNumber: 18429753,
  networkId: "IOTA Mainnet",
}

function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num)
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short"
  })
}

function getStatusConfig(status: "pending" | "anchored" | "verified") {
  switch (status) {
    case "pending":
      return {
        label: "Pending",
        variant: "secondary" as const,
        icon: Clock,
        description: "Awaiting blockchain confirmation"
      }
    case "anchored":
      return {
        label: "Anchored",
        variant: "default" as const,
        icon: Link2,
        description: "Successfully anchored to IOTA Tangle"
      }
    case "verified":
      return {
        label: "Verified",
        variant: "outline" as const,
        icon: ShieldCheck,
        description: "Independently verified by third party"
      }
  }
}

export default function ProofResultPage() {
  const params = useParams()
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)

  // In production, fetch proof data based on params.id
  const proof = mockProofData

  const statusConfig = getStatusConfig(proof.status)
  const StatusIcon = statusConfig.icon

  const copyToClipboard = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleVerifyProof = async () => {
    setIsVerifying(true)
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsVerifying(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="lg:pl-64">
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <div className="mb-6">
            <Link 
              href="/generate-proof" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Generate Proof
            </Link>
          </div>

          {/* Page Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                Proof Result
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Water usage verification proof details
              </p>
            </div>
            <Badge 
              variant={statusConfig.variant}
              className="w-fit gap-1.5 px-3 py-1.5 text-sm"
            >
              <StatusIcon className="h-3.5 w-3.5" />
              {statusConfig.label}
            </Badge>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Proof Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Proof Overview Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Proof Overview</CardTitle>
                  <CardDescription>
                    Core details of the water usage verification proof
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <dl className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <dt className="text-sm font-medium text-muted-foreground">Proof ID</dt>
                      <dd className="flex items-center gap-2">
                        <span className="font-mono text-sm text-foreground">{proof.id}</span>
                        <button
                          onClick={() => copyToClipboard(proof.id, "id")}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {copiedField === "id" ? (
                            <Check className="h-3.5 w-3.5 text-primary" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </dd>
                    </div>

                    <div className="space-y-1">
                      <dt className="text-sm font-medium text-muted-foreground">Farm Name</dt>
                      <dd className="flex items-center gap-2 text-foreground">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {proof.farmName}
                      </dd>
                    </div>

                    <div className="space-y-1">
                      <dt className="text-sm font-medium text-muted-foreground">Water Usage</dt>
                      <dd className="flex items-center gap-2 text-foreground">
                        <Droplets className="h-4 w-4 text-primary" />
                        <span className="font-semibold">{formatNumber(proof.waterUsage)}</span>
                        <span className="text-muted-foreground">{proof.unit}</span>
                      </dd>
                    </div>

                    <div className="space-y-1">
                      <dt className="text-sm font-medium text-muted-foreground">Timestamp</dt>
                      <dd className="flex items-center gap-2 text-foreground">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {formatDate(proof.timestamp)}
                      </dd>
                    </div>

                    <div className="space-y-1">
                      <dt className="text-sm font-medium text-muted-foreground">Crop Type</dt>
                      <dd className="text-foreground">{proof.cropType}</dd>
                    </div>

                    <div className="space-y-1">
                      <dt className="text-sm font-medium text-muted-foreground">Region</dt>
                      <dd className="text-foreground">{proof.region}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              {/* Blockchain Details Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Blockchain Details</CardTitle>
                  <CardDescription>
                    Cryptographic proof and IOTA Tangle anchor information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Generated Hash */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Hash className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">Generated Hash</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border bg-muted/50 p-3">
                      <code className="flex-1 break-all font-mono text-xs text-foreground">
                        {proof.generatedHash}
                      </code>
                      <button
                        onClick={() => copyToClipboard(proof.generatedHash, "hash")}
                        className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {copiedField === "hash" ? (
                          <Check className="h-4 w-4 text-primary" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* IOTA Anchor Reference */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Link2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">IOTA Anchor Reference</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border bg-muted/50 p-3">
                      <code className="flex-1 break-all font-mono text-xs text-foreground">
                        {proof.iotaAnchorRef}
                      </code>
                      <button
                        onClick={() => copyToClipboard(proof.iotaAnchorRef, "iota")}
                        className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {copiedField === "iota" ? (
                          <Check className="h-4 w-4 text-primary" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Network Info */}
                  <div className="flex items-center gap-6 text-sm">
                    <div>
                      <span className="text-muted-foreground">Network: </span>
                      <span className="font-medium text-foreground">{proof.networkId}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Block: </span>
                      <span className="font-mono text-foreground">{formatNumber(proof.blockNumber)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Actions */}
            <div className="space-y-6">
              {/* Status Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <StatusIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{statusConfig.label}</p>
                      <p className="text-sm text-muted-foreground">{statusConfig.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Actions</CardTitle>
                  <CardDescription>
                    Manage and verify this proof
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full gap-2" variant="default" asChild>
                    <Link href={`/certificate/${proof.id}`}>
                      <FileCheck className="h-4 w-4" />
                      View Certificate
                    </Link>
                  </Button>
                  <Button 
                    className="w-full gap-2" 
                    variant="outline"
                    onClick={handleVerifyProof}
                    disabled={isVerifying}
                  >
                    {isVerifying ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="h-4 w-4" />
                        Verify Proof
                      </>
                    )}
                  </Button>
                  <Button className="w-full gap-2" variant="ghost" asChild>
                    <a 
                      href={`https://explorer.iota.org/mainnet/message/${proof.iotaAnchorRef}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View on Explorer
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Meter Info Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Meter Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm text-muted-foreground">Meter ID</dt>
                      <dd className="font-mono text-sm text-foreground">{proof.meterId}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Location</dt>
                      <dd className="text-sm text-foreground">{proof.region}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
