import { Router } from "express";
import {
  anchorProofHandler,
  createProofHandler,
  getProofByIdHandler,
  listProofsHandler,
  verifyProofHandler,
} from "../controllers/proofs.controller";

const router = Router();

router.post("/proofs", createProofHandler);
router.get("/proofs", listProofsHandler);
router.get("/proofs/:id", getProofByIdHandler);
router.post("/proofs/:id/anchor", anchorProofHandler);
router.post("/verify", verifyProofHandler);

export default router;