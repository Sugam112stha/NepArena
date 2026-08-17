import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";
import { FaDiscord, FaGoogle } from "react-icons/fa";
import logo from "../assets/logo/logo1.png";
import authBg from "../assets/auth-bg.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [touched, setTouched] = useState<{
    email?: boolean;
    password?: boolean;
  }>({});

  const validateEmail = (value: string) => {
    if (!value) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return "Please enter a valid email address.";
    return "";
  };

  const validatePassword = (value: string) => {
    if (!value) return "Password is required.";
    if (value.length < 8) return "Password must contain at least 8 characters.";
    return "";
  };

  const handleBlur = (field: "email" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(email) }));
    } else {
      setErrors((prev) => ({ ...prev, password: validatePassword(password) }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    setErrors({ email: emailErr, password: passwordErr });
    setTouched({ email: true, password: true });

    if (emailErr || passwordErr) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const isFormValid = !validateEmail(email) && !validatePassword(password);

  return (
    <main className="flex min-h-screen bg-[#050505]">
      {/* ── Left: Auth Panel ── */}
      <div className="relative z-10 flex w-full flex-col justify-center px-6 py-12 sm:px-12 lg:w-[55%] lg:px-20 xl:px-28">
        {/* Logo */}
        <Link to="/" className="mb-10 inline-block w-fit">
          <img src={logo} alt="NepArena" className="h-10 w-auto sm:h-12" />
        </Link>

        {/* Heading */}
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#E50914]">
          Welcome Back
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
          Login to NepArena
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#9CA3AF] sm:text-base">
          Login to manage your team and compete in tournaments.
        </p>

        {/* Social Auth */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs font-medium uppercase tracking-wider text-[#9CA3AF]">
            Or continue with email
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="login-email"
              className="mb-2 block text-sm font-medium text-[#9CA3AF]"
            >
              Email
            </label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
              <input
                id="login-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (touched.email)
                    setErrors((prev) => ({
                      ...prev,
                      email: validateEmail(e.target.value),
                    }));
                }}
                onBlur={() => handleBlur("email")}
                className={`w-full rounded-lg border bg-[#0D0D0D] py-3 pl-11 pr-4 text-sm text-white placeholder-[#9CA3AF]/50 outline-none transition focus:ring-1 ${
                  touched.email && errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                    : "border-white/10 focus:border-[#E50914] focus:ring-[#E50914]/30"
                }`}
              />
            </div>
            {touched.email && errors.email && (
              <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="login-password"
                className="text-sm font-medium text-[#9CA3AF]"
              >
                Password
              </label>
              <button
                type="button"
                className="text-xs font-medium text-[#E50914] transition hover:text-[#ff1e2d]"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (touched.password)
                    setErrors((prev) => ({
                      ...prev,
                      password: validatePassword(e.target.value),
                    }));
                }}
                onBlur={() => handleBlur("password")}
                className={`w-full rounded-lg border bg-[#0D0D0D] py-3 pl-11 pr-12 text-sm text-white placeholder-[#9CA3AF]/50 outline-none transition focus:ring-1 ${
                  touched.password && errors.password
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                    : "border-white/10 focus:border-[#E50914] focus:ring-[#E50914]/30"
                }`}
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
          </div>

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
              "Login"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-[#9CA3AF]">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-[#E50914] transition hover:text-[#ff1e2d]"
          >
            Sign Up
          </Link>
        </p>
      </div>

      {/* ── Right: Visual Panel (desktop only) ── */}
      <div className="relative hidden lg:block lg:w-[45%]">
        {/* Gradient overlay blending into left panel */}
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
            Compete.
            <br />
            Conquer.
            <br />
            <span className="text-[#E50914]">Get Ranked.</span>
          </h2>
          <p className="mt-4 text-sm leading-6 text-[#9CA3AF]">
            Build your team. Enter tournaments. Climb the leaderboard.
          </p>
        </div>
      </div>

      {/* ── Mobile background (subtle, behind the form) ── */}
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

export default Login;