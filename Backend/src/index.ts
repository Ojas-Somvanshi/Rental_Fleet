import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.routes";

const app = express();

/* ✅ CORS — PRODUCTION SAFE */
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:8080",
        "https://justmyrides.com",
        "https://www.justmyrides.com",
        "https://justmyrides.vercel.app",
      ];

      // allow server-to-server & Postman
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ✅ VERY IMPORTANT — PRE-FLIGHT HANDLER */
app.options("*", cors());

app.use(express.json());
app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
