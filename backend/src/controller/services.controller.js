import Services from "../models/services.model.js";

export const allServices = async (req, res) => {
    try {
        const services = await Services.find();

        res.status(200).json({
            success: true,
            message: "All services retrieved successfully",
            services
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving services",
            error: error.message
        });
    }
}