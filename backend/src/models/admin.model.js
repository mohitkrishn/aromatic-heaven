import { Schema, model } from "mongoose";

const adminSchema = new Schema({
    adminId: {
        type: String,
        minlength: 6,
        maxlength: 15,
        required: true
    },
    email: {
        type: String,
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
    }

}, { timestamps: true });

const Admin = model("Admin", adminSchema);

export default Admin;