import { apiRequest } from "./apiClient";
import { generateDemoAnalysis } from "../utils/demoAnalysis";
// Switch this flag when POST /api/analyze is available.
const USE_MOCK_ANALYSIS=true;
async function analyzeWithBackend(file){const body=new FormData();body.append("file",file);return apiRequest("/api/analyze",{method:"POST",body})}
export async function analyzeImage(file,preview){if(USE_MOCK_ANALYSIS){await new Promise(r=>window.setTimeout(r,700));return generateDemoAnalysis(file,preview)}return analyzeWithBackend(file)}