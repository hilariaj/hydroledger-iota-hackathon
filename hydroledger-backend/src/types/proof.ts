export type ProofStatus = "pending" | "anchored" | "verified";

export interface CreateProofInput {
  farmName: string;
  meterId: string;
  timestamp: string;
  waterUsage: number;
  cropType: string;
  region: string;
}

export interface ProofRecord extends CreateProofInput {
  proofId: string;
  certificateNumber: string;
  normalizedPayload: CreateProofInput;
  hash: string;
  status: ProofStatus;
  iotaAnchorReference: string | null;
  createdAt: string;
}