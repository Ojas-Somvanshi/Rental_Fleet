// import { useState, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { sendEmailOtp, verifyOtp } from "@/api/emailOtp";
// import { useAuth } from "@/context/AuthContext";

// const OTP_LENGTH = 6;

// interface SignupData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
// }

// interface Props {
//   signupData?: SignupData;
//   onSwitch: () => void;
//   onBack: () => void;
//   onSuccess: () => void;
// }

// const EmailAuth = ({ signupData, onBack,onSwitch, onSuccess }: Props) => {
//   const { login } = useAuth();

//   const [email, setEmail] = useState(signupData?.email ?? "");
//   const [step, setStep] = useState<"email" | "otp">(
//     signupData ? "otp" : "email"
//   );
//   const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

//   /* ================= SEND OTP ================= */
//   const handleSendOtp = async () => {
//     setError("");

//     if (!email.includes("@")) {
//       setError("Please enter a valid email address");
//       return;
//     }

//     try {
//       await sendEmailOtp(email, "login");
//       setStep("otp");
//       setOtp(Array(OTP_LENGTH).fill(""));
//       setTimeout(() => inputsRef.current[0]?.focus(), 100);
//     } catch (err: unknown) {
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Failed to send OTP. Try again."
//       );
//     }
//   };

//   /* ================= OTP INPUT ================= */
//   const handleOtpChange = (value: string, index: number) => {
//     if (!/^\d?$/.test(value)) return;

//     const updated = [...otp];
//     updated[index] = value;
//     setOtp(updated);

//     if (value && index < OTP_LENGTH - 1) {
//       inputsRef.current[index + 1]?.focus();
//     }
//   };

//   const handleBackspace = (
//     e: React.KeyboardEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputsRef.current[index - 1]?.focus();
//     }
//   };

//   /* ================= VERIFY OTP ================= */
//   const handleVerify = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       await verifyOtp({
//         email,
//         otp: otp.join(""),
//         ...(signupData ?? {}),
//       });

//       login({ email });
//       onSuccess();
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Invalid OTP");
//       setOtp(Array(OTP_LENGTH).fill(""));
//       inputsRef.current[0]?.focus();
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* ================= TITLE ================= */}
//       <div className="text-center space-y-1">
//         <h2 className="text-xl font-bold">
//           {step === "email" ? "Sign In" : "Verify Email"}
//         </h2>
//         <p className="text-sm text-muted-foreground">
//           {step === "email"
//             ? "Access your bookings and rides"
//             : `OTP sent to ${email}`}
//         </p>
//       </div>

//       {/* ================= EMAIL STEP ================= */}
//       {step === "email" && (
//         <>
//           <Input
//             placeholder="Enter email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           {error && (
//             <p className="text-sm text-center text-red-500">{error}</p>
//           )}

//           <Button className="w-full py-6" onClick={handleSendOtp}>
//             Send OTP
//           </Button>
//         </>
//       )}

//       {/* ================= OTP STEP ================= */}
//       {step === "otp" && (
//         <>
//           <div className="flex justify-center gap-2">
//             {otp.map((digit, i) => (
//               <input
//                 key={i}
//                 ref={(el) => (inputsRef.current[i] = el)}
//                 value={digit}
//                 maxLength={1}
//                 onChange={(e) => handleOtpChange(e.target.value, i)}
//                 onKeyDown={(e) => handleBackspace(e, i)}
//                 className={`
//                   w-12 h-12 text-center text-lg font-semibold
//                   rounded-lg border border-input
//                   bg-background text-foreground
//                   focus:outline-none focus:ring-2 focus:ring-ring
//                   ${error ? "border-red-500" : ""}
//                 `}
//               />
//             ))}
//           </div>

//           {error && (
//             <p className="text-sm text-center text-red-500">{error}</p>
//           )}

//           <Button
//             className="w-full py-6"
//             disabled={otp.join("").length < OTP_LENGTH || loading}
//             onClick={handleVerify}
//           >
//             Verify OTP
//           </Button>
//         </>
//       )}

//       {/* BACK */}
//       <button
//         onClick={onBack}
//         className="text-xs text-muted-foreground hover:underline"
//       >
//         ← Back
//       </button>

//       {/* Switch */}
//           <p className="text-sm text-center text-muted-foreground">
//             Don’t have an account?{" "}
//             <button
//               onClick={onSwitch}
//               className="text-primary font-medium hover:underline"
//             >
//               Sign Up
//             </button>
//           </p>

