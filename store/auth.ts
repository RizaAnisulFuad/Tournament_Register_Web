import { create } from "zustand";

interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  setToken: (token: string | null) => {
    if (typeof window !== "undefined") {
      if (token === null) {
        localStorage.removeItem("token");
      } else {
        localStorage.setItem("token", token);
      }
    }
    set({ token });
  },
}));
