import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    userFullName: {
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
    }
}, {timestamps : true});

const User = mongoose.model('users', userSchema);

export default User ;