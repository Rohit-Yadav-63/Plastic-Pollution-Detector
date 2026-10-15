const API_BASE_URL = (
  import.meta.env?.VITE_API_BASE_URL || "http://localhost:8000"
).replace(/\/+$/, "");
export async function apiRequest(path, options = {}) {
  let response;
  try {
    response = await fetch(
      API_BASE_URL + (path.startsWith("/") ? path : "/" + path),
      options,
    );
  } catch {
    throw new Error(
      "Could not reach the analysis service. Check the backend connection.",
    );
  }
  if (!response.ok) {
    let message = "Request failed (" + response.status + ")";
    try {
      const body = await response.json();
      message = body.detail || body.message || message;
    } catch {}
    throw new Error(message);
  }
  return response.json();
}
export { API_BASE_URL };
