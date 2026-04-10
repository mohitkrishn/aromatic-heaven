import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user",
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email address"
        ]
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    },
    mobile: {
        type: String,
        unique: true,
        required: true,
        match: [/^[0-9]{10}$/, "Please provide a valid 10-digit number"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

}, { timestamps: true });

const User = model("User", userSchema);

export default User;

