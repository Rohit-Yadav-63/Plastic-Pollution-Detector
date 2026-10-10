const categories = ["Bottle", "Food wrapper", "Fishing line", "Fragment", "Bag", "Straw", "EPS"];

export function generateDemoAnalysis(file, previewDataUrl = "", metadata = {}) {
  const seed = ((file?.size || 173) + (file?.name?.length || 7) * 31) % 997;
  const count = 3 + (seed % 4);
  const detections = Array.from({ length: count }, (_, i) => {
    const width = 0.14 + ((seed + i * 17) % 15) / 100;
    const height = 0.12 + ((seed + i * 11) % 17) / 100;
    return {
      id: "demo-detection-" + i,
      category: categories[(seed + i * 3) % categories.length],
      confidence: Number((0.68 + ((seed + i * 13) % 30) / 100).toFixed(2)),
      box: {
        x: Math.min(0.06 + ((seed + i * 23) % 68) / 100, 0.9 - width),
        y: Math.min(0.08 + ((seed + i * 19) % 62) / 100, 0.88 - height),
        width,
        height,
      },
    };
  });
  const categoryCounts = detections.reduce((counts, item) => {
    counts[item.category] = (counts[item.category] || 0) + 1;
    return counts;
  }, {});
  const averageConfidence = detections.reduce((sum, item) => sum + item.confidence, 0) / count;
  const severityScore = Math.min(94, 18 + count * 11 + (seed % 20));
  return {
    id: "demo-" + (crypto.randomUUID?.() || Date.now()),
    fileName: file.name,
    analyzedAt: new Date().toISOString(),
    mode: "simulated",
    isSimulated: true,
    severityScore,
    severityLabel: severityScore >= 68 ? "High" : severityScore >= 42 ? "Medium" : "Low",
    averageConfidence: Number(averageConfidence.toFixed(2)),
    detections,
    categoryCounts,
    metadata,
    previewDataUrl,
  };
}
