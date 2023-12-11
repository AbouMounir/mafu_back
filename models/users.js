import mongoose from "mongoose";

const User = mongoose.model('users', {
    userEmail: {
        type: String,
        unique: true,
        required: [true, "Your email is required"],
    },
    userNumber: {
        type: String,
        unique: true,
        required: [true, "Your number is required"],
    },
    userFirstName: {
        type: String,
        required: [true, "Your firstname is required"],
    },
    userLastName: {
        type: String,
        required: [true, "Your lastname is required"],
    },
    userPassword: {
        type: String,
        required: [true, "Your password is required"],
    },
    userLocation: {
        type: String,
    },
});

export default User ;