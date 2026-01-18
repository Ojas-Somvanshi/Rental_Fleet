import { Router } from "express";
import { generateOtp } from "../utils/otp";
import { sendOtpEmail } from "../services/email.service";
import { pool } from "../utils/db";

export const authRouter = Router();

/* send OTP */
authRouter.post("/send-email-otp", async (req, res) => {
  const { email, purpose } = req.body;

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

  // ✅ SIGNUP → no check needed

  const otp = generateOtp();

  await pool.query(
    "DELETE FROM email_otps WHERE email = $1",
    [email]
  );

  await pool.query(
    `
    INSERT INTO email_otps (email, otp, expires_at)
    VALUES ($1, $2, NOW() + INTERVAL '5 minutes')
    `,
    [email, otp]
  );

  await sendOtpEmail(email, otp);

  res.json({ success: true });
});

/* verify OTP + save user */
authRouter.post("/verify-email-otp", async (req, res) => {
  const { email, otp, firstName, lastName, phone } = req.body;

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

  // 2️⃣ DELETE OTP
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

  // 🔥 LOGIN FLOW → CHECK USER EXISTS
  const userResult = await pool.query(
    "SELECT id FROM users WHERE email = $1",
    [email]
  );

  if (userResult.rowCount === 0) {
    return res.status(404).json({
      message: "Account does not exist. Please sign up.",
    });
  }

  // ✅ LOGIN SUCCESS
  return res.json({ success: true });
});
