import dotenv from "dotenv";
dotenv.config();
import { bookingRouter } from "./routes/booking.routes";
import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.routes";

const app = express();

/* ===============================
   🔥 DEBUG (CONFIRM DEPLOY)
   =============================== */
console.log("🔥 CORS VERSION: FINAL-STABLE");

/* ===============================
   ✅ CORS (SIMPLE & RELIABLE)
   =============================== */

/**
 * IMPORTANT:
 * ❌ No dynamic origin function
 * ❌ No callback(null, false)
 * ✅ Static allow-list ensures headers are ALWAYS attached
 */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:8080",
      "https://justmyrides.com",
      "https://www.justmyrides.com",
      "https://justmyrides.vercel.app",
    ],
    credentials: true,
  })
);

/* ✅ PRE-FLIGHT (REQUIRED FOR POST JSON) */
app.options("*", cors());

/* ===============================
   ✅ MIDDLEWARES
   =============================== */

app.use(express.json());
app.use("/api", bookingRouter);
/* ===============================
   ✅ ROUTES
   =============================== */

app.use("/api/auth", authRouter);

/* ===============================
   ✅ GLOBAL ERROR HANDLER
   =============================== */

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error("❌ Unhandled error:", err);

  res.status(500).json({
    message: "Internal server error",
  });
};

app.use(errorHandler);

/* ===============================
   ✅ SERVER START
   =============================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
