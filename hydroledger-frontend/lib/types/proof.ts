export type ProofStatus = "pending" | "anchored" | "verified";

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
  status: ProofStatus;
  iotaAnchorReference: string | null;
  createdAt: string;
};