import { createContext, useContext } from "react";
import type { User } from "../types";

export type AuthState = {
  user: User | null;
  loading: boolean;
  login: (token: string, user: User) => void;
  updateUser: (user: User) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthState | null>(null);

export function useAuth(): AuthState {
  const state = useContext(AuthContext);
  if (!state) throw new Error("useAuth must be used within AuthProvider");
  return state;
}
