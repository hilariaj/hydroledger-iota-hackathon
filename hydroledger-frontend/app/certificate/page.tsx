"use client"

import { useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Printer, Download } from "lucide-react"

const mockCertificate = {
  certificateNumber: "CERT-2026-001892",
  proofId: "PROOF-2026-0319-A7F2",
  farmName: "Green Valley Farm",
  region: "Northern Plains",
  usageDate: "2026-03-19",
  cropType: "Wheat",
  waterUsage: 12500,
  generatedHash: "0x7f3a9c2d8e1b4f6a9c2d8e1b4f6a9c2d8e1b4f6a9c2d8e1b4f6a9c2d8e1b4f",
  iotaReference: "IOTA:984730987:ABC123DEF456GHI789JKL012MNO345PQR678",
  issueDate: "2026-03-19",
  status: "Verified",
}

export default function CertificatePage() {
  const certificateRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPDF = () => {
    // Placeholder for PDF download logic
    console.log("Downloading PDF...")
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      {/* Header Actions - Hidden on Print */}
      <div className="mb-6 flex items-center justify-between print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Water Usage Proof Certificate</h1>
          <p className="text-sm text-muted-foreground">Certificate #{mockCertificate.certificateNumber}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handlePrint} variant="outline" className="gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button onClick={handleDownloadPDF} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button asChild variant="ghost">
            <Link href="/proof-result" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Certificate */}
      <div ref={certificateRef} className="mx-auto max-w-2xl rounded-lg border-2 border-primary bg-white p-12 shadow-lg print:border-0 print:p-0 print:shadow-none">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary mx-auto mb-4">
            <span className="text-xl font-bold text-primary-foreground">H</span>
          </div>
          <h2 className="text-sm font-semibold tracking-widest text-primary uppercase">HydroLedger</h2>
          <h1 className="mt-4 text-3xl font-bold text-foreground">Water Usage Proof Certificate</h1>
          <p className="mt-2 text-sm text-muted-foreground">Blockchain-Verified Agricultural Water Usage Record</p>
        </div>

        {/* Badge */}
        <div className="text-center mb-8">
          <Badge className="bg-primary text-primary-foreground text-sm py-1 px-3">
            ✓ Verified
          </Badge>
        </div>

        {/* Certificate Number */}
        <div className="border-t border-b border-border py-4 mb-8">
          <p className="text-center text-sm font-medium text-muted-foreground">Certificate Number</p>
          <p className="text-center text-2xl font-bold text-foreground font-mono">{mockCertificate.certificateNumber}</p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Farm Name</p>
            <p className="mt-2 text-lg font-semibold text-foreground">{mockCertificate.farmName}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Region</p>
            <p className="mt-2 text-lg font-semibold text-foreground">{mockCertificate.region}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Usage Date</p>
            <p className="mt-2 text-lg font-semibold text-foreground">{mockCertificate.usageDate}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Crop Type</p>
            <p className="mt-2 text-lg font-semibold text-foreground">{mockCertificate.cropType}</p>
          </div>
        </div>

        {/* Water Usage Highlight */}
        <div className="rounded-lg bg-primary/5 p-6 mb-8 border border-primary/20">
          <p className="text-center text-sm font-medium text-muted-foreground">Verified Water Usage</p>
          <p className="mt-2 text-center text-5xl font-bold text-primary">
            {mockCertificate.waterUsage.toLocaleString()}
          </p>
          <p className="text-center text-sm text-muted-foreground mt-1">Liters</p>
        </div>

        {/* Blockchain Details */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground mb-4">Blockchain Verification Details</h3>
          <div className="space-y-3 bg-muted/30 p-4 rounded-lg">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Proof Hash</p>
              <p className="text-xs font-mono text-foreground break-all mt-1">{mockCertificate.generatedHash}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">IOTA Anchor Reference</p>
              <p className="text-xs font-mono text-foreground break-all mt-1">{mockCertificate.iotaReference}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Proof ID</p>
              <p className="text-xs font-mono text-foreground break-all mt-1">{mockCertificate.proofId}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border pt-8">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-xs text-muted-foreground">Issue Date</p>
              <p className="text-sm font-semibold text-foreground">{mockCertificate.issueDate}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Status</p>
              <p className="text-sm font-semibold text-primary">{mockCertificate.status}</p>
            </div>
          </div>
          <div className="text-center pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              This certificate verifies that the water usage data has been anchored to the IOTA blockchain.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              HydroLedger — Blockchain-Verified Water Management | ESG Compliant
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
