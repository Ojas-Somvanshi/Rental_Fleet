import { FC, useState } from "react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import {
  CheckCircle,
  X,
  MapPin,
  Clock,
  Shield,
  HardHat,
  Tag,
  ChevronRight,
  Calendar as CalendarIcon,
  User,
  Phone,
  Mail,
  Hash,
} from "lucide-react";
import type { Vehicle } from "@/data/vehicles";

/* ─── constants ─── */
const HELMET_PRICE_PER_DAY = 50;
const INSURANCE_PER_DAY = 30;
const GST_PERCENTAGE = 0.18;
const TWO_WHEELER_CATEGORIES = ["bike", "scooty"];

const TIMES = [
  "08:00 AM","09:00 AM","10:00 AM","11:00 AM",
  "12:00 PM","01:00 PM","02:00 PM","03:00 PM",
  "04:00 PM","05:00 PM","06:00 PM","07:00 PM",
];

const LOCATIONS = ["Lucknow", "Varanasi"];

/* ─── helpers ─── */
const parseTimeToMs = (time: string) => {
  const [hourMin, meridiem] = time.split(" ");
  let hours = Number(hourMin.split(":")[0]);
  const minutes = Number(hourMin.split(":")[1]);
  if (meridiem === "PM" && hours !== 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;
  return (hours * 60 + minutes) * 60 * 1000;
};

const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

/* ─── types ─── */
type Step = "dates" | "details" | "options";

interface UserDetails {
  name: string;
  mobile: string;
  email: string;
  age: string;
}

/* ─── sub-components ─── */
const SectionLabel: FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[11px] font-semibold tracking-widest uppercase text-amber-500 dark:text-amber-400 mb-2">
    {children}
  </p>
);

