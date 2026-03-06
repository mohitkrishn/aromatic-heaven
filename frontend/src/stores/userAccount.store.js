import { create } from "zustand";
import { persist } from "zustand/middleware";
import { myAccount } from "../features/auth/services/auth.api";

export const useUserAccountStore = create(persist(
    (set) => ({
        accountInfo: null,
        getAccountInfo: async () => {
            const { user } = await myAccount(); // Call the myAccount API function

            if (!user) {
                throw new Error("Failed to fetch account information");
            }
            set({ accountInfo: user }); // Update the store with the fetched account information
        },
        clearAccountInfo: () => {
            set({ accountInfo: null }); // Clear the account information in the store
        },
    })
));