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
        default : ""
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
    },
    dataCreatedAt : {
        type : Date,
        default : Date.now()
    },
    status : {
        type : String,
        default : "pending"
    } 
});

const FloodZone = mongoose.model('zones_inondees', FloodZoneSchema)

export default FloodZone ;