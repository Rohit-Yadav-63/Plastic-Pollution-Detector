import { useState } from "react";
import { Eye, EyeOff, Leaf } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import useAuth from "../../hooks/useAuth";
import { validateLogin } from "../../utils/authValidation";

export default function LoginForm() {
  const { login, busy } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");

  async function submit(event) {
    event.preventDefault();
    const next = validateLogin(email, password);
    setErrors(next);
    setNotice("");
    if (Object.keys(next).length) return;
    try {
      await login({ email: email.trim(), password, remember });
      const destination = location.state?.from?.pathname;
      navigate(destination?.startsWith("/") ? destination : "/", { replace: true });
    } catch (error) {
      setNotice(error.message || "Sign in could not be completed.");
    }
  }

  return (
    <section className="w-full max-w-md rounded-2xl border border-line bg-white p-6 shadow-soft sm:p-8">
      <div className="mb-6 flex items-center gap-3"><span className="rounded-xl bg-forest p-2.5 text-white"><Leaf size={22}/></span><div><p className="text-sm font-bold">Plastic Pollution Analyzer</p><p className="text-xs text-slate-500">Demo workspace</p></div></div>
      <h1 className="text-2xl font-semibold">Welcome back</h1>
      <p className="mt-2 text-sm text-slate-500">Sign in to continue to your analysis workspace.</p>
      <form className="mt-6 space-y-4" onSubmit={submit} noValidate>
        <div><label className="field-label" htmlFor="login-email">Email address</label><input id="login-email" type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email?"login-email-error":undefined} className="w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"/>{errors.email&&<p id="login-email-error" className="mt-1 text-xs text-rose-700">{errors.email}</p>}</div>
        <div><label className="field-label" htmlFor="login-password">Password</label><div className="flex rounded-xl border border-line focus-within:border-sage focus-within:ring-2 focus-within:ring-sage/20"><input id="login-password" type={visible?"text":"password"} autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} aria-invalid={Boolean(errors.password)} className="min-w-0 flex-1 rounded-xl px-3 py-2.5 text-sm outline-none"/><button type="button" className="px-3 text-slate-500" aria-label={visible?"Hide password":"Show password"} onClick={()=>setVisible(!visible)}>{visible?<EyeOff size={17}/>:<Eye size={17}/>}</button></div>{errors.password&&<p className="mt-1 text-xs text-rose-700">{errors.password}</p>}</div>
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm"><label className="flex items-center gap-2 text-slate-600"><input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} className="accent-forest"/>Remember me</label><button type="button" className="font-medium text-forest hover:underline" onClick={()=>setNotice("Password reset requires a backend and is unavailable in this demo.")}>Forgot password?</button></div>
        {notice&&<p role="status" className="rounded-lg bg-[#f5faf6] p-3 text-xs leading-5 text-slate-600">{notice}</p>}
        <Button type="submit" className="w-full" loading={busy}>Log in</Button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-600">New here? <Link to="/signup" className="font-semibold text-forest hover:underline">Create an account</Link></p>
      <p className="mt-5 rounded-xl border border-[#e4eee7] bg-[#f7faf7] p-3 text-xs leading-5 text-slate-600">Frontend demo only: any valid email and non-empty password starts a temporary demo session. No password is saved or verified.</p>
    </section>
  );
}
