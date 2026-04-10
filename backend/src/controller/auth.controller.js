import jwt from 'jsonwebtoken';

export const generateToken = (user, res) => {

    const { email, _id, name } = user;

    const payload = {
        id: _id,
        email: email,
        name: name,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
    });

    return token;
}

export const generateAdminToken = (admin, res) => {

    const { email, _id, name, adminId } = admin;

    const payload = {
        id: _id,
        email: email,
        name: name,
        adminId: adminId
    };
    const adminToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("adminToken", adminToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
    });

    return adminToken;
}
