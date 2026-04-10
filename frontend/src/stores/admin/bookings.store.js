import { create } from "zustand";
import { getAllBookings } from "../../features/auth/services/admin.api";

export const useBookingsStore = create((set, get) => ({
    allBookings: null,
    loading: false,
    error: null,
    getAllBookings: async (forceRefresh = false) => {
        set({ loading: true, error: null });
        try {
            // If not forceRefresh and bookings already exist, skip fetch
            if (!forceRefresh && get().allBookings) {
                set({ loading: false });
                return;
            }
            const { bookings } = await getAllBookings();
            set({ allBookings: bookings, loading: false });

        } catch (error) {
            set({ loading: false, allBookings: null, error: error.message });
        }
    },
}));