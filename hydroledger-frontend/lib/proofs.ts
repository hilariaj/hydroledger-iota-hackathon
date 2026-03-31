import { API_BASE_URL } from "./api";
import { VerifyProofResponse } from "./types/verify";

export type CreateProofPayload = {
  farmName: string;
  meterId: string;
  timestamp: string;
  waterUsage: number;
  cropType: string;
  region: string;
};

export type ProofResponse = {
  proofId: string;
  certificateNumber: string;
  farmName: string;
  meterId: string;
  timestamp: string;
  waterUsage: number;
  cropType: string;
  region: string;
  normalizedPayload: {
    farmName: string;
    meterId: string;
    timestamp: string;
    waterUsage: number;
    cropType: string;
    region: string;
  };
  hash: string;
  status: "pending" | "anchored" | "verified";
  iotaAnchorReference: string | null;
  createdAt: string;
};

export async function createProof(
  payload: CreateProofPayload
): Promise<ProofResponse> {
  const response = await fetch(`${API_BASE_URL}/proofs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to create proof");
  }

  return response.json();
}

export async function getProofById(proofId: string): Promise<ProofResponse> {
  const response = await fetch(`${API_BASE_URL}/proofs/${proofId}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || "Failed to fetch proof");
  }

  return response.json();
}

export async function anchorProof(proofId: string): Promise<ProofResponse> {
  const response = await fetch(`${API_BASE_URL}/proofs/${proofId}/anchor`, {
    method: "POST",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to anchor proof");
  }

  return response.json();
}

export async function verifyProof(query: string): Promise<VerifyProofResponse> {
  const response = await fetch(`${API_BASE_URL}/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || "Failed to verify proof");
  }

  return response.json();
}