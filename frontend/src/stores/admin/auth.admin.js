import { create } from "zustand";
import { adminLogin, adminLogout, getAdmin } from "../../features/auth/services/admin.api";

export const useAuthStore = create((set, get) => ({
    user: null,
    role: null,
    loading: false,
    error: null,
    message: null,

    isLoggedIn: () => !!get().user,

    login: async (userData) => {
        try {
            set({ loading: true, error: null });

            const response = await adminLogin(userData);

            if (response?.success) {
                // Assuming backend sends user data and role
                set({ user: response.user, role: response.user?.role, loading: false, error: null, message: response?.message });
                localStorage.setItem('role', response.user?.role || 'admin');
            }

        } catch (err) {
            set({
                error: err.message || "Login failed",
                loading: false,
            });
        }
    },

    logout: async () => {
        try {
            //set the laoding state
            set({ loading: true });

            await adminLogout();

        } catch (err) {
            set({
                error: err.response?.data?.message || "Logout failed",
                loading: false,
            });

        } finally {
            set({ user: null, loading: false });
        }
    },

    checkAuth: async () => {
        try {
            set({ loading: true });

            const response = await getAdmin(); // call /get-admin endpoint 

            if (response?.success) {
                set({ user: response.user, role: response.user?.role, loading: false });
                localStorage.setItem('role', response.user?.role || 'admin');
            } else {
                set({ user: null, role: null, loading: false });
                localStorage.removeItem('role');
            }
        } catch (err) {
            set({
                error: err?.message || "Login failed",
                user: null,
                role: null,
                loading: false
            });
            localStorage.removeItem('role');
        }
    },

}));