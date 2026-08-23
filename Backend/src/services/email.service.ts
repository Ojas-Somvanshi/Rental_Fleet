import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOtpEmail = async (email: string, otp: string) => {
  const response = await resend.emails.send({
    from: "Just My Rides <no-reply@justmyrides.com>",
    to: email,
    subject: "Just My Rides | Registration Verification",
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f4f6f8; padding: 30px;">
        <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          
          <h2 style="color: #222; text-align: center; margin-bottom: 20px;">
            Welcome to Just My Rides!
          </h2>

          <p style="color: #555; font-size: 15px;">
            Hello,
          </p>

          <p style="color: #555; font-size: 15px;">
            Use the following One-Time Password (OTP) to verify your account. 
            This OTP is valid for <b>5 minutes</b>.
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <span style="
              display: inline-block;
              padding: 14px 28px;
              font-size: 22px;
              font-weight: bold;
              letter-spacing: 4px;
              color: #ffffff;
              background-color: #0d6efd;
              border-radius: 6px;
            ">
              ${otp}
            </span>
          </div>

          <p style="color: #777; font-size: 14px;">
            If you did not request this OTP, please ignore this email. Your account remains secure.
          </p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;" />

          <p style="color: #999; font-size: 12px; text-align: center;">
            © ${new Date().getFullYear()} Just My Rides. All rights reserved.
          </p>
        </div>
      </div>
    `,
  });
   console.log("📨 Resend response:", response);
};


const formatPrice = (num: number) => Math.round(num);


export const sendBookingEmail = async ({
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
}: {
  email: string;
  name: string;
  phone: string;
  vehicle: string;
  pickup: string;
  drop: string;
  location: string;
  duration: string;
  startDate: string;
  endDate: string;
  vehicleCost: number;
  helmetCost: number;
  insuranceCost: number;
  total: number;
}) => {
  try {
    /* ===============================
       👤 USER EMAIL (DARK PREMIUM UI)
    =============================== */
    const userHtml = `
    <div style="background:#020617;padding:20px;font-family:Arial;color:#ffffff">

      <!-- HEADER -->
      <div style="background:linear-gradient(to right,#f59e0b,#fb923c,#ec4899);
                  padding:25px;border-radius:16px;text-align:center;">
        <div style="font-size:26px;">✅</div>
        <h2 style="margin:8px 0 0;">Booking Confirmed!</h2>
        <p style="margin:4px 0 0;font-size:13px;">Your ride is all set 🚀</p>
      </div>

      <!-- RIDER -->
      <div style="margin-top:20px;background:#0B1220;
                  padding:15px;border-radius:12px;
                  border:1px solid rgba(59,130,246,0.25);">
        <p style="color:#f59e0b;font-size:11px;">RIDER</p>
        <p><b>${name}</b></p>
        <p style="color:#9ca3af;">${phone}</p>
        <p style="color:#9ca3af;">${email}</p>
      </div>

      <!-- DETAILS -->
      <div style="margin-top:20px;font-size:13px;">
        <p><b>Vehicle:</b> ${vehicle}</p>

        <table width="100%">
          <tr>
            <td><b>Duration</b></td>
            <td align="right">${duration}</td>
          </tr>
          <tr>
            <td><b>Location</b></td>
            <td align="right">${location}</td>
          </tr>
        </table>

        <table width="100%" style="margin-top:10px;">
          <tr>
          <td><b>Booking From</b></td>
          <td align="right">${startDate}</td>
          </tr>
          <tr>
          <tr>
          <td><b>Booking To</b></td>
          <td align="right">${endDate}</td>
          </tr>
            <td><b>Pickup</b></td>
            <td align="right">${pickup}</td>
          </tr>
          <tr>
            <td><b>Drop</b></td>
            <td align="right">${drop}</td>
          </tr>
        </table>
      </div>

      <!-- PRICE -->
      <div style="margin-top:20px;border-top:1px solid #1e293b;padding-top:10px;">
        <table width="100%">
          <tr>
            <td>${vehicle}</td>
            <td align="right">₹${formatPrice(vehicleCost)}</td>
          </tr>

          ${helmetCost > 0 ? `
          <tr>
            <td>Helmet</td>
            <td align="right">₹${helmetCost}</td>
          </tr>` : ""}

          ${insuranceCost > 0 ? `
          <tr>
            <td>Insurance</td>
            <td align="right">₹${insuranceCost}</td>
          </tr>` : ""}
        </table>

        <div style="margin-top:10px;border-top:1px solid #1e293b;padding-top:10px;">
          <table width="100%">
            <tr>
              <td><b>Grand Total</b></td>
              <td align="right" style="color:#f59e0b;"><b>₹${formatPrice(total)}</b></td>
            </tr>
          </table>
        </div>
      </div>

      <p style="margin-top:20px;text-align:center;color:#6b7280;font-size:11px;">
        © ${new Date().getFullYear()} Just My Rides
      </p>

    </div>
    `;

    const userRes = await resend.emails.send({
      from: "Just My Rides <no-reply@justmyrides.com>",
      to: email,
      subject: "🚀 Booking Confirmed | Just My Rides",
      html: userHtml,
    });

    console.log("✅ USER EMAIL:", userRes);

    /* 🔥 Delay */
    await new Promise((res) => setTimeout(res, 700));

    /* ===============================
       🧑‍💼 ADMIN EMAIL (CLEAN UI)
    =============================== */
    const adminHtml = `
    <div style="font-family:Arial;background:#f4f6f8;padding:20px">

      <div style="max-width:550px;margin:auto;background:#ffffff;
                  padding:25px;border-radius:12px;
                  box-shadow:0 8px 20px rgba(0,0,0,0.06);">

        <h2>🚨 New Booking Received</h2>

        <hr/>

        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Email:</b> ${email}</p>

        <hr/>

        <p><b>Vehicle:</b> ${vehicle}</p>
        <p><b>Location:</b> ${location}</p>
        <p><b>Duration:</b> ${duration}</p>
        <p><b>Booking From:</b> ${startDate}</p>
        <p><b>Booking To:</b> ${endDate}</p>
        <p><b>Pickup:</b> ${pickup}</p>
        <p><b>Drop:</b> ${drop}</p>

        <hr/>

        <table width="100%">
          <tr>
            <td>${vehicle}</td>
            <td align="right">₹${formatPrice(vehicleCost)}</td>
          </tr>

          ${helmetCost > 0 ? `
          <tr>
            <td>Helmet</td>
            <td align="right">₹${helmetCost}</td>
          </tr>` : ""}

          ${insuranceCost > 0 ? `
          <tr>
            <td>Insurance</td>
            <td align="right">₹${insuranceCost}</td>
          </tr>` : ""}
        </table>

        <div style="margin-top:10px;border-top:1px solid #eee;padding-top:10px;">
          <b>Total: ₹₹${formatPrice(total)}</b>
        </div>

      </div>
    </div>
    `;

    try {
      const adminRes = await resend.emails.send({
        from: "Just My Rides <no-reply@justmyrides.com>",
        to: ["justmyrides@gmail.com"],
        subject: "🚨 New Booking Received",
        html: adminHtml,
      });

      console.log("✅ ADMIN EMAIL:", adminRes);

    } catch (adminError) {
      console.error("❌ ADMIN EMAIL FAILED:", adminError);
    }

  } catch (error) {
    console.error("❌ USER EMAIL FAILED:", error);
  }
};