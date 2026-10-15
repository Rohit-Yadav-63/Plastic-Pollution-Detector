import { useState } from "react";
import { Download, Printer } from "lucide-react";
import Button from "../common/Button";
import ImageMetadata from "./ImageMetadata";
import AnnotatedImage from "./AnnotatedImage";
import { downloadCsv } from "../../utils/reportGenerator";
import { CATEGORY_ORDER, canonicalCategory } from "../../utils/categories";
import { formatDate } from "../../utils/formatters";
function getCounts(analysis) {
  const counts = Object.fromEntries(CATEGORY_ORDER.map((x) => [x, 0]));
  Object.entries(analysis.categoryCounts || {}).forEach(
    ([k, v]) => (counts[canonicalCategory(k)] += v),
  );
  return counts;
}
function recommendations(counts) {
  const notes = [];
  if (counts["Plastic bottles"] || counts["Polyethylene carrier bags"])
    notes.push(
      "Illustrative recommendation: review bottle and bag collection points near the surveyed area.",
    );
  if (counts["Food & snack wrappers"] || counts["Expanded polystyrene (EPS)"])
    notes.push(
      "Illustrative recommendation: consider packaging waste controls and accessible disposal bins.",
    );
  if (counts["Fishing nets"])
    notes.push(
      "Illustrative recommendation: review fishing gear retrieval and reporting options.",
    );
  if (!notes.length)
    notes.push(
      "Illustrative recommendation: repeat the survey with representative images and verify findings in the field.",
    );
  return notes;
}
export default function SummaryReport({ analysis }) {
  const [includeExact, setIncludeExact] = useState(false),
    counts = getCounts(analysis),
    id = analysis.id || "demo-report";
  function print() {
    const clean = () => document.body.classList.remove("print-summary");
    document.body.classList.add("print-summary");
    window.addEventListener("afterprint", clean, { once: true });
    window.print();
    window.setTimeout(clean, 10000);
  }
  return (
    <section className="print-report panel mt-6 p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-forest">
            Plastic Pollution Analyzer
          </p>
          <h2 className="mt-1 text-xl font-semibold">Summary report</h2>
          <p className="mt-1 text-xs text-slate-500">
            Report ID: {id} Â· Generated {formatDate(new Date())}
          </p>
          <p className="mt-1 break-all text-xs text-slate-500">
            Image: {analysis.fileName}
          </p>
        </div>
        <div className="screen-only flex gap-2">
          <Button
            variant="secondary"
            onClick={() =>
              downloadCsv([analysis], { includeExactLocation: includeExact })
            }
          >
            <Download size={15} />
            Download CSV
          </Button>
          <Button onClick={print}>
            <Printer size={15} />
            Print report
          </Button>
        </div>
      </div>
      <label className="screen-only mt-4 flex items-start gap-2 rounded-xl bg-[#f7faf7] p-3 text-xs leading-5 text-slate-600">
        <input
          type="checkbox"
          checked={includeExact}
          onChange={(e) => setIncludeExact(e.target.checked)}
          className="mt-1 accent-forest"
        />
        <span>
          Include exact GPS coordinates in downloaded and printed reports. Leave
          unchecked to exclude them.
        </span>
      </label>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <ImageMetadata
          metadata={analysis.metadata || {}}
          fileName={analysis.fileName}
          analysisDate={analysis.analyzedAt}
          previewDataUrl={analysis.previewDataUrl}
          includeExactLocation={includeExact}
        />
        <section className="panel p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-forest">
            Illustrative demo output
          </p>
          <h3 className="mt-1 text-base font-semibold">
            Pollution analysis summary
          </h3>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-[#f7faf7] p-3">
              <small className="text-slate-500">Sample items</small>
              <b className="mt-1 block text-xl">
                {analysis.detections?.length || 0}
              </b>
            </div>
            <div className="rounded-xl bg-[#f7faf7] p-3">
              <small className="text-slate-500">Demo score</small>
              <b className="mt-1 block text-xl">{analysis.severityScore}/100</b>
            </div>
            <div className="rounded-xl bg-[#f7faf7] p-3">
              <small className="text-slate-500">Severity</small>
              <b className="mt-1 block text-xl">{analysis.severityLabel}</b>
            </div>
          </div>
          <h4 className="mt-5 text-sm font-semibold">Category breakdown</h4>
          <div className="mt-2 divide-y divide-line">
            {CATEGORY_ORDER.map((name) => (
              <div key={name} className="flex justify-between py-2 text-xs">
                <span>{name}</span>
                <b>{counts[name]}</b>
              </div>
            ))}
          </div>
          <h4 className="mt-5 text-sm font-semibold">
            Sample detection confidence
          </h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {(analysis.detections || []).map((d, i) => (
              <span
                key={d.id || i}
                className="rounded-full bg-[#f3f7f4] px-2.5 py-1 text-xs text-slate-600"
              >
                {d.category} Â· {Math.round(d.confidence * 100)}%
              </span>
            ))}
          </div>
        </section>
      </div>
      <section className="mt-5">
        <h3 className="section-title">Illustrative annotated preview</h3>
        <p className="mb-3 mt-1 text-xs text-slate-500">
          Boxes and labels are simulated and are not verified detections.
        </p>
        <AnnotatedImage analysis={analysis} />
      </section>
      <section className="mt-5 rounded-xl bg-[#f7faf7] p-4">
        <h3 className="text-sm font-semibold">
          Summary and illustrative recommendations
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          This demo run generated {analysis.detections?.length || 0} sample
          detections, with{" "}
          {String(analysis.severityLabel || "unknown").toLowerCase()}{" "}
          illustrative severity. These values do not represent verified
          environmental measurements.
        </p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-xs leading-5 text-slate-600">
          {recommendations(counts).map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </section>
    </section>
  );
}
