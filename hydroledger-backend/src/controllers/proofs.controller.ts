import { Request, Response } from "express";
import {
  createProof,
  getAllProofs,
  getProofById,
  markProofAsAnchored,
  verifyProof,
} from "../services/proof.service";
import { CreateProofInput } from "../types/proof";

export function createProofHandler(req: Request, res: Response) {
  try {
    const body = req.body as Partial<CreateProofInput>;

    if (
      !body.farmName ||
      !body.meterId ||
      !body.timestamp ||
      body.waterUsage === undefined ||
      !body.cropType ||
      !body.region
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const proof = createProof({
      farmName: body.farmName,
      meterId: body.meterId,
      timestamp: body.timestamp,
      waterUsage: Number(body.waterUsage),
      cropType: body.cropType,
      region: body.region,
    });

    return res.status(201).json(proof);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create proof" });
  }
}

export function listProofsHandler(_req: Request, res: Response) {
  try {
    return res.json(getAllProofs());
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to list proofs" });
  }
}

export function getProofByIdHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const proof = getProofById(id);

    if (!proof) {
      return res.status(404).json({ error: "Proof not found" });
    }

    return res.json(proof);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch proof" });
  }
}

export function verifyProofHandler(req: Request, res: Response) {
  try {
    const { query } = req.body as { query?: string };

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const result = verifyProof(query);
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to verify proof" });
  }
}

export function anchorProofHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updated = markProofAsAnchored(id);

    if (!updated) {
      return res.status(404).json({ error: "Proof not found" });
    }

    return res.json(updated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to anchor proof" });
  }
}