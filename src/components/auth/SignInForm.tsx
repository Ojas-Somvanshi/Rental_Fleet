import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Apple } from "lucide-react";
import PhoneAuth from "./Phoneauth";
import EmailAuth from "./Emailauth";

interface Props {
  onSwitch: () => void;
  onSuccess: () => void;
}

const SignInForm = ({ onSwitch, onSuccess }: Props) => {
  const [step, setStep] = useState<"default" | "phone" | "email">("default");

  return (
    <div className="space-y-6">
      {/* ================= DEFAULT SIGN IN UI ================= */}
      {step === "default" && (
        <>
          {/* Title */}
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold">Sign In</h2>
            <p className="text-sm text-muted-foreground">
              Access your bookings and rides
            </p>
          </div>

          {/* Phone */}
          {/* <Button
            className="w-full gap-2 text-base py-6"
            onClick={() => setStep("phone")}
          >
            <Phone className="w-4 h-4" />
            Continue with Phone
          </Button> */}

          {/* Email */}
          <Button
            className="w-full gap-2 text-base py-6"
            onClick={() => setStep("email")}
          >
            <Mail className="w-4 h-4" />
            Continue with Email
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <span className="h-px w-full bg-border" />
            <span className="text-xs text-muted-foreground">OR</span>
            <span className="h-px w-full bg-border" />
          </div>

          {/* Google */}
          <Button
            variant="outline"
            className="w-full gap-2 py-6 text-base bg-background border-border hover:bg-secondary/60"
          >
            <Mail className="w-4 h-4" />
            Continue with Google
          </Button>

          {/* Apple */}
          <Button
            variant="outline"
            className="w-full gap-2 py-6 text-base bg-background border-border hover:bg-secondary/60"
          >
            <Apple className="w-4 h-4" />
            Continue with Apple
          </Button>

          {/* Switch */}
          <p className="text-sm text-center text-muted-foreground">
            Don’t have an account?{" "}
            <button
              onClick={onSwitch}
              className="text-primary font-medium hover:underline"
            >
              Sign Up
            </button>
          </p>

          {/* Terms */}
          <p className="text-xs text-center text-muted-foreground leading-relaxed">
            By signing in, I accept the{" "}
            <span className="text-primary">Terms & Conditions</span> &{" "}
            <span className="text-primary">Privacy Policy</span>.
          </p>
        </>
      )}

      {/* ================= PHONE FLOW ================= */}
      {step === "phone" && (
        <PhoneAuth
          onBack={() => setStep("default")}
          onSuccess={onSuccess}
        />
      )}

      {/* ================= EMAIL FLOW ================= */}
      {step === "email" && (
        <EmailAuth onBack={() => setStep("default")} onSuccess={onSuccess} onSwitch={onSwitch}/>
      )}
    </div>
  );
};

export default SignInForm;

