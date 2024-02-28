import mongoose from "mongoose";

const ZonesInondees = mongoose.model('zinondees', {
    floodLocation: {
        longitude: String,
        latitude: String
    },
    floodDate: {
        type: Date,
        default : Date.now
    },
    floodDescription: {
        type: String,
    },

    floodIntensity: {
        type: String,
    },
    floodImages: {
        imagePath: String,
        data: Buffer
    }
});

export default ZonesInondees ;