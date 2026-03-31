import express from "express";
import cors from "cors";
import proofsRoutes from "./routes/proofs.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api", proofsRoutes);

export default app;