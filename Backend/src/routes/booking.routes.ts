import { Router } from "express";
import { sendBookingEmail } from "../services/email.service";

export const bookingRouter = Router();

/* ===============================
   🚀 CONFIRM BOOKING
   =============================== */
bookingRouter.post("/book", async (req, res) => {
  try {
  const {
  email,
  name,
  phone,
  vehicle,
  pickup,
  drop,
  location,
  duration,
  startDate,
  endDate,
  vehicleCost,
  helmetCost,
  insuranceCost,
  total,
} = req.body;

    if (!email || !name || !vehicle) {
      return res.status(400).json({
        message: "Invalid booking data",
      });
    }

    // ✅ (OPTIONAL BUT IMPORTANT)
    // Save booking in DB here later

    // ✉️ Send email
await sendBookingEmail({
  email,
  name,
  phone,
  vehicle,
  pickup,
  drop,
  location,
  duration,
  startDate,
  endDate,
  vehicleCost,
  helmetCost,
  insuranceCost,
  total,
});

    return res.json({
      success: true,
      message: "Booking confirmed & email sent",
    });

  } catch (err) {
    console.error("❌ booking error:", err);

    return res.status(500).json({
      message: "Booking failed",
    });
  }
});