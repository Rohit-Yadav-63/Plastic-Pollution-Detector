import { LoaderCircle } from "lucide-react";
export default function Button({
  children,
  variant = "primary",
  loading = false,
  className = "",
  ...props
}) {
  const s = {
    primary: "bg-forest text-white hover:bg-[#1c4b38]",
    secondary: "border border-line bg-white text-ink hover:bg-slate-50",
    danger: "bg-rose-600 text-white",
  };
  return (
    <button
      className={
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold disabled:opacity-50 " +
        (s[variant] || s.primary) +
        " " +
        className
      }
      disabled={props.disabled || loading}
      {...props}
    >
      {loading && <LoaderCircle size={16} className="animate-spin" />}
      {children}
    </button>
  );
}