const SelectField: FC<{
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}> = ({ label, icon, value, onChange, options, placeholder }) => (
  <div>
    <label className="text-xs font-medium text-neutral-500 dark:text-neutral-400 block mb-1.5">
      {label}
    </label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500">
        {icon}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-neutral-50 dark:bg-[#0B1220] border border-neutral-200 dark:border-blue-900/40 rounded-xl pl-9 pr-4 py-2.5 text-sm text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all cursor-pointer"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 w-4 h-4 text-neutral-400 pointer-events-none" />
    </div>
  </div>
);

/* ─── InputField ─── */
const InputField: FC<{
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  maxLength?: number;
  error?: string;
}> = ({ label, icon, value, onChange, placeholder, type = "text", maxLength, error }) => (
  <div>
    <label className="text-xs font-medium text-neutral-500 dark:text-neutral-400 block mb-1.5">
      {label}
    </label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500">
        {icon}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full bg-neutral-50 dark:bg-[#0B1220] border rounded-xl pl-9 pr-4 py-2.5 text-sm text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-2 transition-all
          ${error
            ? "border-red-400 focus:ring-red-400/30 focus:border-red-400"
            : "border-neutral-200 dark:border-blue-900/40 focus:ring-amber-500/40 focus:border-amber-500"
          }`}
      />
    </div>
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="text-xs text-red-500 mt-1 font-medium"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

const AddOnRow: FC<{
  icon: React.ReactNode;
  label: string;
  price: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}> = ({ icon, label, price, checked, onChange }) => (
  <label className="flex items-center gap-3 cursor-pointer group select-none">
    <div
      onClick={() => onChange(!checked)}
      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0
        ${checked
          ? "bg-amber-500 border-amber-500"
          : "border-neutral-300 dark:border-neutral-600 group-hover:border-amber-400"}`}
    >
      {checked && (
        <motion.svg
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          className="w-3 h-3 text-neutral-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </motion.svg>
      )}
    </div>
    <span className="text-neutral-700 dark:text-neutral-300 flex items-center gap-2 text-sm">
      <span className="text-amber-500">{icon}</span>
      {label}
    </span>
    <span className="ml-auto text-xs font-semibold text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-[#0B1220] px-2 py-0.5 rounded-full">
      {price}
    </span>
  </label>
);

const RowLine: FC<{ label: string; value: string; highlight?: boolean; negative?: boolean }> = ({
  label, value, highlight, negative,
}) => (
  <div className={`flex justify-between items-center text-sm ${highlight ? "font-bold text-base text-neutral-900 dark:text-neutral-200" : "text-neutral-600 dark:text-neutral-400"}`}>
    <span>{label}</span>
    <span className={negative ? "text-emerald-500 dark:text-emerald-400" : highlight ? "text-amber-500" : ""}>
      {value}
    </span>
  </div>
);

/* ─── Step Indicator ─── */
const StepIndicator: FC<{ current: Step }> = ({ current }) => {
  const steps: { key: Step; label: string; icon: string }[] = [
    { key: "dates", label: "Dates", icon: "📅" },
    { key: "details", label: "Details", icon: "👤" },
    { key: "options", label: "Options", icon: "⚙️" },
  ];
  const currentIdx = steps.findIndex((s) => s.key === current);

  return (
    <div className="flex items-center px-5 pt-2 pb-3 flex-shrink-0">
      {steps.map((s, i) => (
        <div key={s.key} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-0.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-300
              ${i < currentIdx ? "bg-emerald-500 text-neutral-200 scale-90"
                : i === currentIdx ? "bg-amber-500 text-neutral-200 shadow-lg shadow-amber-400/40 scale-105"
                : "bg-neutral-100 dark:bg-[#0B1220] text-neutral-400 dark:text-neutral-600"}`}
            >
              {i < currentIdx ? "✓" : s.icon}
            </div>
            <span className={`text-[9px] font-black uppercase tracking-wider hidden sm:block transition-colors
              ${i === currentIdx ? "text-amber-500" : i < currentIdx ? "text-emerald-500" : "text-neutral-400 dark:text-neutral-600"}`}>
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className="flex-1 h-0.5 mx-1.5 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-700 relative mx-2 mb-3">
              <motion.div
                className="absolute inset-y-0 left-0 bg-amber-400 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: i < currentIdx ? "100%" : "0%" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

/* ══════════════════════ MAIN ══════════════════════ */
interface BookingModalProps {
  vehicle: Vehicle;
  onClose: () => void;
}

const BookingModal: FC<BookingModalProps> = ({ vehicle, onClose }) => {
    useEffect(() => {
    // lock scroll
    document.body.style.overflow = "hidden";

    return () => {
      // unlock scroll when modal closes
      document.body.style.overflow = "auto";
    };
  }, []);

  const [step, setStep] = useState<Step>("dates");
  const [range, setRange] = useState<DateRange | undefined>();
  const [activeCalendar, setActiveCalendar] = useState<"pickup" | "drop">("pickup");
  const [location, setLocation] = useState("");
  const [addHelmet, setAddHelmet] = useState(false);
  const [addInsurance, setAddInsurance] = useState(false);
  const [pickupTime, setPickupTime] = useState("10:00 AM");
  const [dropTime, setDropTime] = useState("10:00 AM");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [promoApplied, setPromoApplied] = useState<"success" | "fail" | null>(null);

  /* user details */
  const [details, setDetails] = useState<UserDetails>({ name: "", mobile: "", email: "", age: "" });
  const [detailErrors, setDetailErrors] = useState<Partial<UserDetails>>({});

  /* calc */
  const totalHours =
    range?.from && range?.to
      ? Math.max(
          range.to.getTime() + parseTimeToMs(dropTime) -
          (range.from.getTime() + parseTimeToMs(pickupTime)),
          0
        ) / 3_600_000
      : 0;

const fullDays = Math.floor(totalHours / 24);
const extraHours = Math.round(totalHours % 24);

const durationLabel =
  fullDays === 0 && extraHours === 0
    ? "—"
    : `${fullDays > 0 ? `${fullDays}d ` : ""}${extraHours > 0 ? `${extraHours}h` : ""}`;

// Small bikes / scooty
const SMALL_VEHICLES = [
  "raider",
  "super splendor",
  "honda shine",
  "honda activa 6g",
];

const isSmallVehicle = SMALL_VEHICLES.some((name) =>
  vehicle.name.toLowerCase().includes(name)
);

// Extra-hour rate
const EXTRA_HOUR_RATE = isSmallVehicle ? 70 : 120;

// Vehicle pricing
let vehicleCost = fullDays * vehicle.price.daily;

if (extraHours > 0) {
  if (extraHours <= 3) {
    vehicleCost += extraHours * EXTRA_HOUR_RATE;
  } else {
    vehicleCost += vehicle.price.daily;
  }
}

const helmetCost =
  addHelmet && TWO_WHEELER_CATEGORIES.includes(vehicle.category)
    ? totalHours * (HELMET_PRICE_PER_DAY / 24)
    : 0;

const insuranceCost =
  addInsurance
    ? totalHours * (INSURANCE_PER_DAY / 24)
    : 0;
  const subtotal = vehicleCost + helmetCost + insuranceCost;
  const gstAmount = subtotal * GST_PERCENTAGE;
  const totalAmount = subtotal + 0 - discount;

  const isDateValid = totalHours > 0 && location.length > 0;

  /* date pick */
  const handleDateSelect = (date?: Date) => {
    if (!date) return;
    if (activeCalendar === "pickup") {
      setRange({ from: date, to: undefined });
      setActiveCalendar("drop");
    } else {
      setRange((prev) => prev?.from ? { from: prev.from, to: date } : undefined);
    }
  };

  /* detail validation */
  const validateDetails = (): boolean => {
    const errs: Partial<UserDetails> = {};
    if (!details.name.trim() || details.name.trim().length < 2)
      errs.name = "Enter your full name (min 2 chars)";
    if (!/^[6-9]\d{9}$/.test(details.mobile))
      errs.mobile = "Enter a valid 10-digit Indian mobile number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email))
      errs.email = "Enter a valid email address";
    const age = Number(details.age);
    if (!details.age || isNaN(age) || age < 18 || age > 80)
      errs.age = "Age must be between 18 and 80";
    setDetailErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /* promo */
  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "RENT50") {
      setDiscount(50); setPromoApplied("success");
    } else {
      setDiscount(0); setPromoApplied("fail");
    }
    setTimeout(() => setPromoApplied(null), 2000);
  };
const [loading, setLoading] = useState(false);
  /* confirm */
const handleConfirm = async () => {
  try {
    setLoading(true); // 🔥 START LOADING
    const res = await fetch("https://justmyrides-backend.onrender.com/api/book", {    // i have not use ENV for this , for local use fetch("http://localhost:5000/api/book"
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: details.email,
        name: details.name,
        vehicle: vehicle.name,
        pickup: pickupTime,
        drop: dropTime,
        // 📅 BOOKING DATES
        startDate: range?.from
          ? format(range.from, "dd MMM yyyy")
          : "",
        endDate: range?.to
          ? format(range.to, "dd MMM yyyy")
          : "",
        location,
        total: totalAmount,
        phone: details.mobile,
        duration: durationLabel,
        vehicleCost,
        helmetCost,
        insuranceCost,
      }),
    });
    const data = await res.json();
    console.log(data);
    // ✅ show success UI AFTER API call
    setConfirmed(true);

  } catch (err) {
    console.error("Booking failed:", err);
  } finally {
    setLoading(false); // 🔥 STOP LOADING (VERY IMPORTANT)
  }
};

  /* direction for slide animation */
  const [slideDir, setSlideDir] = useState(1);
  const goTo = (target: Step, dir: 1 | -1) => {
    setSlideDir(dir);
    setStep(target);
  };

  /* ── Confirmed ── */
if (confirmed) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="bg-gradient-to-br from-[#020617] via-[#020617] to-[#0a0f1f] border border-blue-900/40 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
        >
          {/* 🔶 Header / Hero */}
          <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 px-5 py-5 text-center">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-8 h-8 text-neutral-200" />
            </div>
            <h2 className="text-lg font-bold text-neutral-200">Booking Confirmed!</h2>
            <p className="text-neutral-200/80 text-xs">
              Your ride is all set 🚀
            </p>
          </div>

          {/* 🔽 Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">

            {/* Rider Info */}
            <div className="bg-neutral-50 dark:bg-[#0B1220] border border-neutral-200 dark:border-blue-900/40 rounded-xl p-3 
              dark:shadow-[0_0_0_1px_rgba(59,130,246,0.1)] transition-all">
              
              <p className="text-[10px] font-bold uppercase text-amber-500 mb-1">
                Rider
              </p>

              <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {details.name}
              </p>

              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {details.mobile}
              </p>

              <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                {details.email}
              </p>
            </div>

            {/* Trip Info */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="col-span-2">
                <p className="text-neutral-400">Vehicle</p>
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {vehicle.name}
                </p>
              </div>

              <div>
                <p className="text-neutral-400">Duration</p>
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {durationLabel}
                </p>
              </div>

              <div>
                <p className="text-neutral-400">Location</p>
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {location}
                </p>
              </div>

              <div>
                <p className="text-neutral-400">Pickup</p>
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {format(range!.from!, "dd MMM")} · {pickupTime}
                </p>
              </div>

              <div>
                <p className="text-neutral-400">Drop</p>
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {format(range!.to!, "dd MMM")} · {dropTime}
                </p>
              </div>
            </div>

            {/* Bill */}
            <div className="border-t border-neutral-200 dark:border-blue-900/40 pt-3 space-y-2 text-sm">
              <RowLine label={vehicle.name} value={`₹${fmt(vehicleCost)}`} />
              {helmetCost > 0 && (
                <RowLine label="Helmet" value={`₹${fmt(helmetCost)}`} />
              )}
              {insuranceCost > 0 && (
                <RowLine label="Insurance" value={`₹${fmt(insuranceCost)}`} />
              )}
              {discount > 0 && (
                <RowLine
                  label="Promo Discount"
                  value={`-₹${discount}`}
                  negative
                />
              )}

              <div className="border-t border-neutral-200 dark:border-blue-900/40 pt-2">
                <RowLine
                  label="Grand Total"
                  value={`₹${fmt(totalAmount)}`}
                  highlight
                />
              </div>
            </div>
          </div>

          {/* 🔘 Sticky Button */}
          <div className="p-4 border-t border-neutral-200 dark:border-blue-900/40">
            <Button
              onClick={onClose}
              className="w-full bg-amber-500 hover:bg-amber-600 text-neutral-200 font-bold rounded-xl py-3 text-sm"
            >
              Done ✓
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
  /* ── Form ── */
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-md backdrop-blur-sm p-0 sm:p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gradient-to-br from-[#020617] via-[#020617] to-[#0a0f1f] border border-blue-900/40 w-full sm:max-w-lg rounded-t-[28px] sm:rounded-[28px] shadow-2xl overflow-hidden flex flex-col max-h-[95dvh] sm:max-h-[90vh]"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* drag pill */}
          <div className="flex justify-center pt-3 pb-1 sm:hidden flex-shrink-0">
            <div className="w-10 h-1 rounded-full bg-neutral-200 dark:bg-neutral-700" />
          </div>

          {/* header */}
          <div className="flex items-center justify-between px-5 pt-3 pb-2 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-xl">🚗</div>
              <div>
                <h2 className="text-lg font-extrabold text-neutral-900 dark:text-neutral-200 tracking-tight">
                  Book {vehicle.name}
                </h2>
                <p className="text-xs text-neutral-400 dark:text-neutral-500">
                  ₹{vehicle.price.daily}/day · {vehicle.category}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-[#0B1220] hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center justify-center text-neutral-500 text-sm font-bold transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* step indicator */}
          <StepIndicator current={step} />

          {/* body */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            <AnimatePresence mode="wait" custom={slideDir}>

              {/* ═══ STEP: DATES ═══ */}
              {step === "dates" && (
                <motion.div key="dates"
                  custom={slideDir}
                  initial={{ opacity: 0, x: slideDir * 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: slideDir * -30 }}
                  transition={{ duration: 0.22 }}
                  className="px-5 pb-4 space-y-5"
                >
                  <div>
                    <SectionLabel>Select Dates</SectionLabel>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {(["pickup", "drop"] as const).map((cal) => (
                        <button key={cal}
                          onClick={() => { if (cal === "drop" && !range?.from) return; setActiveCalendar(cal); }}
                          disabled={cal === "drop" && !range?.from}
                          className={`flex flex-col items-start p-3 rounded-xl border-2 transition-all text-left
                            ${activeCalendar === cal
                              ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30"
                              : "border-neutral-200 dark:border-blue-900/40 hover:border-amber-300"}
                            ${cal === "drop" && !range?.from ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                        >
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400 dark:text-neutral-500 mb-1">
                            {cal === "pickup" ? "📍 Pick-up" : "🏁 Drop-off"}
                          </span>
                          <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200">
                            {cal === "pickup"
                              ? range?.from ? format(range.from, "dd MMM yyyy") : "Choose date"
                              : range?.to ? format(range.to, "dd MMM yyyy") : "Choose date"}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="rounded-xl border border-neutral-200 dark:border-blue-900/40 overflow-hidden">
                      <Calendar
                        mode="single"
                        selected={activeCalendar === "pickup" ? range?.from : range?.to}
                        onSelect={handleDateSelect}
                        disabled={(date) =>
                          activeCalendar === "drop" && range?.from
                            ? date <= range.from : date < new Date()
                        }
                        className="w-full"
                      />
                    </div>

                    {range?.from && range?.to && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                        className="mt-2 flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-3 py-2 rounded-lg"
                      >
                        <CalendarIcon className="w-3.5 h-3.5" />
                        {format(range.from, "dd MMM")} → {format(range.to, "dd MMM")} · {durationLabel}
                      </motion.div>
                    )}
                  </div>

                  <div>
                    <SectionLabel>Pickup & Drop Time</SectionLabel>
                    <div className="grid grid-cols-2 gap-3">
                      <SelectField label="Pickup Time" icon={<Clock className="w-4 h-4" />}
                        value={pickupTime} onChange={setPickupTime} options={TIMES} />
                      <SelectField label="Drop Time" icon={<Clock className="w-4 h-4" />}
                        value={dropTime} onChange={setDropTime} options={TIMES} />
                    </div>
                  </div>

                  <div>
                    <SectionLabel>Location</SectionLabel>
                    <SelectField label="Pickup Location" icon={<MapPin className="w-4 h-4" />}
                      value={location} onChange={setLocation} options={LOCATIONS} placeholder="Select a city" />
                  </div>

                  {error && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="text-red-500 text-xs bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2 font-medium"
                    >⚠️ {error}</motion.p>
                  )}

                  <Button
                    onClick={() => {
                      if (!isDateValid) {
                        setError("Please select pickup & drop date, and a location.");
                        return;
                      }
                      setError("");
                      goTo("details", 1);
                    }}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-neutral-200 font-bold rounded-xl py-3 text-sm tracking-wide shadow-md shadow-amber-400/25"
                  >
                    Next: Your Details →
                  </Button>
                </motion.div>
              )}

              {/* ═══ STEP: DETAILS ═══ */}
              {step === "details" && (
                <motion.div key="details"
                  custom={slideDir}
                  initial={{ opacity: 0, x: slideDir * 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: slideDir * -30 }}
                  transition={{ duration: 0.22 }}
                  className="px-5 pb-4 space-y-5"
                >
                  {/* intro badge */}
                  <div className="flex items-center gap-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 rounded-2xl px-4 py-3">
                    <span className="text-2xl">👤</span>
                    <div>
                      <p className="text-sm font-bold text-neutral-800 dark:text-neutral-100">Rider Details</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">We need this to confirm your booking</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <SectionLabel>Personal Info</SectionLabel>

                    <InputField
                      label="Full Name *"
                      icon={<User className="w-4 h-4" />}
                      value={details.name}
                      onChange={(v) => {
                        setDetails((d) => ({ ...d, name: v }));
                        if (detailErrors.name) setDetailErrors((e) => ({ ...e, name: "" }));
                      }}
                      placeholder="e.g. Rahul Sharma"
                      error={detailErrors.name}
                    />

                    <InputField
                      label="Age *"
                      icon={<Hash className="w-4 h-4" />}
                      value={details.age}
                      onChange={(v) => {
                        if (/^\d{0,2}$/.test(v)) {
                          setDetails((d) => ({ ...d, age: v }));
                          if (detailErrors.age) setDetailErrors((e) => ({ ...e, age: "" }));
                        }
                      }}
                      placeholder="Must be 18 or above"
                      type="tel"
                      maxLength={2}
                      error={detailErrors.age}
                    />

                    <SectionLabel>Contact Info</SectionLabel>

                    <InputField
                      label="Mobile Number *"
                      icon={<Phone className="w-4 h-4" />}
                      value={details.mobile}
                      onChange={(v) => {
                        if (/^\d{0,10}$/.test(v)) {
                          setDetails((d) => ({ ...d, mobile: v }));
                          if (detailErrors.mobile) setDetailErrors((e) => ({ ...e, mobile: "" }));
                        }
                      }}
                      placeholder="10-digit mobile number"
                      type="tel"
                      maxLength={10}
                      error={detailErrors.mobile}
                    />

                    <InputField
                      label="Email Address *"
                      icon={<Mail className="w-4 h-4" />}
                      value={details.email}
                      onChange={(v) => {
                        setDetails((d) => ({ ...d, email: v }));
                        if (detailErrors.email) setDetailErrors((e) => ({ ...e, email: "" }));
                      }}
                      placeholder="you@example.com"
                      type="email"
                      error={detailErrors.email}
                    />
                  </div>

                  {/* privacy note */}
                  <p className="text-[11px] text-neutral-400 dark:text-neutral-500 text-center leading-relaxed">
                    🔒 Your details are safe with us and used only for booking confirmation
                  </p>

                  <div className="grid grid-cols-2 gap-3 pb-2">
                    <Button variant="outline" onClick={() => goTo("dates", -1)}
                      className="rounded-xl border-neutral-200 dark:border-blue-900/40 text-neutral-600 dark:text-neutral-400 font-semibold text-sm">
                      ← Back
                    </Button>
                    <Button
                      onClick={() => {
                        if (validateDetails()) goTo("options", 1);
                      }}
                      className="bg-amber-500 hover:bg-amber-600 text-neutral-200 font-bold rounded-xl text-sm tracking-wide shadow-md shadow-amber-400/25"
                    >
                      Next: Options →
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* ═══ STEP: OPTIONS ═══ */}
              {step === "options" && (
                <motion.div key="options"
                  custom={slideDir}
                  initial={{ opacity: 0, x: slideDir * 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: slideDir * -30 }}
                  transition={{ duration: 0.22 }}
                  className="px-5 py-4 space-y-5"
                >
                  {/* add-ons */}
                  <div>
                    <SectionLabel>Add-ons</SectionLabel>
                    <div className="space-y-3 bg-neutral-50 dark:bg-[#0B1220]/50 rounded-xl p-4 border border-neutral-200 dark:border-blue-900/40">
                      {TWO_WHEELER_CATEGORIES.includes(vehicle.category) && (
                        <AddOnRow icon={<HardHat className="w-4 h-4" />} label="Helmet"
                          price="₹50/day" checked={addHelmet} onChange={setAddHelmet} />
                      )}
                      <AddOnRow icon={<Shield className="w-4 h-4" />} label="Insurance"
                        price="₹30/day" checked={addInsurance} onChange={setAddInsurance} />
                    </div>
                  </div>

                  {/* promo */}
                  <div>
                    <SectionLabel>Promo Code</SectionLabel>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input
                          type="text"
                          placeholder='Try "RENT50"'
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
                          className={`w-full bg-neutral-50 dark:bg-[#0B1220] border rounded-xl pl-9 pr-4 py-2.5 text-sm text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 transition-all
                            ${promoApplied === "success" ? "border-emerald-400 focus:ring-emerald-400/30"
                              : promoApplied === "fail" ? "border-red-400 focus:ring-red-400/30"
                              : "border-neutral-200 dark:border-blue-900/40 focus:ring-amber-500/30 focus:border-amber-500"
                            } text-neutral-800 dark:text-neutral-200`}
                        />
                      </div>
                      <Button onClick={handleApplyPromo} variant="outline"
                        className="border-amber-500 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 rounded-xl px-4 font-semibold text-sm">
                        Apply
                      </Button>
                    </div>
                    <AnimatePresence>
                      {promoApplied && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                          className={`text-xs mt-1.5 font-medium ${promoApplied === "success" ? "text-emerald-500" : "text-red-500"}`}
                        >
                          {promoApplied === "success" ? "✓ Promo applied — ₹50 off!" : "✗ Invalid promo code"}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* price summary */}
                  <div>
                    <SectionLabel>Price Summary</SectionLabel>
                    <div className="bg-neutral-50 dark:bg-[#0B1220]/50 border border-neutral-200 dark:border-blue-900/40 rounded-xl p-4 space-y-2.5">
                      <RowLine label={`${vehicle.name} (${durationLabel})`} value={`₹${fmt(vehicleCost)}`} />
                      <AnimatePresence>
                        {helmetCost > 0 && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                            <RowLine label="Helmet" value={`₹${fmt(helmetCost)}`} />
                          </motion.div>
                        )}
                        {insuranceCost > 0 && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                            <RowLine label="Insurance" value={`₹${fmt(insuranceCost)}`} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {/* <RowLine label="GST (18%)" value={`₹${fmt(gstAmount)}`} />
                      <AnimatePresence>
                        {discount > 0 && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                            <RowLine label="Promo Discount" value={`-₹${discount}`} negative />
                          </motion.div>
                        )}
                      </AnimatePresence> */}
                      <div className="border-t border-neutral-200 dark:border-blue-900/40 pt-2.5">
                        <motion.div animate={{ scale: discount > 0 ? [1, 1.04, 1] : 1 }} transition={{ duration: 0.3 }}>
                          <RowLine label="Grand Total" value={`₹${fmt(totalAmount)}`} highlight />
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* rider mini recap */}
                  <div className="bg-neutral-50 dark:bg-[#0B1220]/50 border border-neutral-200 dark:border-blue-900/40 rounded-xl p-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-lg flex-shrink-0">👤</div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-neutral-800 dark:text-neutral-100 truncate">{details.name}</p>
                      <p className="text-xs text-neutral-400 dark:text-neutral-500 truncate">{details.mobile} · {details.email}</p>
                    </div>
                    <button onClick={() => goTo("details", -1)}
                      className="ml-auto text-xs text-amber-500 font-bold flex-shrink-0 hover:text-amber-600 transition-colors">
                      Edit
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pb-2">
                    <Button variant="outline" onClick={() => goTo("details", -1)}
                      className="rounded-xl border-neutral-200 dark:border-blue-900/40 text-neutral-600 dark:text-neutral-400 font-semibold text-sm">
                      ← Back
                    </Button>
                    <Button
                      onClick={handleConfirm}
                      disabled={loading}
                        className="bg-amber-500 hover:bg-amber-600 text-neutral-200 font-bold rounded-xl text-sm"
                        >
                        {loading ? "Processing..." : "Confirm Booking ✓"}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingModal;