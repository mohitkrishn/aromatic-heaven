import { Schema, model } from "mongoose";

const servicesSchema = new Schema({
    name: {
        type: String,
        required: [true, "Service name is required"]
    },
    subTitle: {
        type: String,
    },
    description: {
        type: String,
        required: [true, "Service description is required"]
    },
    image: {
        type: String,
        required: [true, "Service image is required"]
    },
    price: {
        type: Number,
        required: [true, "Service price is required"]
    }
}, { timestamps: true });

const Services = model("Service", servicesSchema);

export default Services;