import { ShieldCheck } from "lucide-react";
function MapLink({ location }) {
  const href =
    "https://www.openstreetmap.org/?mlat=" +
    encodeURIComponent(location.latitude) +
    "&mlon=" +
    encodeURIComponent(location.longitude) +
    "#map=16/" +
    location.latitude +
    "/" +
    location.longitude;
  return (
    <a
      className="text-forest underline"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      Open map
    </a>
  );
}
function Coordinates({ value, includeExact }) {
  if (!value) return null;
  return (
    <p className="mt-1 text-xs text-slate-600">
      {includeExact ? (
        <>
          Lat {value.latitude.toFixed(5)}, Lon {value.longitude.toFixed(5)} ·{" "}
          <MapLink location={value} />
        </>
      ) : (
        "Exact coordinates are available in this session."
      )}
    </p>
  );
}
export default function LocationDisplay({
  metadata = {},
  includeExact = false,
}) {
  const photo = metadata.photoGps,
    current = metadata.currentDeviceLocation;
  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-medium text-slate-500">
          Photo GPS location (EXIF)
        </p>
        {photo ? (
          <Coordinates value={photo} includeExact={includeExact} />
        ) : metadata.photoGpsOmittedForPrivacy ? (
          <p className="mt-1 text-xs text-slate-600">
            Coordinates were omitted from browser history for privacy.
          </p>
        ) : (
          <p className="mt-1 text-xs text-slate-600">
            Location metadata is unavailable for this photograph.
          </p>
        )}
      </div>
      {metadata.manualLocationName && (
        <div>
          <p className="text-xs font-medium text-slate-500">
            Manually entered location
          </p>
          <p className="mt-1 text-xs text-slate-700">
            {metadata.manualLocationName}
          </p>
        </div>
      )}
      <div>
        <p className="text-xs font-medium text-slate-500">
          Current device location
        </p>
        {current ? (
          <Coordinates value={current} includeExact={includeExact} />
        ) : metadata.currentDeviceLocationOmittedForPrivacy ? (
          <p className="mt-1 text-xs text-slate-600">
            Coordinates were omitted from browser history for privacy.
          </p>
        ) : (
          <p className="mt-1 text-xs text-slate-600">
            Not requested for this analysis.
          </p>
        )}
      </div>
      <p className="flex items-start gap-1.5 text-[11px] leading-4 text-slate-500">
        <ShieldCheck size={14} className="mt-0.5 shrink-0" />
        EXIF coordinates describe metadata embedded in the file; they do not
        verify where or when the photo was taken.
      </p>
    </div>
  );
}
