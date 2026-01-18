import { useState } from "react";
import SignUpForm from "./SignUpForm";
import EmailAuth from "./Emailauth";
import { sendEmailOtp } from "@/api/emailOtp";

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface Props {
  onSwitch: () => void;
  onSuccess: () => void;
}

const SignUp = ({ onSwitch, onSuccess }: Props) => {
  const [step, setStep] = useState<"form" | "otp">("form");
  const [signupData, setSignupData] = useState<SignupData | null>(null);

  const handleContinue = (data: SignupData) => {
    // ✅ store ALL signup data
    setSignupData(data);
    setStep("otp");

    // ✅ send OTP in background
    sendEmailOtp(data.email, "signup").catch(() => {
      console.error("Failed to send OTP");
    });
  };

  if (step === "form") {
    return (
      <SignUpForm
        onSwitch={onSwitch}
        onContinue={handleContinue}
      />
    );
  }

  return (
    <EmailAuth
      signupData={signupData!}   // 🔥 THIS IS THE KEY
      onBack={() => setStep("form")}
      onSuccess={onSuccess}
    />
  );
};

export default SignUp;
