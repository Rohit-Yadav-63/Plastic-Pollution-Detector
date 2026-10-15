import { Link } from "react-router-dom";
import EmptyState from "../common/EmptyState";
import SeverityBadge from "../analysis/SeverityBadge";
import { formatDate } from "../../utils/formatters";

export default function RecentAnalyses({ analyses }) {
  if (!analyses.length)
    return (
      <EmptyState
        title="No saved analyses yet"
        description="Upload an image to create your first local demo result."
      />
    );

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[620px] text-left">
        <thead className="text-[10px] uppercase tracking-wide text-slate-400">
          <tr>
            {["Image", "Analyzed", "Items", "Severity", "Location"].map((x) => (
              <th key={x} className="pb-3 pr-4 font-medium">
                {x}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {analyses.slice(0, 5).map((x) => (
            <tr key={x.id}>
              <td className="py-3 pr-4">
                <Link
                  to={"/results/" + x.id}
                  state={{ analysis: x }}
                  className="block max-w-[220px] truncate text-xs font-semibold text-forest hover:underline"
                >
                  {x.fileName}
                </Link>
              </td>
              <td className="whitespace-nowrap py-3 pr-4 text-xs text-slate-500">
                {formatDate(x.analyzedAt)}
              </td>
              <td className="py-3 pr-4 text-xs">{x.detections?.length || 0}</td>
              <td className="py-3 pr-4">
                <SeverityBadge severity={x.severityLabel} />
              </td>
              <td className="py-3 text-xs text-slate-500">
                {x.metadata?.manualLocationName ||
                  (x.metadata?.photoGpsAvailable ||
                  x.metadata?.currentDeviceLocationAvailable
                    ? "GPS available"
                    : "Not available")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
