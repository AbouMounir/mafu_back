import mongoose from "mongoose";

const ZonesInondees = mongoose.model('zinondees', {
    floodLocation: {
        type: Map,
        of : String,
        unique: true,
        required: [true],
    },
    floodDate: {
        type: Date,
        default : Date.now,
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