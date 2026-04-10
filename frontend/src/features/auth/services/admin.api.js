import axios from "axios";

const baseUrl = axios.create({
    baseURL: "http://localhost:5500/api/admin",
    withCredentials: true,
});

export const adminLogin = async (data) => {
    try {
        const response = await baseUrl.post("/login", data);

        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const getAdmin = async () => {
    try {
        const response = await baseUrl.get("/get-admin");

        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const adminLogout = async () => {
    try {
        const response = await baseUrl.post("/logout");

        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const getAllBookings = async () => {
    try {
        const response = await baseUrl.get("/all-bookings");

        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const getAllUsers = async () => {
    try {
        const response = await baseUrl.get("/all-users");

        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const getAllServices = async () => {
    try {
        const response = await baseUrl.get("/all-services");

        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const addService = async (data) => {
    try {
        const response = await baseUrl.post("/add-new", data);

        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const updateService = async (id, data) => {
    try {
        const response = await baseUrl.put(`/update-service/${id}`, data);

        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const deleteService = async (id) => {
    try {
        const response = await baseUrl.delete(`/delete-service/${id}`);

        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}