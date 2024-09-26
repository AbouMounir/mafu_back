import mongoose from "mongoose";

const User = mongoose.model('users', {
    userEmail: {
        type: String,
        unique: true,
        default : ""
    },
    userNumber: {
        type: String,
        unique: true,
        default : ""
    },
    userFirstName: {
        type: String,
        default : ""
    },
    userLastName: {
        type: String,
        default : ""
    },
    userPassword: {
        type: String,
        default : ""
    },
    image : {
        type : String,
        default : ""
    },
    userLocation: {
        type: String,
    },
}, { timestamps: true });

export default User ;