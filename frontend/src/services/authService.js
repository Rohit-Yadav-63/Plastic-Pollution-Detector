import { apiRequest } from "./apiClient.js";
const USE_DEMO_AUTH = true;
const LOCAL_SESSION = "plastic-pollution-analyzer.demo-user";
const TAB_SESSION = "plastic-pollution-analyzer.demo-tab-user";
function readStoredUser() {
  try {
    const raw =
      localStorage.getItem(LOCAL_SESSION) ||
      sessionStorage.getItem(TAB_SESSION);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function storeDemoUser(user, remember) {
  localStorage.removeItem(LOCAL_SESSION);
  sessionStorage.removeItem(TAB_SESSION);
  (remember ? localStorage : sessionStorage).setItem(
    remember ? LOCAL_SESSION : TAB_SESSION,
    JSON.stringify(user),
  );
}
export function getCurrentUser() {
  return readStoredUser();
}
export async function login({ email, password, remember = false }) {
  if (!USE_DEMO_AUTH) {
    const response = await apiRequest("/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return response.user;
  }
  void password;
  await new Promise((resolve) => window.setTimeout(resolve, 350));
  const user = {
    id: "demo-user",
    fullName: email.split("@")[0],
    email,
    isDemo: true,
  };
  storeDemoUser(user, remember);
  return user;
}
export async function signup({ fullName, email, password, remember = true }) {
  if (!USE_DEMO_AUTH) {
    const response = await apiRequest("/api/auth/signup", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, password }),
    });
    return response.user;
  }
  void password;
  await new Promise((resolve) => window.setTimeout(resolve, 350));
  const user = { id: "demo-user", fullName, email, isDemo: true };
  storeDemoUser(user, remember);
  return user;
}
export async function logout() {
  if (!USE_DEMO_AUTH)
    await apiRequest("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  localStorage.removeItem(LOCAL_SESSION);
  sessionStorage.removeItem(TAB_SESSION);
}
