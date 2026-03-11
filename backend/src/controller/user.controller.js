import bcrypt from "bcryptjs";
import crypto from "crypto";
import BookService from "../models/bookService.model.js";
import User from "../models/user.model.js";
import Services from "../models/services.model.js";
import { orderConfirmationEmail, resetPasswordEmail, sendWelcomeEmail } from "../services/nodemailer.service.js";
import { generateToken } from "./auth.controller.js";
import jwt from "jsonwebtoken";

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

        const token = generateToken(newUser, res, "1d");

        //generate link to verify account
        const verifyLink = `${process.env.CLIENT_URL}/verify-account/${token}`;

        //send welcome email
        await sendWelcomeEmail(email, name, verifyLink);

        // //send verify account email
        // await verifyUserEmail(email, name, verifyLink);

        return res.status(201).json({
            message: "User registered successfully, verify your account to login",
            // user: { ...newUser._doc, password: undefined, token }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error registering user",
            error: error.message
        });
    }
}

export const verifyAccount = async (req, res) => {
    const { token } = req.params;

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid token"
            });
        }

        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Account already verified"
            });
        }

        user.isVerified = true;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Account verified successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error verifying account",
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

        const token = generateToken(user, res, "7d");

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

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        //create reset token
        const resetToken = crypto.randomBytes(20).toString("hex");

        //hash token
        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        //set reset token
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes of token expiry

        await user.save();

        //send reset link
        const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
        // console.log(resetLink);

        //send reset password email
        await resetPasswordEmail(user.email, user.name, resetLink);

        return res.status(200).json({
            success: true,
            message: "If the email is registered with us, you will receive an email with instructions to reset your password within the next 10 minutes."
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    //hash token to compare the token
    const hasedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    try {
        const user = await User.findOne({
            resetPasswordToken: hasedToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            // Find user by token (even if expired) to clear fields
            const userToClear = await User.findOne({ resetPasswordToken: hasedToken });
            if (userToClear) {
                userToClear.resetPasswordToken = undefined;
                userToClear.resetPasswordExpire = undefined;
                await userToClear.save();
            }

            return res.status(404).json({
                success: false,
                message: "Token invalid or expired"
            });
        }

        //hash the new password
        const newHashedPassword = await bcrypt.hash(password, 10);

        user.password = newHashedPassword;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}