import { apiRequest } from "./apiClient";
import { generateDemoAnalysis } from "../utils/demoAnalysis";

// Keep demo mode enabled until matching backend endpoints are available.
const USE_MOCK_ANALYSIS = true;

function normalizeApiResult(result, file, metadata, previewDataUrl) {
  const detections = result.detections || [];
  const categoryCounts =
    result.categoryCounts ||
    detections.reduce((counts, item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
      return counts;
    }, {});
  return {
    ...result,
    id: result.id || crypto.randomUUID?.() || "analysis-" + Date.now(),
    fileName: result.fileName || file.name,
    analyzedAt: result.analyzedAt || new Date().toISOString(),
    mode: "api",
    isSimulated: false,
    detections,
    categoryCounts,
    averageConfidence:
      result.averageConfidence ??
      (detections.length
        ? detections.reduce((sum, item) => sum + item.confidence, 0) /
          detections.length
        : 0),
    metadata,
    previewDataUrl,
  };
}

async function analyzeWithBackend(file, metadata, previewDataUrl) {
  const form = new FormData();
  form.append("file", file);
  return normalizeApiResult(
    await apiRequest("/api/analyze", { method: "POST", body: form }),
    file,
    metadata,
    previewDataUrl,
  );
}

export async function analyzeImage(file, metadata, previewDataUrl) {
  if (USE_MOCK_ANALYSIS) {
    await new Promise((resolve) => window.setTimeout(resolve, 650));
    return generateDemoAnalysis(file, previewDataUrl, metadata);
  }
  return analyzeWithBackend(file, metadata, previewDataUrl);
}
