"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Printer,
  Download,
  CheckCircle2,
  Droplets,
  Shield,
} from "lucide-react";
import { getProofById } from "@/lib/proofs";
import { ProofResponse } from "@/lib/types/proof";

function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function CertificatePage() {
  const routeParams = useParams();
  const id = routeParams?.id as string;

  const [certificate, setCertificate] = useState<ProofResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCertificate() {
      if (!id) {
        setError("Missing certificate id in URL");
        setLoading(false);
        return;
      }

      try {
        const data = await getProofById(id);
        setCertificate(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load certificate"
        );
      } finally {
        setLoading(false);
      }
    }

    loadCertificate();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 px-4 py-8">
        <div className="mx-auto max-w-3xl rounded-lg border bg-card p-6">
          <p>Loading certificate...</p>
        </div>
      </div>
    );
  }

  if (error || !certificate) {
    return (
      <div className="min-h-screen bg-muted/30 px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-lg border border-red-200 bg-red-50 p-6">
            <h1 className="text-2xl font-bold text-foreground">Certificate</h1>
            <p className="mt-3 text-red-700">
              {error || "Certificate not found"}
            </p>

            <div className="mt-6">
              <Button asChild variant="outline">
                <Link href="/generate-proof">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Generate Proof
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="print:hidden border-b bg-card px-4 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link
            href={`/proof-result?proofId=${certificate.proofId}`}
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Proof
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
            >
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </header>

      <main className="px-4 py-8 print:p-0 print:py-0">
        <div className="mx-auto max-w-3xl">
          <div className="overflow-hidden rounded-lg border-2 border-primary/20 bg-card shadow-lg print:rounded-none print:border print:shadow-none">
            <div className="border-b border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 px-8 py-10 text-center print:bg-transparent">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10">
                  <Droplets className="h-8 w-8 text-primary" />
                </div>
              </div>

              <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
                Water Usage Proof Certificate
              </h1>

              <p className="text-muted-foreground">
                Blockchain-Verified Agricultural Water Usage Record
              </p>

              <div className="mt-4 flex justify-center">
                <Badge className="bg-primary px-4 py-1 text-sm text-primary-foreground">
                  <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                  {certificate.status === "verified"
                    ? "Verified"
                    : certificate.status === "anchored"
                    ? "Anchored"
                    : "Pending"}
                </Badge>
              </div>
            </div>

            <div className="px-8 py-8">
              <div className="mb-8 border-b border-dashed pb-6 text-center">
                <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                  Certificate Number
                </p>
                <p className="font-mono text-lg font-semibold text-foreground">
                  {certificate.certificateNumber}
                </p>
              </div>

              <div className="mb-8 grid grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                    Farm Name
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {certificate.farmName}
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                    Region
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {certificate.region}
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                    Usage Date
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {formatDate(certificate.timestamp)}
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                    Crop Type
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {certificate.cropType}
                  </p>
                </div>
              </div>

              <div className="mb-8 rounded-lg border border-primary/20 bg-primary/5 p-6 text-center">
                <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                  Verified Water Usage
                </p>
                <p className="text-4xl font-bold text-primary">
                  {formatNumber(certificate.waterUsage)}
                  <span className="ml-2 text-lg font-normal text-muted-foreground">
                    liters
                  </span>
                </p>
              </div>

              <div className="space-y-4 border-t pt-6">
                <div className="mb-4 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <p className="text-sm font-medium text-foreground">
                    Blockchain Verification Details
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                    Proof Hash
                  </p>
                  <p className="break-all rounded border bg-muted/50 px-3 py-2 font-mono text-sm text-foreground">
                    {certificate.hash}
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                    IOTA Anchor Reference
                  </p>
                  <p className="break-all rounded border bg-muted/50 px-3 py-2 font-mono text-sm text-foreground">
                    {certificate.iotaAnchorReference || "Not anchored yet"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                      Proof ID
                    </p>
                    <p className="font-mono text-sm text-foreground">
                      {certificate.proofId}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                      Issue Date
                    </p>
                    <p className="text-sm text-foreground">
                      {formatDate(certificate.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t bg-muted/30 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-foreground">
                      HydroLedger
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Blockchain Water Verification Platform
                  </p>
                </div>

                <div className="text-right">
                  <p className="mb-1 text-xs text-muted-foreground">
                    Verification Status
                  </p>
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-sm font-medium text-foreground">
                      {certificate.status === "verified"
                        ? "Fully Verified"
                        : certificate.status === "anchored"
                        ? "Anchored on IOTA"
                        : "Pending Verification"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="print:hidden mx-auto mt-6 max-w-md text-center text-xs text-muted-foreground">
            This certificate can be independently verified using the proof hash in the HydroLedger verification flow.
          </p>
        </div>
      </main>
    </div>
  );
}