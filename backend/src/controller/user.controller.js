import BookService from "../models/bookService.model.js";
import Services from "../models/services.model.js";
import User from "../models/user.model.js";
import { orderConfirmationEmail, sendWelcomeEmail } from "../services/nodemailer.service.js";
import { generateToken } from "./auth.controller.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        //check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: `User with email ${email} already exists`
            });
        }

        //check password length
        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long"
            });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const token = generateToken(newUser, res);

        //send welcome email
        await sendWelcomeEmail(email, name);

        return res.status(201).json({
            message: "User registered successfully",
            // user: { ...newUser._doc, password: undefined, token }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error registering user",
            error: error.message
        });
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = generateToken(user, res);

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: { ...user._doc, password: undefined, token }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error logging in user",
            error: error.message
        });
    }
}

export const logoutUser = (req, res) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(400).json({
            success: false,
            message: "user already logged out"
        });
    }

    res.clearCookie("token");

    res.status(200).json({
        success: true,
        message: "User logged out successfully"
    });
}

export const bookService = async (req, res) => {
    try {
        const { serviceId, address, mobile, therapist } = req.body;
        const userId = req.user._id;

        // Check if service exists
        const service = await Services.findById(serviceId);

        if (!service) {
            return res.status(404).json({
                message: "Service not found"
            });
        }

        // // Check if user has already booked this service
        // const existingBooking = await BookService.findOne({ service: serviceId, user: userId });

        // if (existingBooking) {
        //     return res.status(400).json({
        //         message: "You have already booked this service"
        //     });
        // }

        // Create new booking
        const newBooking = await new BookService({
            user: userId,
            service: serviceId,
            address,
            mobile,
            therapist,
            status: "confirmed"
        });

        await newBooking.save();

        //send booking confirmation email
        const user = await User.findById(userId);
        await orderConfirmationEmail(user.email, user.name, service.name, service.price);

        res.status(201).json({
            success: true,
            message: "Service booked successfully, email sent to " + user.email,
            booking: newBooking
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export const myAccount = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId).select("-password")

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const bookings = await BookService.find({ user: userId })
            .populate("service", "name price")
            .select("-user -__v");

        return res.status(200).json({
            message: "User account details",
            user,
            bookings
        });
        npm
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export const getMe = async (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user
    })
}

export const serviceDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const service = await Services.findById(id);

        if (!service) {
            return res.status(404).json({
                message: "Service not found"
            });
        }

        return res.status(200).json({
            message: "Service details",
            service
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}