import {
  BarChart3,
  BookOpen,
  Camera,
  Clock3,
  Leaf,
  Settings2,
} from "lucide-react";
import { NavLink } from "react-router-dom";
const links = [
  ["/", "Dashboard", BarChart3, true],
  ["/analyze", "Analyze image", Camera],
  ["/history", "Analysis history", Clock3],
  ["/about", "About project", BookOpen],
  ["/settings", "Settings", Settings2],
];
export default function Sidebar({ onNavigate }) {
  return (
    <aside className="flex h-full flex-col border-r border-line bg-white px-4 py-5">
      <NavLink to="/" className="mb-8 flex items-center gap-3 px-2">
        <span className="rounded-xl bg-forest p-2.5 text-white">
          <Leaf size={21} />
        </span>
        <span>
          <b className="block text-sm">EcoVision</b>
          <small className="text-slate-500">Plastic Analyzer</small>
        </span>
      </NavLink>
      <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
        Workspace
      </p>
      <nav className="space-y-1">
        {links.map(([to, label, Icon, end]) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm " +
              (isActive
                ? "bg-[#eef5f1] font-semibold text-forest"
                : "text-slate-600 hover:bg-slate-50")
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
      <p className="mt-auto rounded-2xl border border-[#e0ece5] bg-[#f6faf7] p-4 text-xs leading-5 text-slate-500">
        Demo workspace · all image analysis is simulated.
      </p>
    </aside>
  );
}
