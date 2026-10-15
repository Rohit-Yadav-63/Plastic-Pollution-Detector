import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { CATEGORY_COLORS, CATEGORY_ORDER } from "../../utils/categories";

export default function DetectionChart({ data, total }) {
  const items = CATEGORY_ORDER.map((name, i) => ({
    name,
    count: data[name] || 0,
    color: CATEGORY_COLORS[i],
  })).filter((x) => x.count > 0);

  if (!items.length || !total)
    return (
      <div className="grid h-[250px] place-items-center text-sm text-slate-400">
        Run a demo analysis to see category totals.
      </div>
    );

  return (
    <div>
      <div className="relative mx-auto h-[230px] max-w-[260px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={items}
              dataKey="count"
              nameKey="name"
              innerRadius={68}
              outerRadius={102}
              paddingAngle={2}
              stroke="none"
            >
              {items.map((x) => (
                <Cell key={x.name} fill={x.color} />
              ))}
            </Pie>
            <Tooltip formatter={(v, name) => [v + " items", name]} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 grid place-content-center text-center">
          <b className="text-3xl font-semibold text-forest">{total}</b>
          <span className="text-[10px] font-medium uppercase tracking-wide text-slate-500">
            sample items
          </span>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-2">
        {items.map((x) => (
          <span
            key={x.name}
            className="flex items-center gap-1.5 text-[11px] text-slate-500"
          >
            <i
              className="h-2 w-2 rounded-full"
              style={{ background: x.color }}
            />
            {x.name
              .replace("Polyethylene carrier bags", "Bags")
              .replace("Plastic bottles", "Bottles")
              .replace("Food & snack wrappers", "Wrappers")}
            : {Math.round((x.count / total) * 100)}%
          </span>
        ))}
      </div>
    </div>
  );
}
