import { create } from "zustand";
import { persist } from "zustand/middleware";
import { allServices } from "../features/auth/services/auth.api";

export const useServicesStore = create(persist(
    (set) => ({
        services: null,
        getServices: async () => {
            try {
                const { services } = await allServices();
                set({ services });
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        }
    })
));