import {
  Camera,
  Image,
  MapPin,
  Package,
  Recycle,
  ShoppingBag,
  TriangleAlert,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import Button from "../components/common/Button";
import StatCard from "../components/dashboard/StatCard";
import DetectionChart from "../components/dashboard/DetectionChart";
import CategoryBreakdown from "../components/dashboard/CategoryBreakdown";
import RecentAnalyses from "../components/dashboard/RecentAnalyses";
import { getAnalyses, clearHistory } from "../utils/storage";
import { demoCategoryData } from "../data/demoData";
import { countsFor, CATEGORY_ORDER } from "../utils/categories";
import { formatDate } from "../utils/formatters";

export default function Dashboard() {
  const [analyses, setAnalyses] = useState(getAnalyses),
    example = !analyses.length,
    chart = useMemo(
      () =>
        example
          ? Object.fromEntries(demoCategoryData.map((x) => [x.name, x.count]))
          : countsFor(analyses),
      [analyses, example],
    ),
    total = Object.values(chart).reduce((n, x) => n + x, 0),
    bottles = chart[CATEGORY_ORDER[0]] || 0,
    bags = chart[CATEGORY_ORDER[1]] || 0,
    other = Math.max(0, total - bottles - bags),
    highCount = analyses.filter((x) => x.severityLabel === "High").length,
    geoCount = analyses.filter(
      (x) =>
        x.metadata?.photoGpsAvailable ||
        x.metadata?.currentDeviceLocationAvailable,
    ).length,
    mostCommon =
      Object.entries(chart).sort((a, b) => b[1] - a[1])[0]?.[0] || "—",
    share = (x) => (total ? Math.round((x / total) * 1000) / 10 : 0);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-forest">
            Environmental analytics workspace
          </p>
          <h2 className="page-title mt-2">Plastic material overview</h2>
          <p className="page-subtitle">
            Review sample material distribution and locally saved image
            analyses.
          </p>
        </div>
        <Link to="/analyze">
          <Button>
            <Camera size={16} />
            Analyze an image
          </Button>
        </Link>
      </div>

      {example && (
        <p className="mt-5 rounded-xl border border-[#e4eee7] bg-[#f6faf7] px-4 py-2.5 text-xs text-slate-600">
          Illustrative dashboard sample · 38 example items · not measured
          environmental data
        </p>
      )}

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total plastics"
          value={total}
          detail={
            example
              ? "Illustrative sample · all categories"
              : analyses.length + " saved demo analyses"
          }
          icon={Recycle}
        />
        <StatCard
          label="Bottles"
          value={bottles}
          detail={share(bottles) + "% of sample items"}
          icon={Package}
        />
        <StatCard
          label="Bags"
          value={bags}
          detail={share(bags) + "% of sample items"}
          icon={ShoppingBag}
        />
        <StatCard
          label="Other plastics"
          value={other}
          detail={share(other) + "% · wrappers, straws and more"}
          icon={Package}
        />
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <section className="panel p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-widest text-slate-500">
                Categorical breakdown
              </p>
              <h3 className="section-title mt-1">Material prevalence</h3>
            </div>
            <span className="text-lg font-semibold text-forest">▮</span>
          </div>
          <div className="mt-5">
            <CategoryBreakdown data={chart} total={total} />
          </div>
        </section>

        <section className="panel p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-widest text-slate-500">
                Composition
              </p>
              <h3 className="section-title mt-1">Plastic category share</h3>
            </div>
            <span className="text-lg font-semibold text-forest">◉</span>
          </div>
          <div className="mt-2">
            <DetectionChart data={chart} total={total} />
          </div>
        </section>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <article className="panel flex items-center gap-3 p-4">
          <Image size={18} className="text-forest" />
          <div>
            <p className="text-[10px] uppercase text-slate-500">
              Images analyzed
            </p>
            <b className="text-sm">{analyses.length}</b>
          </div>
        </article>

        <article className="panel flex items-center gap-3 p-4">
          <TriangleAlert size={18} className="text-forest" />
          <div>
            <p className="text-[10px] uppercase text-slate-500">
              High severity cases
            </p>
            <b className="text-sm">{highCount}</b>
          </div>
        </article>

        <article className="panel flex items-center gap-3 p-4">
          <MapPin size={18} className="text-forest" />
          <div>
            <p className="text-[10px] uppercase text-slate-500">
              Geotagged images
            </p>
            <b className="text-sm">{geoCount}</b>
          </div>
        </article>

        <article className="panel flex items-center gap-3 p-4">
          <Recycle size={18} className="text-forest" />
          <div>
            <p className="text-[10px] uppercase text-slate-500">
              Most common category
            </p>
            <b className="text-sm">{mostCommon}</b>
          </div>
        </article>
      </div>

      <section className="panel mt-5 p-5">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-widest text-slate-500">
              Workspace activity
            </p>
            <h3 className="section-title mt-1">Recent image analyses</h3>
            <p className="mt-1 text-xs text-slate-500">
              Location names and availability are shown; exact coordinates stay
              hidden.
            </p>
          </div>
          <Link
            to="/history"
            className="text-xs font-semibold text-forest hover:underline"
          >
            View history
          </Link>
        </div>
        <RecentAnalyses analyses={analyses} />
      </section>

      {analyses.length > 0 && (
        <div className="mt-4 flex items-center justify-between rounded-xl bg-[#f7faf7] p-4 text-sm">
          <span className="text-slate-600">
            Analysis history is stored in this browser; exact coordinates are
            removed.
          </span>
          <Button
            variant="secondary"
            onClick={() => {
              clearHistory();
              setAnalyses([]);
            }}
          >
            Clear history
          </Button>
        </div>
      )}
    </div>
  );
}
