import { ObjectId } from "mongodb";
import * as mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
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
    }
})

const Event = mongoose.model("Event", EventSchema)

interface IEvent {
    floodScene: string;
    floodLocation: string;
    floodDate: Date;
    floodDescription: string;
    floodIntensity: string;
    floodImage: string;
}

export {Event}
