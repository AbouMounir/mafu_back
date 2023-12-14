import mongoose from "mongoose";

const ZonesInondees = mongoose.model('users', {
    floodLocation: {
        type: String,
        unique: true,
        required: [true, "Your email is required"],
    },
    floodHour: {
        type: String,
        required: [true, "Hour is required"],
    },
    floodDescription: {
        type: String,
    },
    floodIntensity: {
        type: String,
        required: [true, "Your intensity is required"],
    },
    floodImages: {
        type: [String],
        default: []
    },
});

export default ZonesInondees ;