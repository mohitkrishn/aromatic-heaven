import { Schema, model } from "mongoose";

const bookServiceSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    service: {
        type: Schema.Types.ObjectId,
        ref: "Service",
        required: true
    },

    address: {
        type: String,
        required: [true, "Full address is required"],
        trim: true
    },

    mobile: {
        type: String,
        required: true,
        match: [/^[0-9]{10}$/, "Please provide a valid 10-digit number"]
    },

    therapist: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },

    bookingId: {
        type: String,
        required: true,
        unique: true
    },

    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    }

}, { timestamps: true });

// bookServiceSchema.pre("save", async function (next) {
//     const user = await User.findById(this.user);
//     user.bookedServices.push(this._id);
//     await user.save();
//     next();
// });

const BookService = model("BookService", bookServiceSchema);

export default BookService;