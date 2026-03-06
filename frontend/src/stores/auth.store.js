import { create } from "zustand";
import { login, logout, getMe } from "../features/auth/services/auth.api";

export const useLoginStore = create((set, get) => ({
    user: null,
    loading: false,
    error: null,

    // Derived state
    isLoggedIn: () => !!get().user,

    login: async (userData) => {
        try {
            set({ loading: true, error: null });

            const response = await login(userData);

            // console.log(response.data.user);

            if (response?.data?.success) {
                // Assuming backend sends user data
                set({ user: response.data.user, loading: false });
            }

        } catch (err) {
            set({
                error: err.response?.data?.message || "Login failed",
                loading: false,
            });
        }
    },

    logout: async () => {
        try {
            await logout();
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            set({ user: null });
        }
    },

    // User Token sync function
    checkAuth: async () => {
        try {
            set({ loading: true });

            const response = await getMe(); // call /me endpoint

            if (response?.success) {
                set({ user: response.user, loading: false });
            } else {
                set({ user: null, loading: false });
            }
        } catch (err) {
            set({
                error: err?.message || "Login failed",
                user: null,
                loading: false
            });
        }
    },
}));