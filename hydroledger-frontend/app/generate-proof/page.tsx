"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FileCheck, Copy, Check, Loader2 } from "lucide-react"
import { createProof, anchorProof, ProofResponse } from "@/lib/proofs"

const cropTypes = [
  "Wheat",
  "Rice",
  "Corn",
  "Soybeans",
  "Cotton",
  "Sugarcane",
  "Vegetables",
  "Fruits",
  "Other",
]

const regions = [
  "North Valley",
  "South Basin",
  "East Plains",
  "West Highlands",
  "Central District",
]

interface FormData {
  farmName: string
  meterId: string
  dateTime: string
  waterUsage: string
  cropType: string
  region: string
}

type ProofStatus = "idle" | "pending" | "anchored"

export default function GenerateProofPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    farmName: "",
    meterId: "",
    dateTime: "",
    waterUsage: "",
    cropType: "",
    region: "",
  })
  const [status, setStatus] = useState<ProofStatus>("idle")
  const [generatedHash, setGeneratedHash] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const [proofId, setProofId] = useState<string>("")
  const [createdProof, setCreatedProof] = useState<ProofResponse | null>(null)
  const [error, setError] = useState<string>("")

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("pending")
    setGeneratedHash("")
    setError("")

    try {
      const proof = await createProof({
        farmName: formData.farmName,
        meterId: formData.meterId,
        timestamp: formData.dateTime,
        waterUsage: Number(formData.waterUsage),
        cropType: formData.cropType,
        region: formData.region,
      })

      const anchoredProof = await anchorProof(proof.proofId)

      setCreatedProof(anchoredProof)
      setGeneratedHash(anchoredProof.hash)
      setProofId(anchoredProof.proofId)
      setStatus(
        anchoredProof.status === "anchored" ? "anchored" : "pending"
      )
    } catch (err) {
      console.error(err)
      setStatus("idle")
      setGeneratedHash("")

      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Failed to generate proof")
      }
    }
  }

  const handleViewProof = () => {
    if (!proofId) return
    router.push(`/proof-result?proofId=${proofId}`)
  }

  const handleCopyHash = async () => {
    await navigator.clipboard.writeText(generatedHash)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const jsonPreview = {
    farmName: formData.farmName || "—",
    meterId: formData.meterId || "—",
    timestamp: formData.dateTime || "—",
    waterUsage: formData.waterUsage ? `${formData.waterUsage} L` : "—",
    cropType: formData.cropType || "—",
    region: formData.region || "—",
  }

  const isFormValid =
    formData.farmName &&
    formData.meterId &&
    formData.dateTime &&
    formData.waterUsage &&
    formData.cropType &&
    formData.region

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="lg:pl-64">
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <Header title="Generate Water Usage Proof" />

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* Form Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-primary" />
                  Water Usage Data
                </CardTitle>
                <CardDescription>
                  Enter the water usage details to generate a blockchain-verified proof
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="farmName">Farm Name</FieldLabel>
                      <Input
                        id="farmName"
                        placeholder="Enter farm name"
                        value={formData.farmName}
                        onChange={(e) => handleInputChange("farmName", e.target.value)}
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="meterId">Meter ID</FieldLabel>
                      <Input
                        id="meterId"
                        placeholder="e.g., MTR-2024-001"
                        value={formData.meterId}
                        onChange={(e) => handleInputChange("meterId", e.target.value)}
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="dateTime">Date and Time</FieldLabel>
                      <Input
                        id="dateTime"
                        type="datetime-local"
                        value={formData.dateTime}
                        onChange={(e) => handleInputChange("dateTime", e.target.value)}
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="waterUsage">Water Usage (liters)</FieldLabel>
                      <Input
                        id="waterUsage"
                        type="number"
                        placeholder="e.g., 15000"
                        min="0"
                        value={formData.waterUsage}
                        onChange={(e) => handleInputChange("waterUsage", e.target.value)}
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="cropType">Crop Type</FieldLabel>
                      <Select
                        value={formData.cropType}
                        onValueChange={(value) => handleInputChange("cropType", value)}
                      >
                        <SelectTrigger id="cropType" className="w-full">
                          <SelectValue placeholder="Select crop type" />
                        </SelectTrigger>
                        <SelectContent>
                          {cropTypes.map((crop) => (
                            <SelectItem key={crop} value={crop}>
                              {crop}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="region">Region</FieldLabel>
                      <Select
                        value={formData.region}
                        onValueChange={(value) => handleInputChange("region", value)}
                      >
                        <SelectTrigger id="region" className="w-full">
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          {regions.map((region) => (
                            <SelectItem key={region} value={region}>
                              {region}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    
                    {error && (
                      <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full mt-2"
                      disabled={!isFormValid || status === "pending"}
                    >
                      {status === "pending" ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating Proof...
                        </>
                      ) : (
                        "Generate Proof"
                      )}
                    </Button>
                  </FieldGroup>
                </form>
              </CardContent>
            </Card>

            {/* Preview and Hash Card */}
            <div className="flex flex-col gap-6">
              {/* JSON Preview */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Data Preview</CardTitle>
                    {status !== "idle" && (
                      <Badge
                        variant={status === "anchored" ? "default" : "secondary"}
                        className={
                          status === "anchored"
                            ? "bg-primary text-primary-foreground"
                            : "bg-amber-100 text-amber-800"
                        }
                      >
                        {status === "pending" ? "Pending" : "Anchored"}
                      </Badge>
                    )}
                  </div>
                  <CardDescription>
                    JSON representation of your water usage data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="rounded-lg bg-muted p-4 text-sm overflow-x-auto">
                    <code className="text-foreground">
                      {JSON.stringify(jsonPreview, null, 2)}
                    </code>
                  </pre>
                </CardContent>
              </Card>

              {/* Generated Hash */}
              <Card>
                <CardHeader>
                  <CardTitle>Generated Hash</CardTitle>
                  <CardDescription>
                    Unique blockchain identifier for this water usage record
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {generatedHash ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <code className="flex-1 rounded-lg bg-muted px-4 py-3 text-sm font-mono break-all text-foreground">
                          {generatedHash}
                        </code>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleCopyHash}
                          className="shrink-0"
                        >
                          {copied ? (
                            <Check className="h-4 w-4 text-primary" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        This hash has been anchored to the blockchain and can be used to
                        verify the authenticity of your water usage data.
                      </p>
                      <Button onClick={handleViewProof} className="w-full mt-2">
                        View Proof Result
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center rounded-lg border border-dashed border-border py-8 text-muted-foreground">
                      <p className="text-sm">
                        {status === "pending"
                          ? "Generating hash..."
                          : "Submit the form to generate a proof hash"}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
