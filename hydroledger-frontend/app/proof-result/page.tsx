"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, FileCheck, Shield, Copy, ExternalLink } from "lucide-react";
import { getProofById, anchorProof } from "@/lib/proofs";
import { ProofResponse } from "@/lib/types/proof";

export default function ProofResultPage() {
  const searchParams = useSearchParams();
  const proofId = searchParams.get("proofId");

  const [proof, setProof] = useState<ProofResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [anchoring, setAnchoring] = useState(false);

  useEffect(() => {
    async function loadProof() {
      if (!proofId) {
        setError("Missing proofId in URL");
        setLoading(false);
        return;
      }

      try {
        const data = await getProofById(proofId);
        setProof(data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load proof";
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    loadProof();
  }, [proofId]);

  async function handleAnchorProof() {
    if (!proof) return;

    setAnchoring(true);
    setError("");

    try {
      const updatedProof = await anchorProof(proof.proofId);
      setProof(updatedProof);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to anchor proof";
      setError(message);
    } finally {
      setAnchoring(false);
    }
  }

  async function copyToClipboard(value: string) {
    try {
      await navigator.clipboard.writeText(value);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <main className="lg:pl-64">
          <div className="px-4 py-6 sm:px-6 lg:px-8 pt-16 lg:pt-6">
            <Header title="Proof Result" subtitle="Loading proof data..." />
          </div>
        </main>
      </div>
    );
  }

  if (error || !proof) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <main className="lg:pl-64">
          <div className="px-4 py-6 sm:px-6 lg:px-8 pt-16 lg:pt-6">
            <Header title="Proof Result" subtitle="Unable to load proof" />
            <Card className="mt-6 border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <p className="text-red-700">{error || "Proof not found"}</p>
                <div className="mt-4">
                  <Button asChild variant="outline">
                    <Link href="/generate-proof">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Generate Proof
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="lg:pl-64">
        <div className="px-4 py-6 sm:px-6 lg:px-8 pt-16 lg:pt-6">
          <div className="flex items-center justify-between mb-8">
            <Header title="Proof Result" subtitle="Blockchain-verified water usage record" />
          </div>

          {error && (
            <div className="mb-4 rounded-md border border-red-300 bg-red-50 p-3 text-red-700">
              {error}
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card className={proof.status === "anchored" ? "border-green-200 bg-green-50" : "border-yellow-200 bg-yellow-50"}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                        <FileCheck className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {proof.status === "anchored" ? "Proof Successfully Anchored" : "Proof Created Successfully"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {proof.status === "anchored"
                            ? "Your water usage data has been anchored to IOTA"
                            : "Your proof was created and is waiting for anchoring"}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-primary text-primary-foreground">{proof.status}</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Proof Information
                  </CardTitle>
                  <CardDescription>Core blockchain verification details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Proof ID</p>
                      <p className="text-lg font-semibold text-foreground">{proof.proofId}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Certificate Number</p>
                      <p className="text-lg font-semibold text-foreground">{proof.certificateNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Status</p>
                      <Badge className="mt-1 bg-primary text-primary-foreground">{proof.status}</Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Timestamp</p>
                      <p className="text-sm font-mono text-foreground">
                        {new Date(proof.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Record Summary</CardTitle>
                  <CardDescription>Water usage and agricultural details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Farm Name</p>
                      <p className="text-lg font-semibold text-foreground">{proof.farmName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Region</p>
                      <p className="text-lg font-semibold text-foreground">{proof.region}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Water Usage</p>
                      <p className="text-2xl font-bold text-primary">{proof.waterUsage.toLocaleString()} L</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Crop Type</p>
                      <p className="text-lg font-semibold text-foreground">{proof.cropType}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-sm font-medium text-muted-foreground">Meter ID</p>
                      <p className="text-sm font-mono text-foreground">{proof.meterId}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Blockchain References</CardTitle>
                  <CardDescription>Hash and IOTA anchor information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Generated Hash (SHA-256)</p>
                    <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
                      <code className="flex-1 text-xs font-mono break-all text-foreground">
                        {proof.hash}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0"
                        onClick={() => copyToClipboard(proof.hash)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">IOTA Anchor Reference</p>
                    <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
                      <code className="flex-1 text-xs font-mono break-all text-foreground">
                        {proof.iotaAnchorReference || "Not anchored yet"}
                      </code>
                      {proof.iotaAnchorReference && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="shrink-0"
                          onClick={() => copyToClipboard(proof.iotaAnchorReference!)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 pt-4 border-t border-border sm:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Created At</p>
                      <p className="text-sm font-mono text-foreground">
                        {new Date(proof.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Network Details</p>
                      <p className="text-sm text-muted-foreground">Not available in current MVP</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle className="text-lg">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {proof.status !== "anchored" && (
                    <Button onClick={handleAnchorProof} className="w-full" disabled={anchoring}>
                      <FileCheck className="mr-2 h-4 w-4" />
                      {anchoring ? "Anchoring..." : "Anchor Proof"}
                    </Button>
                  )}

                  <Button asChild className="w-full">
                    <Link href={`/certificate/${proof.proofId}`}>
                      <FileCheck className="mr-2 h-4 w-4" />
                      View Certificate
                    </Link>
                  </Button>

                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/verify?query=${proof.proofId}`}>
                      <Shield className="mr-2 h-4 w-4" />
                      Verify Proof
                    </Link>
                  </Button>

                  {proof.iotaAnchorReference && (
                    <Button asChild variant="outline" className="w-full">
                      <a href="https://explorer.iota.org" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View on Explorer
                      </a>
                    </Button>
                  )}

                  <Button asChild variant="ghost" className="w-full">
                    <Link href="/generate-proof">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Generate Proof
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Meter Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Meter ID</p>
                    <p className="text-sm font-semibold">{proof.meterId}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Status</p>
                    <Badge className="mt-1" variant="outline">
                      {proof.status === "anchored" ? "Anchored" : "Pending"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}