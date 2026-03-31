import fs from "fs";
import path from "path";
import { ProofRecord } from "../types/proof";

const dataFile = path.join(__dirname, "..", "data", "proofs.json");

export function readProofs(): ProofRecord[] {
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify([], null, 2), "utf-8");
  }

  const raw = fs.readFileSync(dataFile, "utf-8");
  return JSON.parse(raw) as ProofRecord[];
}

export function writeProofs(proofs: ProofRecord[]): void {
  fs.writeFileSync(dataFile, JSON.stringify(proofs, null, 2), "utf-8");
}