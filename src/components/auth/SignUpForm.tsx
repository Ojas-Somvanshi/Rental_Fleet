import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  onSwitch: () => void;
  onContinue: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) => void;
}

const SignUpForm = ({ onSwitch, onContinue }: Props) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const isValid =
    form.firstName.trim().length > 0 &&
    form.email.includes("@") &&
    form.phone.length === 10;

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-center">Sign Up</h2>

      <p className="text-sm text-center text-muted-foreground">
        Already have an account?{" "}
        <button onClick={onSwitch} className="text-primary font-medium">
          Sign In
        </button>
      </p>

      {/* First Name */}
      <div className="space-y-1">
        <label className="text-sm font-medium">
          First Name <span className="text-red-500">*</span>
        </label>
        <Input
          placeholder="Enter first name"
          value={form.firstName}
          onChange={(e) =>
            setForm({ ...form, firstName: e.target.value })
          }
        />
        <p className="text-xs text-muted-foreground">
          Enter your name as per Driving License/Aadhaar
        </p>
      </div>

      {/* Last Name */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Last Name</label>
        <Input
          placeholder="Enter last name"
          value={form.lastName}
          onChange={(e) =>
            setForm({ ...form, lastName: e.target.value })
          }
        />
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label className="text-sm font-medium">
          Email Address <span className="text-red-500">*</span>
        </label>
        <Input
          type="email"
          placeholder="Enter email address"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
      </div>

      {/* Phone */}
      <div className="space-y-1">
        <label className="text-sm font-medium">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <Input
          type="tel"
          placeholder="Enter mobile number"
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value.replace(/\D/g, ""),
            })
          }
        />
      </div>

      {/* Continue */}
      <Button
        className="w-full mt-2"
        disabled={!isValid}
        onClick={() => onContinue(form)}
      >
        Continue
      </Button>

      {/* Terms */}
      <p className="text-xs text-center text-muted-foreground">
        By signing up, I accept the{" "}
        <span className="text-primary cursor-pointer">
          Terms & Conditions
        </span>{" "}
        &{" "}
        <span className="text-primary cursor-pointer">
          Privacy Policy
        </span>
        .
      </p>
    </div>
  );
};

export default SignUpForm;
