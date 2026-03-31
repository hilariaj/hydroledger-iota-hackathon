import { randomUUID } from "crypto";
import { CreateProofInput, ProofRecord } from "../types/proof";
import { generateProofHash, normalizePayload } from "./hash.service";
import { readProofs, writeProofs } from "./storage.service";

function generateProofId(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = randomUUID().slice(0, 4).toUpperCase();
  return `PROOF-${date}-${suffix}`;
}

function generateCertificateNumber(): string {
  const year = new Date().getFullYear();
  const digits = Math.floor(100000 + Math.random() * 900000);
  return `CERT-${year}-${digits}`;
}

export function createProof(input: CreateProofInput): ProofRecord {
  const normalizedPayload = normalizePayload(input);
  const hash = generateProofHash(normalizedPayload);

  const proof: ProofRecord = {
    proofId: generateProofId(),
    certificateNumber: generateCertificateNumber(),
    farmName: normalizedPayload.farmName,
    meterId: normalizedPayload.meterId,
    timestamp: normalizedPayload.timestamp,
    waterUsage: normalizedPayload.waterUsage,
    cropType: normalizedPayload.cropType,
    region: normalizedPayload.region,
    normalizedPayload,
    hash,
    status: "pending",
    iotaAnchorReference: null,
    createdAt: new Date().toISOString(),
  };

  const proofs = readProofs();
  proofs.unshift(proof);
  writeProofs(proofs);

  return proof;
}

export function getAllProofs(): ProofRecord[] {
  return readProofs();
}

export function getProofById(proofId: string): ProofRecord | undefined {
  return readProofs().find((p) => p.proofId === proofId);
}

export function getProofByHash(hash: string): ProofRecord | undefined {
  return readProofs().find((p) => p.hash === hash);
}

export function verifyProof(query: string) {
  const proof = getProofById(query) || getProofByHash(query);

  if (!proof) {
    return {
      found: false,
      proof: null,
      hashIntegrity: false,
    };
  }

  const recalculatedHash = generateProofHash(proof.normalizedPayload);
  const hashIntegrity = recalculatedHash === proof.hash;

  return {
    found: true,
    proof,
    hashIntegrity,
  };
}

export function markProofAsAnchored(proofId: string): ProofRecord | null {
  const proofs = readProofs();
  const index = proofs.findIndex((p) => p.proofId === proofId);

  if (index === -1) return null;

  proofs[index] = {
    ...proofs[index],
    status: "anchored",
    iotaAnchorReference: `IOTA-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 10)
      .toUpperCase()}`,
  };

  writeProofs(proofs);
  return proofs[index];
}