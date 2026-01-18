import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});

