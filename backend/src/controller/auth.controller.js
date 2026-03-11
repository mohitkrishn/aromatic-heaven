import jwt from 'jsonwebtoken';

export const generateToken = (user, res, expiryTime) => {

    const { email, _id, name, adminId } = user;

    const payload = {
        id: _id,
        email: email,
        name: name,
        adminId: adminId
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiryTime });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return token;
}

