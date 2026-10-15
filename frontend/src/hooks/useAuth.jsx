import { createContext, useContext, useState } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(authService.getCurrentUser);
  const [busy, setBusy] = useState(false);
  async function run(action) {
    setBusy(true);
    try {
      const nextUser = await action();
      setUser(nextUser);
      return nextUser;
    } finally {
      setBusy(false);
    }
  }
  const value = {
    user,
    busy,
    login: (credentials) => run(() => authService.login(credentials)),
    signup: (credentials) => run(() => authService.signup(credentials)),
    logout: async () => {
      await authService.logout();
      setUser(null);
    },
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
}
