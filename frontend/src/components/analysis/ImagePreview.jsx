import { useEffect, useState } from "react";
export default function ImagePreview({ file, onRemove }) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (!file) return;
    const u = URL.createObjectURL(file);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [file]);
  if (!file || !url) return null;
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-slate-50">
      <img
        src={url}
        alt={"Preview of " + file.name}
        className="max-h-[420px] w-full object-contain"
      />
      <div className="flex justify-between bg-white p-3 text-sm">
        <span className="truncate">{file.name}</span>
        <button onClick={onRemove} className="text-forest">
          Remove
        </button>
      </div>
    </div>
  );
}
