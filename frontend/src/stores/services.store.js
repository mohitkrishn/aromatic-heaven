import { create } from "zustand";
import { persist } from "zustand/middleware";
import { allServices } from "../features/auth/services/auth.api";

export const useServicesStore = create(persist(
    (set) => ({
        services: null,
        loading: true,
        getServices: async () => {
            try {
                set({ loading: true });
                const { services } = await allServices();
                set({ services, loading: false });
            } catch (error) {
                set({ loading: false, services: null, error: error.message });
            } finally {
                set({ loading: false });
            }
        }
    })
));