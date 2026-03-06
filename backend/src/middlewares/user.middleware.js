import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

export const verifyUser = async (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Login First"
        });
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select("-password");

        //pass the controller to the next
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}