import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { me } from "../api/auth";
import type { User } from "../types";
import { STORAGE_KEYS } from "../constants";
import { AuthContext } from "./useAuth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    sessionStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
  );
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(
    () => sessionStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) !== null,
  );

  useEffect(() => {
    if (!token) return;

    let active = true;
    me()
      .then((nextUser) => {
        if (active) setUser(nextUser);
      })
      .catch(() => {
        if (!active) return;
        sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        setToken(null);
        setUser(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [token]);

  function login(nextToken: string, nextUser: User) {
    sessionStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, nextToken);
    setToken(nextToken);
    setUser(nextUser);
    setLoading(false);
  }

  function updateUser(nextUser: User) {
    setUser(nextUser);
  }

  function logout() {
    sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
