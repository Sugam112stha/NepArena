import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser } from "react-icons/fi";
import { HiAtSymbol } from "react-icons/hi";
import { FaDiscord, FaGoogle } from "react-icons/fa";
import logo from "../assets/logo/logo1.png";
import authBg from "../assets/auth-bg.png";

/* ── Password Strength ── */
type Strength = "empty" | "weak" | "medium" | "strong";

const getPasswordStrength = (pw: string): Strength => {
  if (!pw) return "empty";
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return "weak";
  if (score <= 2) return "medium";
  return "strong";
};

const strengthConfig: Record<
  Exclude<Strength, "empty">,
  { label: string; color: string; width: string }
> = {
  weak: { label: "Weak", color: "bg-red-500", width: "w-1/3" },
  medium: { label: "Medium", color: "bg-yellow-500", width: "w-2/3" },
  strong: { label: "Strong", color: "bg-green-500", width: "w-full" },
};

/* ── Component ── */
const Signup = () => {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const strength = useMemo(
    () => getPasswordStrength(form.password),
    [form.password]
  );

  /* Validators */
  const validators: Record<string, (v: string) => string> = {
    fullName: (v) => (v.trim() ? "" : "Full name is required."),
    username: (v) => {
      if (!v.trim()) return "Username is required.";
      if (v.length < 3) return "Username must be at least 3 characters.";
      if (!/^[a-zA-Z0-9_]+$/.test(v))
        return "Only letters, numbers and underscores.";
      return "";
    },
    email: (v) => {
      if (!v) return "Email is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
        return "Please enter a valid email address.";
      return "";
    },
    password: (v) => {
      if (!v) return "Password is required.";
      if (v.length < 8) return "Password must contain at least 8 characters.";
      return "";
    },
    confirmPassword: (v) => {
      if (!v) return "Please confirm your password.";
      if (v !== form.password) return "Passwords do not match.";
      return "";
    },
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validators[field](value) }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validators[field](form[field as keyof typeof form]),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    const allTouched: Record<string, boolean> = {};
    for (const key of Object.keys(validators)) {
      newErrors[key] = validators[key](form[key as keyof typeof form]);
      allTouched[key] = true;
    }
    setErrors(newErrors);
    setTouched(allTouched);

    if (Object.values(newErrors).some((e) => e) || !agreed) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const isFormValid =
    Object.keys(validators).every(
      (k) => !validators[k](form[k as keyof typeof form])
    ) && agreed;

  /* ── Shared input classes ── */
  const inputBase =
    "w-full rounded-lg border bg-[#0D0D0D] py-3 text-sm text-white placeholder-[#9CA3AF]/50 outline-none transition focus:ring-1";
  const inputOk =
    "border-white/10 focus:border-[#E50914] focus:ring-[#E50914]/30";
  const inputErr =
    "border-red-500 focus:border-red-500 focus:ring-red-500/30";

  const fieldClass = (field: string) =>
    `${inputBase} ${touched[field] && errors[field] ? inputErr : inputOk}`;

  return (
    <main className="flex min-h-screen bg-[#050505]">
      {/* ── Left: Auth Panel ── */}
      <div className="relative z-10 flex w-full flex-col justify-center px-6 py-10 sm:px-12 lg:w-[55%] lg:px-20 xl:px-28">
        {/* Logo */}
        <Link to="/" className="mb-8 inline-block w-fit">
          <img src={logo} alt="NepArena" className="h-10 w-auto sm:h-12" />
        </Link>

        {/* Heading */}
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#E50914]">
          Get Started
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
          Create Your NepArena Account
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#9CA3AF] sm:text-base">
          Join Nepal&apos;s competitive esports community.
        </p>

        {/* Social Auth */}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-3 rounded-lg border border-white/10 bg-[#0D0D0D] px-5 py-3 text-sm font-medium text-white transition hover:border-[#5865F2] hover:bg-[#5865F2]/10"
          >
            <FaDiscord className="text-lg text-[#5865F2]" />
            Continue with Discord
          </button>
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-3 rounded-lg border border-white/10 bg-[#0D0D0D] px-5 py-3 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5"
          >
            <FaGoogle className="text-lg" />
            Continue with Google
          </button>
        </div>

        {/* Divider */}
        <div className="my-7 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs font-medium uppercase tracking-wider text-[#9CA3AF]">
            Or sign up with email
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name & Username row */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Full Name */}
            <div>
              <label
                htmlFor="signup-fullname"
                className="mb-2 block text-sm font-medium text-[#9CA3AF]"
              >
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                <input
                  id="signup-fullname"
                  type="text"
                  placeholder="Enter your full name"
                  value={form.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  onBlur={() => handleBlur("fullName")}
                  className={`${fieldClass("fullName")} pl-11 pr-4`}
                />
              </div>
              {touched.fullName && errors.fullName && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Username */}
            <div>
              <label
                htmlFor="signup-username"
                className="mb-2 block text-sm font-medium text-[#9CA3AF]"
              >
                Username
              </label>
              <div className="relative">
                <HiAtSymbol className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                <input
                  id="signup-username"
                  type="text"
                  placeholder="Choose a username"
                  value={form.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  onBlur={() => handleBlur("username")}
                  className={`${fieldClass("username")} pl-11 pr-4`}
                />
              </div>
              {touched.username && errors.username && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.username}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="signup-email"
              className="mb-2 block text-sm font-medium text-[#9CA3AF]"
            >
              Email
            </label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
              <input
                id="signup-email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                className={`${fieldClass("email")} pl-11 pr-4`}
              />
            </div>
            {touched.email && errors.email && (
              <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="signup-password"
              className="mb-2 block text-sm font-medium text-[#9CA3AF]"
            >
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                onBlur={() => handleBlur("password")}
                className={`${fieldClass("password")} pl-11 pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] transition hover:text-white"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <FiEyeOff className="text-lg" />
                ) : (
                  <FiEye className="text-lg" />
                )}
              </button>
            </div>
            {touched.password && errors.password && (
              <p className="mt-1.5 text-xs text-red-400">{errors.password}</p>
            )}

            {/* Password Strength */}
            {form.password && strength !== "empty" && (
              <div className="mt-2.5">
                <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${strengthConfig[strength].color} ${strengthConfig[strength].width}`}
                  />
                </div>
                <p
                  className={`mt-1 text-xs font-medium ${
                    strength === "weak"
                      ? "text-red-400"
                      : strength === "medium"
                        ? "text-yellow-400"
                        : "text-green-400"
                  }`}
                >
                  {strengthConfig[strength].label}
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="signup-confirm"
              className="mb-2 block text-sm font-medium text-[#9CA3AF]"
            >
              Confirm Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
              <input
                id="signup-confirm"
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                onBlur={() => handleBlur("confirmPassword")}
                className={`${fieldClass("confirmPassword")} pl-11 pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] transition hover:text-white"
                aria-label="Toggle confirm password visibility"
              >
                {showConfirm ? (
                  <FiEyeOff className="text-lg" />
                ) : (
                  <FiEye className="text-lg" />
                )}
              </button>
            </div>
            {touched.confirmPassword && errors.confirmPassword && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Terms Checkbox */}
          <label
            htmlFor="signup-agree"
            className="flex cursor-pointer items-start gap-3 pt-1"
          >
            <input
              id="signup-agree"
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 appearance-none rounded border border-white/20 bg-[#0D0D0D] checked:border-[#E50914] checked:bg-[#E50914] focus:outline-none focus:ring-1 focus:ring-[#E50914]/30"
            />
            <span className="text-xs leading-5 text-[#9CA3AF]">
              I agree to the{" "}
              <span className="font-medium text-white">
                Terms &amp; Conditions
              </span>{" "}
              and{" "}
              <span className="font-medium text-white">Privacy Policy</span>
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="mt-2 flex w-full items-center justify-center rounded-lg bg-[#E50914] py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[#ff1e2d] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <svg
                className="h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-7 text-center text-sm text-[#9CA3AF]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#E50914] transition hover:text-[#ff1e2d]"
          >
            Login
          </Link>
        </p>
      </div>

      {/* ── Right: Visual Panel (desktop only) ── */}
      <div className="relative hidden lg:block lg:w-[45%]">
        {/* Gradient overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent" />

        {/* Background image */}
        <img
          src={authBg}
          alt=""
          className="h-full w-full object-cover"
          aria-hidden="true"
        />

        {/* Branding text */}
        <div className="absolute bottom-16 left-12 z-20 max-w-xs">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E50914]">
            NepArena
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white">
            Build your team.
            <br />
            Enter tournaments.
            <br />
            <span className="text-[#E50914]">Climb the leaderboard.</span>
          </h2>
          <p className="mt-4 text-sm leading-6 text-[#9CA3AF]">
            Nepal&apos;s premier esports tournament platform.
          </p>
        </div>
      </div>

      {/* ── Mobile background ── */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center lg:hidden"
        style={{ backgroundImage: `url(${authBg})` }}
        aria-hidden="true"
      >
        <div className="h-full w-full bg-[#050505]/90" />
      </div>
    </main>
  );
};

export default Signup;