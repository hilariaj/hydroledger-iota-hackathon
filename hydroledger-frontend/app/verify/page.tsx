"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Shield, Search, RotateCcw } from "lucide-react";
import { verifyProof } from "@/lib/proofs";
import { VerifyProofResponse } from "@/lib/types/verify";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";

  const [query, setQuery] = useState(initialQuery);
  const [result, setResult] = useState<VerifyProofResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function autoVerify() {
      if (!initialQuery) return;

      setLoading(true);
      setError("");

      try {
        const data = await verifyProof(initialQuery);
        setResult(data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to verify proof";
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    autoVerify();
  }, [initialQuery]);

  async function handleVerify() {
    if (!query.trim()) {
      setError("Please enter a Proof ID or hash");
      setResult(null);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await verifyProof(query.trim());
      setResult(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to verify proof";
      setError(message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setQuery("");
    setResult(null);
    setError("");
  }

  const proof = result?.proof;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="lg:pl-64">
        <div className="px-4 py-6 pt-16 sm:px-6 lg:px-8 lg:pt-6">
          <Header
            title="Verification Portal"
            subtitle="Enter a Proof ID or hash to verify the authenticity of a water usage record on the blockchain."
          />

          <div className="mt-8 max-w-4xl space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Verify a Proof</CardTitle>
                <CardDescription>
                  Paste a Proof ID or a SHA-256 hash string below.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="PROOF-20260331-6843 or hash..."
                  />
                  <Button onClick={handleVerify} disabled={loading}>
                    <Search className="mr-2 h-4 w-4" />
                    {loading ? "Verifying..." : "Verify"}
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {error && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="pt-6">
                  <p className="text-red-700">{error}</p>
                </CardContent>
              </Card>
            )}

            {result && result.found && proof && (
              <>
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="flex items-center justify-between pt-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                        <Shield className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold">
                          Proof Verified Successfully
                        </p>
                        <p className="text-sm text-muted-foreground">
                          This record exists and is authenticated.
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-primary text-primary-foreground">
                      {proof.status}
                    </Badge>
                  </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Verification Result</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <span>Proof Valid</span>
                        <span className="font-medium text-green-700">Yes</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <span>Anchored on IOTA</span>
                        <span className="font-medium text-green-700">
                          {proof.status === "anchored" ? "Yes" : "No"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <span>Hash Integrity</span>
                        <span className="font-medium text-green-700">
                          {result.hashIntegrity ? "Intact" : "Invalid"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Record Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Farm</p>
                        <p className="font-medium">{proof.farmName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Water Usage
                        </p>
                        <p className="font-medium">
                          {proof.waterUsage.toLocaleString()} liters —{" "}
                          {proof.cropType}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Date & Time
                        </p>
                        <p className="font-medium">
                          {new Date(proof.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Region</p>
                        <p className="font-medium">{proof.region}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Blockchain References</CardTitle>
                    <CardDescription>
                      Cryptographic identifiers stored in the system
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="mb-2 text-xs text-muted-foreground">
                        Generated Hash
                      </p>
                      <div className="rounded-lg bg-muted p-3">
                        <code className="break-all text-xs">{proof.hash}</code>
                      </div>
                    </div>

                    <div>
                      <p className="mb-2 text-xs text-muted-foreground">
                        IOTA Anchor Reference
                      </p>
                      <div className="rounded-lg bg-muted p-3">
                        <code className="break-all text-xs">
                          {proof.iotaAnchorReference || "Not anchored yet"}
                        </code>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button asChild>
                        <Link href={`/certificate/${proof.proofId}`}>
                          View Certificate
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {result && !result.found && (
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="pt-6">
                  <p className="font-semibold">Proof not found</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    No record matched the provided Proof ID or hash.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}