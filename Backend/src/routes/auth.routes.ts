import { Router } from "express";
import { generateOtp } from "../utils/otp";
import { sendOtpEmail } from "../services/email.service";
import { pool } from "../utils/db";

export const authRouter = Router();

/* ===============================
   📩 SEND EMAIL OTP
   =============================== */
authRouter.post("/send-email-otp", async (req, res) => {
  try {
    const { email, purpose } = req.body;

    if (!email || !purpose) {
      return res.status(400).json({ message: "Invalid request" });
    }

    // 🔥 LOGIN → CHECK USER EXISTS
    if (purpose === "login") {
      const user = await pool.query(
        "SELECT id FROM users WHERE email = $1",
        [email]
      );

      if (user.rowCount === 0) {
        return res.status(404).json({
          message: "Account does not exist. Please sign up.",
        });
      }
    }

    // 🔢 Generate OTP
    const otp = generateOtp();

    // ♻️ Clear old OTPs
    await pool.query(
      "DELETE FROM email_otps WHERE email = $1",
      [email]
    );

    // 💾 Save new OTP
    await pool.query(
      `
      INSERT INTO email_otps (email, otp, expires_at)
      VALUES ($1, $2, NOW() + INTERVAL '5 minutes')
      `,
      [email, otp]
    );

    // ✉️ Send email
    await sendOtpEmail(email, otp);

    return res.json({ success: true });
  } catch (err) {
    console.error("❌ send-email-otp error:", err);

    // IMPORTANT: never throw
    return res.status(500).json({
      message: "Failed to send OTP. Please try again.",
    });
  }
});

/* ===============================
   ✅ VERIFY OTP
   =============================== */
authRouter.post("/verify-email-otp", async (req, res) => {
  try {
    const { email, otp, firstName, lastName, phone } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Invalid request" });
    }

    // 1️⃣ Verify OTP
    const otpResult = await pool.query(
      `
      SELECT 1 FROM email_otps
      WHERE email = $1 AND otp = $2 AND expires_at > NOW()
      `,
      [email, otp]
    );

    if (otpResult.rowCount === 0) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
      });
    }

    // 2️⃣ Delete OTP
    await pool.query(
      "DELETE FROM email_otps WHERE email = $1",
      [email]
    );

    // 🔥 SIGNUP FLOW
    if (firstName && phone) {
      await pool.query(
        `
        INSERT INTO users (first_name, last_name, email, phone)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (email) DO NOTHING
        `,
        [firstName, lastName ?? null, email, phone]
      );

      return res.json({ success: true });
    }

    // 🔥 LOGIN FLOW
    const userResult = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rowCount === 0) {
      return res.status(404).json({
        message: "Account does not exist. Please sign up.",
      });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error("❌ verify-email-otp error:", err);

    return res.status(500).json({
      message: "Verification failed. Please try again.",
    });
  }
});
