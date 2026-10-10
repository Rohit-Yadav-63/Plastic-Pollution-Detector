import { Link } from "react-router-dom";
import EmptyState from "../common/EmptyState";
import SeverityBadge from "../analysis/SeverityBadge";
import { formatDate } from "../../utils/formatters";
export default function RecentAnalyses({analyses}){if(!analyses.length)return <EmptyState title="No analyses yet" description="Upload an image to create your first simulated analysis."/>;return <div className="divide-y divide-line">{analyses.slice(0,5).map(x=><Link key={x.id} to={"/results/"+x.id} className="flex justify-between gap-3 py-4"><span className="min-w-0"><b className="block truncate text-sm">{x.fileName}</b><small className="text-slate-400">{formatDate(x.analyzedAt)} · {x.detections.length} detections</small></span><SeverityBadge severity={x.severityLabel}/></Link>)}</div>}