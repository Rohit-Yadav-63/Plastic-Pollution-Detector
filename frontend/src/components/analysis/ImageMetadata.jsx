import { FileImage, Clock3, HardDrive, Ruler } from "lucide-react";
import { formatDate } from "../../utils/formatters";
import LocationDisplay from "./LocationDisplay";
function prettySize(bytes) {
  if (!Number.isFinite(bytes)) return "Unavailable";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1048576).toFixed(2) + " MB";
}
export default function ImageMetadata({
  metadata = {},
  fileName,
  analysisDate,
  previewDataUrl,
  includeExactLocation = true,
}) {
  return (
    <section className="panel p-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-forest">
          Image information
        </p>
        <h2 className="section-title mt-1">Photo metadata</h2>
        <p className="mt-1 text-xs text-slate-500">
          File details and embedded photo metadata are shown separately from
          demo model output.
        </p>
      </div>
      {previewDataUrl && (
        <figure className="mt-4">
          <img
            src={previewDataUrl}
            alt="Original uploaded image preview"
            className="max-h-56 w-full rounded-xl border border-line bg-slate-50 object-contain"
          />
          <figcaption className="mt-1 text-[11px] text-slate-500">
            Original uploaded image preview
          </figcaption>
        </figure>
      )}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="flex gap-2">
          <FileImage size={16} className="mt-0.5 text-forest" />
          <div>
            <p className="text-xs font-medium text-slate-500">
              Uploaded image filename
            </p>
            <p className="mt-1 break-all text-sm">
              {metadata.fileName || fileName || "Unavailable"}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <HardDrive size={16} className="mt-0.5 text-forest" />
          <div>
            <p className="text-xs font-medium text-slate-500">File size</p>
            <p className="text-sm mt-1">{prettySize(metadata.fileSizeBytes)}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Ruler size={16} className="mt-0.5 text-forest" />
          <div>
            <p className="text-xs font-medium text-slate-500">
              Image dimensions
            </p>
            <p className="mt-1 text-sm">
              {metadata.width && metadata.height
                ? metadata.width + " × " + metadata.height + " px"
                : "Unavailable"}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Clock3 size={16} className="mt-0.5 text-forest" />
          <div>
            <p className="text-xs font-medium text-slate-500">
              Photo captured on
            </p>
            <p className="mt-1 text-sm">
              {metadata.photoCaptureDate
                ? formatDate(metadata.photoCaptureDate)
                : "Capture date and time unavailable"}
            </p>
          </div>
        </div>
        <div className="flex gap-2 sm:col-span-2">
          <Clock3 size={16} className="mt-0.5 text-forest" />
          <div>
            <p className="text-xs font-medium text-slate-500">
              Analysis date and time
            </p>
            <p className="mt-1 text-sm">
              {analysisDate ? formatDate(analysisDate) : "Unavailable"}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 border-t border-line pt-4">
        <p className="mb-3 text-xs font-semibold text-slate-700">
          Location information
        </p>
        <LocationDisplay
          metadata={metadata}
          includeExact={includeExactLocation}
        />
      </div>
    </section>
  );
}
