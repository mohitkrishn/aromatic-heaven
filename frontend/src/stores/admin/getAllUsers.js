import { create } from "zustand";
import { getAllUsers } from "../../features/auth/services/admin.api";

export const useGetAllUsersStore = create((set, get) => ({
    allUsers: null,
    loading: false,
    error: null,

    getAllUsers: async (forceRefresh = false) => {
        set({ loading: true, error: null });
        try {
            // If not forceRefresh and users already exist, skip fetch
            if (!forceRefresh && get().allUsers) {
                set({ loading: false });
                return;
            }
            const { users } = await getAllUsers();
            set({ allUsers: users, loading: false });
        } catch (error) {
            set({ loading: false, allUsers: null, error: error.message });
        }
    },
}));