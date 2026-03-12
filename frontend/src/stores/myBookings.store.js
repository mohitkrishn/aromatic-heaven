import { create } from "zustand";
import { myBookings } from "../features/auth/services/auth.api";

export const useMyBookingStore = create((set, get) => ({
    myBookings: null,
    loading: false,
    error: null,

    getAllBookings: async (forceRefresh = false) => {
        set({ loading: true, error: null });
        try {
            // If not forceRefresh and bookings already exist, skip fetch
            if (!forceRefresh && get().myBookings) {
                set({ loading: false });
                return;
            }
            const { bookings } = await myBookings();
            set({ myBookings: bookings, loading: false });
        } catch (error) {
            set({ loading: false, myBookings: null, error: error.message });
        }
    },

    refreshBookings: async () => {
        // Always fetch fresh bookings
        set({ loading: true, error: null });
        try {
            const { bookings } = await myBookings();
            set({ myBookings: bookings, loading: false });
        } catch (error) {
            set({ loading: false, myBookings: null, error: error.message });
        }
    }
}));