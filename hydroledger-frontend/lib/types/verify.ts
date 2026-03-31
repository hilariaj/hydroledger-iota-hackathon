import { ProofResponse } from "./proof";

export type VerifyProofResponse = {
  found: boolean;
  proof: ProofResponse | null;
  hashIntegrity: boolean;
};