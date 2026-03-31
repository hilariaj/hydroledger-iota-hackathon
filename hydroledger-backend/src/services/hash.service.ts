import crypto from "crypto";
import { CreateProofInput } from "../types/proof";

export function normalizePayload(input: CreateProofInput): CreateProofInput {
  return {
    farmName: input.farmName.trim(),
    meterId: input.meterId.trim(),
    timestamp: new Date(input.timestamp).toISOString(),
    waterUsage: Number(input.waterUsage),
    cropType: input.cropType.trim(),
    region: input.region.trim(),
  };
}

export function generateProofHash(payload: CreateProofInput): string {
  const normalized = normalizePayload(payload);
  const json = JSON.stringify(normalized);
  return crypto.createHash("sha256").update(json).digest("hex");
}