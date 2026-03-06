import bcrypt from "bcryptjs";
import Admin from "../models/admin.model.js";
import Services from "../models/services.model.js";
import uploadFile from "../services/storage.service.js";
import { generateToken } from "./auth.controller.js";
import BookService from "../models/bookService.model.js";


export const registerAdmin = async (req, res) => {
    const { adminId, email, password } = req.body;

    if (!adminId || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {
        //check if admin already exists
        const existingAdmin = await Admin.findOne({ email });

        if (existingAdmin) {
            return res.status(400).json({
                message: "Admin already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = await new Admin({
            adminId,
            email,
            password: hashedPassword
        });

        await newAdmin.save();

        const token = await generateToken(newAdmin, res);

        res.status(201).json({
            message: "Admin registered successfully",
            admin: newAdmin,
            token
        });

    } catch (error) {
        res.status(500).json({
            message: "Error registering admin",
            error: error.message
        });
    }
}

export const addService = async (req, res) => {
    const { name, subTitle, description, price } = req.body;
    const image = req.file;

    if (!name || !subTitle || !description || !price) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {

        let imageUrl = null;

        //convert image to base64
        if (image && image.buffer) {
            const base64Image = image.buffer.toString('base64');
            const fileForImageKit = `data:${image.mimetype};base64,${base64Image}`;
            imageUrl = await uploadFile(fileForImageKit, image.originalname);
        }

        const newService = await new Services({
            name,
            subTitle,
            description,
            price,
            image: imageUrl
        });

        await newService.save();

        res.status(201).json({
            message: "Service added successfully",
            service: newService
        });

    } catch (error) {
        res.status(500).json({
            message: "Error adding service",
            error: error.message
        });
    }
}

export const loginAdmin = async (req, res) => {
    const { adminId, password } = req.body;

    if (!adminId || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    try {
        const admin = await Admin.findOne({ adminId }).select("+password");

        if (!admin) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = generateToken(admin, res);

        res.status(200).json({
            success: true,
            message: "Admin logged in successfully",
            token
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const logoutAdmin = async (req, res) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Already logged out"
        });
    }

    res.clearCookie("token");

    res.status(200).json({
        success: true,
        message: "Admin logged out successfully"
    });
}

export const getAllBookings = async (req, res) => {
    try {
        const bookings = await BookService.find()
            .populate("user", "name email")
            .populate("service", "name price")
            .sort({ createdAt: -1 });

        if (bookings.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No any bookings yet"
            });
        }

        res.status(200).json({
            success: true,
            length: bookings.length,
            message: "Bookings retrieved successfully",
            bookings
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving bookings",
            error: error.message
        });
    }
}

export const sortBookings = async (req, res) => {
    try {
        const { status, sortBy, date, page = 1, limit = 10 } = req.query;

        let queryObject = {};

        if (status) {
            queryObject.status = status;
        }

        //day-wise sorting
        if (date) {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);

            queryObject.createdAt = {
                $gte: startOfDay,
                $lte: endOfDay
            };
        }

        let query = BookService.find(queryObject)
            .populate("user", "name email")
            .populate("service", "name price");

        //sorting logic
        //Example: ?sortBy=-createdAt (latest first) or ?sortBy=createdAt (oldest first)
        if (sortBy) {
            const sort = sortBy.split(",").join(" ");
            query = query.sort(sort);
        } else {
            query = query.sort("-createdAt");
        }

        //pagination logic
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(Number(limit));

        const bookings = await query;

        if (bookings.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No any bookings found"
            });
        }

        res.status(200).json({
            success: true,
            length: bookings.length,
            message: "Bookings retrieved successfully",
            bookings
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving bookings",
            error: error.message
        });
    }
}