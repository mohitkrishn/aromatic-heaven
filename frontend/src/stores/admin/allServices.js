import { create } from "zustand";
import { deleteService, getAllServices, updateService } from "../../features/auth/services/admin.api";

export const useGetAllServices = create((set, get) => ({
    services: null,
    loading: false,
    error: null,
    message: null,

    getAllServices: async (forceRefresh = false) => {
        set({ loading: true, error: null });
        try {
            // If not forceRefresh and bookings already exist, skip fetch
            if (!forceRefresh && get().services) {
                set({ loading: false });
                return;
            }
            const { services } = await getAllServices();
            set({ services: services, loading: false });
        } catch (error) {
            set({ loading: false, services: null, error: error.message });
        }
    },

    editService: async (id, data) => {
        try {

            set({ loading: true });

            const response = await updateService(id, data);

            set({ services: response, loading: false, message: response?.message });

        } catch (error) {

            set({ loading: false, services: null, message: error?.message, });

        } finally {

            set({ loading: false });
        }
    },

    deleteService: async (id) => {
        try {

            set({ loading: true });

            const response = await deleteService(id);

            set({ services: response, loading: false, message: response?.message });

        } catch (error) {

            set({ loading: false, services: null, message: error?.message });

        } finally {

            set({ loading: false });
        }
    }
}));