import jwt from "jsonwebtoken"

export const verifyAdmin = async (req, res, next) => {
    const adminToken = req.cookies?.adminToken;

    if (!adminToken) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized access"
        });
    }

    try {
        const decoded = await jwt.verify(adminToken, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}