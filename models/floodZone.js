import mongoose from "mongoose";

const FloodZoneSchema = new mongoose.Schema({
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
    temperature : {
        type : String,
        default : ""
    },
    weather : {
        type: String,
        default : ""
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        required : false
    }
});

const FloodZone = mongoose.model('zones_inondees', FloodZoneSchema)

export default FloodZone ;