import axios from "axios";

const baseUrl = axios.create({
    baseURL: "http://localhost:5500/api/auth",
    withCredentials: true
});

export async function signup(data) {
    try {
        const response = await baseUrl.post("/register", data);

        return response.data;

    } catch (error) {
        throw error.response.data;
    }
}

export async function verifyAccount(token) {
    try {
        const response = await baseUrl.post(`/verify-account/${token}`);

        return response.data;

    } catch (error) {
        throw error.response.data;
    }
}

export async function login(data) {
    try {
        const response = await baseUrl.post("/login", data);

        return response;

    } catch (error) {
        throw error.response.data;
    }
}

export async function logout() {
    try {
        const response = await baseUrl.post("/logout"); // No data needed for logout

        return response;

    } catch (error) {
        throw error.response.data;
    }
}

export async function myAccount() {
    try {
        const response = await baseUrl.get("/my-account");

        return response.data;

    } catch (error) {
        throw error.response.data;
    }
}

export async function allServices() {
    try {
        const response = await baseUrl.get("/all-services");

        return response.data;

    } catch (error) {
        throw error.response.data;
    }
}

export async function bookService(serviceId, address, mobile, therapist) {
    try {
        const response = await baseUrl.post("/book-service", { serviceId, address, mobile, therapist });

        return response.data;

    } catch (error) {

        throw error.response.data;
    }
}

export async function getMe() {
    try {
        const response = await baseUrl.get("/me");

        return response.data;

    } catch (error) {

        throw error.response.data;
    }
}

export async function getServiceDetails(serviceId) {
    try {
        const response = await baseUrl.get(`/service-details/${serviceId}`);

        return response.data;

    } catch (error) {

        throw error.response.data;
    }
}

export async function forgotPassword(email) {
    try {
        const response = await baseUrl.post("/forgot-password", { email });

        return response.data;

    } catch (error) {

        throw error.response.data;
    }
}

export async function resetPassword(token, password) {
    try {
        const response = await baseUrl.post(`/reset-password/${token}`, { password });

        return response.data;

    } catch (error) {

        throw error.response.data;
    }
}

export async function myBookings() {
    try {
        const response = await baseUrl.get("/my-bookings");

        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}