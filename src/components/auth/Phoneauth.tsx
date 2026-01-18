import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

const HARDCODED_OTP = "123456";
const RESEND_TIME = 10;

interface Props {
  onBack: () => void;
  onSuccess: () => void;
}

const PhoneAuth = ({ onBack, onSuccess }: Props) => {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [timer, setTimer] = useState(RESEND_TIME);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (step !== "otp" || timer === 0) return;

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [step, timer]);

  /* ================= OTP INPUT ================= */
  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < 5) {
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

  /* ================= VERIFY OTP ================= */
  const handleVerifyOtp = () => {
    if (otp.join("") === HARDCODED_OTP) {
      onSuccess(); // ✅ CLOSE MODAL
    } else {
      setOtp(Array(6).fill(""));
      inputsRef.current[0]?.focus();
    }
  };

  /* ================= RESEND OTP ================= */
  const handleResendOtp = () => {
    setOtp(Array(6).fill(""));
    setTimer(RESEND_TIME);
    inputsRef.current[0]?.focus();
  };

  return (
    <div className="space-y-6">
      {/* TITLE */}
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold">
          {step === "phone" ? "Sign In" : "Verify OTP"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {step === "phone"
            ? "Access your bookings and rides"
            : `OTP sent to +91 ${phone}`}
        </p>
      </div>

      {/* ================= PHONE STEP ================= */}
      {step === "phone" && (
        <>
          <div className="flex items-center gap-3 border border-border rounded-xl px-4 py-3">
            🇮🇳 <span className="font-medium">+91</span>
            <input
              type="tel"
              maxLength={10}
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, ""))
              }
              placeholder="Enter mobile number"
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>

          <Button
            className="w-full py-6"
            disabled={phone.length !== 10}
            onClick={() => {
              setStep("otp");
              setTimer(RESEND_TIME);
              setOtp(Array(6).fill(""));
              setTimeout(() => inputsRef.current[0]?.focus(), 100);
            }}
          >
            Send OTP
          </Button>
        </>
      )}

      {/* ================= OTP STEP ================= */}
      {step === "otp" && (
        <>
          <div className="flex justify-center gap-2">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                value={digit}
                maxLength={1}
                onChange={(e) => handleOtpChange(e.target.value, i)}
                onKeyDown={(e) => handleBackspace(e, i)}
                className="
                  w-12 h-12 text-center text-lg font-semibold
                  rounded-lg border
                  bg-background text-foreground
                  focus:ring-2 focus:ring-primary
                "
              />
            ))}
          </div>

          <Button className="w-full py-6" onClick={handleVerifyOtp}>
            Verify OTP
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            {timer > 0 ? (
              <>Resend OTP in <b>{timer}s</b></>
            ) : (
              <button
                onClick={handleResendOtp}
                className="text-primary hover:underline"
              >
                Resend OTP
              </button>
            )}
          </p>
        </>
      )}

      {/* BACK */}
      <button
        className="text-xs text-muted-foreground hover:underline"
        onClick={onBack}
      >
        ← Back
      </button>

      {/* TERMS */}
      <p className="text-xs text-center text-muted-foreground">
        By signing in, I accept the{" "}
        <span className="text-primary">Terms & Conditions</span> &{" "}
        <span className="text-primary">Privacy Policy</span>.
      </p>
    </div>
  );
};

export default PhoneAuth;