//       {/* TERMS */}
//       <p className="text-xs text-center text-muted-foreground">
//         By signing in, I accept the{" "}
//         <span className="text-primary">Terms & Conditions</span> &{" "}
//         <span className="text-primary">Privacy Policy</span>.
//       </p>
//     </div>
//   );
// };

// export default EmailAuth;

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendEmailOtp, verifyOtp } from "@/api/emailOtp";
import { useAuth } from "@/context/AuthContext";

const OTP_LENGTH = 6;

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface Props {
  signupData?: SignupData;
  onSwitch: () => void;
  onBack: () => void;
  onSuccess: () => void;
}

const EmailAuth = ({ signupData, onBack, onSwitch, onSuccess }: Props) => {
  const { login } = useAuth();

  const [email, setEmail] = useState(signupData?.email ?? "");
  const [step, setStep] = useState<"email" | "otp">(
    signupData ? "otp" : "email"
  );
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  /* ================= SEND OTP ================= */
  const handleSendOtp = async () => {
    setError("");

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      await sendEmailOtp(email, "login");
      setStep("otp");
      setOtp(Array(OTP_LENGTH).fill(""));
      setTimeout(() => inputsRef.current[0]?.focus(), 100);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to send OTP. Try again."
      );
    }
  };

  /* ================= OTP INPUT ================= */
  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  /* ================= PASTE FULL OTP ================= */
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (pasted.length !== OTP_LENGTH) return;

    setOtp(pasted.split(""));
    inputsRef.current[OTP_LENGTH - 1]?.focus();
  };

  /* ================= VERIFY OTP ================= */
  const handleVerify = async () => {
    setLoading(true);
    setError("");

    try {
      await verifyOtp({
        email,
        otp: otp.join(""),
        ...(signupData ?? {}),
      });

      login({ email });
      onSuccess();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid OTP");

      // 📳 VIBRATION FEEDBACK (mobile only)
      if ("vibrate" in navigator) {
        navigator.vibrate([100, 50, 100]);
      }

      setOtp(Array(OTP_LENGTH).fill(""));
      inputsRef.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* ================= TITLE ================= */}
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold">
          {step === "email" ? "Sign In" : "Verify Email"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {step === "email"
            ? "Access your bookings and rides"
            : `OTP sent to ${email}`}
        </p>
      </div>

      {/* ================= EMAIL STEP ================= */}
      {step === "email" && (
        <>
          <Input
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error && (
            <p className="text-sm text-center text-red-500">{error}</p>
          )}

          <Button className="w-full py-6" onClick={handleSendOtp}>
            Send OTP
          </Button>
        </>
      )}

      {/* ================= OTP STEP ================= */}
      {step === "otp" && (
        <>
          <div className="flex justify-center gap-2 overscroll-contain">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                value={digit}
                maxLength={1}

                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="one-time-code"
                enterKeyHint="done"

                onFocus={(e) =>
                  e.target.scrollIntoView({
                    block: "center",
                    behavior: "smooth",
                  })
                }
                onPaste={handlePaste}
                onChange={(e) => handleOtpChange(e.target.value, i)}
                onKeyDown={(e) => handleBackspace(e, i)}

                className={`
                  w-12 h-12 text-center text-lg font-semibold
                  rounded-lg border border-input
                  bg-background text-foreground
                  focus:outline-none focus:ring-2 focus:ring-ring
                  ${error ? "border-red-500" : ""}
                `}
              />
            ))}
          </div>

          {error && (
            <p className="text-sm text-center text-red-500">{error}</p>
          )}

          <Button
            className="w-full py-6"
            disabled={otp.join("").length < OTP_LENGTH || loading}
            onClick={handleVerify}
          >
            Verify OTP
          </Button>
        </>
      )}

      {/* BACK */}
      <button
        onClick={onBack}
        className="text-xs text-muted-foreground hover:underline"
      >
        ← Back
      </button>

      {/* SWITCH */}
      <p className="text-sm text-center text-muted-foreground">
        Don’t have an account?{" "}
        <button
          onClick={onSwitch}
          className="text-primary font-medium hover:underline"
        >
          Sign Up
        </button>
      </p>

      {/* TERMS */}
      <p className="text-xs text-center text-muted-foreground">
        By signing in, I accept the{" "}
        <span className="text-primary">Terms & Conditions</span> &{" "}
        <span className="text-primary">Privacy Policy</span>.
      </p>
    </div>
  );
};

export default EmailAuth;

