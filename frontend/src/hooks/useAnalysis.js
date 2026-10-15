import { useState } from "react";
import { analyzeImage } from "../services/analysisService";
export default function useAnalysis() {
  const [loading, setLoading] = useState(false),
    [result, setResult] = useState(null),
    [error, setError] = useState("");
  async function analyze(file, metadata, preview) {
    setLoading(true);
    setError("");
    try {
      const value = await analyzeImage(file, metadata, preview);
      setResult(value);
      return value;
    } catch (e) {
      setError(e.message || "Analysis failed");
      return null;
    } finally {
      setLoading(false);
    }
  }
  function reset() {
    setResult(null);
    setError("");
  }
  return { loading, result, error, analyze, reset };
}
