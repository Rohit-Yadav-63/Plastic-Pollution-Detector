import { useState } from "react";
import { Database, Check } from "lucide-react";
import Button from "../components/common/Button";

export default function Settings() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="max-w-3xl">
      <h2 className="page-title">Settings</h2>
      <p className="page-subtitle">
        Frontend demo preferences and data behavior.
      </p>

      <section className="panel mt-6 flex gap-4 p-5">
        <Database className="text-forest" />
        <div>
          <h3 className="font-semibold">Local data</h3>
          <p className="mt-1 text-sm text-slate-500">
            Analysis history is stored only in this browser. Uploaded files are
            not sent to a server.
          </p>
        </div>
      </section>

      <div className="mt-5 flex items-center gap-3">
        <Button onClick={() => setSaved(true)}>Save preferences</Button>
        {saved && (
          <span className="flex items-center gap-1 text-sm text-forest">
            <Check size={15} />
            Saved
          </span>
        )}
      </div>
    </div>
  );
}
