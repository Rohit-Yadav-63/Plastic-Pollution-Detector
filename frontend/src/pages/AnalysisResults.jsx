import { FileImage } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import AnnotatedImage from "../components/analysis/AnnotatedImage";
import ImageMetadata from "../components/analysis/ImageMetadata";
import ResultsPanel from "../components/analysis/ResultsPanel";
import SummaryReport from "../components/analysis/SummaryReport";
import { getAnalyses } from "../utils/storage";
import { formatDate } from "../utils/formatters";
export default function AnalysisResults(){const{id}=useParams(),location=useLocation(),analysis=location.state?.analysis||getAnalyses().find(x=>x.id===id);if(!analysis)return <EmptyState icon={FileImage} title="Analysis not found" description="This result may have been removed from browser history." action={<Link to="/analyze"><Button>Analyze an image</Button></Link>}/>;return <div><div className="flex flex-wrap items-end justify-between gap-4"><div><Link to="/analyze" className="text-sm font-medium text-forest">â† New analysis</Link><h2 className="page-title mt-2">Analysis results</h2><p className="page-subtitle">{analysis.fileName} Â· {formatDate(analysis.analyzedAt)} Â· {analysis.isSimulated?"Simulated output":"API output"}</p></div></div><div className="mt-6"><ImageMetadata metadata={analysis.metadata||{}} fileName={analysis.fileName} analysisDate={analysis.analyzedAt} previewDataUrl={analysis.previewDataUrl}/></div><div className="mt-6 grid items-start gap-6 xl:grid-cols-[1.1fr_.9fr]"><section><h3 className="mb-3 text-sm font-semibold">Computer vision results (demo)</h3><AnnotatedImage analysis={analysis}/></section><ResultsPanel analysis={analysis}/></div><SummaryReport analysis={analysis}/></div>}
