import {Download,FileImage} from "lucide-react";
import {Link,useLocation,useParams} from "react-router-dom";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import AnnotatedImage from "../components/analysis/AnnotatedImage";
import ResultsPanel from "../components/analysis/ResultsPanel";
import {getAnalyses} from "../utils/storage";
import {downloadCsv} from "../utils/reportGenerator";
import {formatDate} from "../utils/formatters";
export default function AnalysisResults(){const{id}=useParams(),location=useLocation(),analysis=location.state?.analysis||getAnalyses().find(x=>x.id===id);if(!analysis)return <EmptyState icon={FileImage} title="Analysis not found" description="This result may have been removed from browser history." action={<Link to="/analyze"><Button>Analyze an image</Button></Link>}/>;return <div><div className="flex flex-wrap items-end justify-between gap-4"><div><Link to="/analyze" className="text-sm font-medium text-forest">← New analysis</Link><h2 className="page-title mt-2">Analysis results</h2><p className="page-subtitle">{analysis.fileName} · {formatDate(analysis.analyzedAt)} · Simulated output</p></div><Button variant="secondary" onClick={()=>downloadCsv([analysis])}><Download size={16}/>Download CSV</Button></div><div className="mt-6 grid items-start gap-6 xl:grid-cols-[1.1fr_.9fr]"><section><h3 className="mb-3 text-sm font-semibold">Uploaded image and sample boxes</h3><AnnotatedImage analysis={analysis}/></section><ResultsPanel analysis={analysis}/></div></div>}