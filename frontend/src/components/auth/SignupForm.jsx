import { useState } from "react";
import { Eye, EyeOff, Leaf } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import useAuth from "../../hooks/useAuth";
import { validateSignup } from "../../utils/authValidation";

export default function SignupForm() {
  const { signup, busy } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");
  function update(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    const next = validateSignup(form);
    setErrors(next);
    setNotice("");
    if (Object.keys(next).length) return;
    try {
      await signup({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        password: form.password,
        remember: true,
      });
      const destination = location.state?.from?.pathname;
      navigate(destination?.startsWith("/") ? destination : "/", {
        replace: true,
      });
    } catch (error) {
      setNotice(error.message || "Demo signup could not be completed.");
    }
  }

  return (
    <section className="w-full max-w-lg rounded-2xl border border-line bg-white p-6 shadow-soft sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="rounded-xl bg-forest p-2.5 text-white">
          <Leaf size={22} />
        </span>
        <div>
          <p className="text-sm font-bold">Plastic Pollution Analyzer</p>
          <p className="text-xs text-slate-500">Demo workspace</p>
        </div>
      </div>
      <h1 className="text-2xl font-semibold">Create a demo account</h1>
      <p className="mt-2 text-sm text-slate-500">
        Try the analysis workspace with a temporary demo session.
      </p>
      <form className="mt-6 space-y-4" onSubmit={submit} noValidate>
        <div>
          <label htmlFor="signup-name" className="field-label">
            Full name
          </label>
          <input
            id="signup-name"
            autoComplete="name"
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            className="w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-sage"
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-rose-700">{errors.fullName}</p>
          )}
        </div>
        <div>
          <label htmlFor="signup-email" className="field-label">
            Email address
          </label>
          <input
            id="signup-email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            className="w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-sage"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-rose-700">{errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="signup-password" className="field-label">
            Password
          </label>
          <div className="flex rounded-xl border border-line focus-within:border-sage">
            <input
              id="signup-password"
              type={visible ? "text" : "password"}
              autoComplete="new-password"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              aria-invalid={Boolean(errors.password)}
              className="min-w-0 flex-1 rounded-xl px-3 py-2.5 text-sm outline-none"
            />
            <button
              type="button"
              className="px-3 text-slate-500"
              aria-label={visible ? "Hide password" : "Show password"}
              onClick={() => setVisible(!visible)}
            >
              {visible ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            At least 8 characters, with uppercase, lowercase, and a number.
          </p>
          {errors.password && (
            <p className="mt-1 text-xs text-rose-700">{errors.password}</p>
          )}
        </div>
        <div>
          <label htmlFor="signup-confirm" className="field-label">
            Confirm password
          </label>
          <input
            id="signup-confirm"
            type={visible ? "text" : "password"}
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={(e) => update("confirmPassword", e.target.value)}
            aria-invalid={Boolean(errors.confirmPassword)}
            className="w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-sage"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-rose-700">
              {errors.confirmPassword}
            </p>
          )}
        </div>
        <div>
          <label className="flex items-start gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={form.terms}
              onChange={(e) => update("terms", e.target.checked)}
              className="mt-1 accent-forest"
            />
            <span>
              I agree to the demo terms and understand this does not create a
              real account.
            </span>
          </label>
          {errors.terms && (
            <p className="mt-1 text-xs text-rose-700">{errors.terms}</p>
          )}
        </div>
        {notice && (
          <p role="alert" className="text-sm text-rose-700">
            {notice}
          </p>
        )}
        <Button type="submit" className="w-full" loading={busy}>
          Create account
        </Button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-600">
        Already have a demo session?{" "}
        <Link to="/login" className="font-semibold text-forest hover:underline">
          Log in
        </Link>
      </p>
      <p className="mt-5 rounded-xl border border-[#e4eee7] bg-[#f7faf7] p-3 text-xs leading-5 text-slate-600">
        Demo only: no account or password is stored. Real registration and
        secure sessions require a backend.
      </p>
    </section>
  );
}
