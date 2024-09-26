import mongoose from "mongoose";

const FloodZone = mongoose.model('zones_inondees', {
    floodScene: {
        type: String
    },
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
        default : ""
    },

    floodIntensity: {
        type: String,
        default : ""
    },
    floodImage: {
        type: String,
        default : ""
    },
    floodCategory : {
        type : String,
        default : ""
    },
    temperaty : {
        type : String,
        default : ""
    },
    weather : {
        type: String,
        default : ""
    }
});

export default FloodZone ;