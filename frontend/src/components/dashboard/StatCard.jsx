export default function StatCard({
  label,
  value,
  detail,
  icon: Icon,
  accent = "#245C45",
}) {
  return (
    <article className="panel min-h-[122px] p-4 sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
            {label}
          </p>
          <div className="mt-2 flex items-baseline gap-1.5">
            <p
              className="text-3xl font-semibold leading-none"
              style={{ color: accent }}
            >
              {value}
            </p>
            <span className="text-[10px] text-slate-500">items</span>
          </div>
        </div>
        <span className="rounded-lg bg-[#eef5f1] p-2 text-forest">
          <Icon size={17} />
        </span>
      </div>
      <p className="mt-2 text-[11px] leading-4 text-slate-500">{detail}</p>
    </article>
  );
}
