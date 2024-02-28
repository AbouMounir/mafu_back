import mongoose from "mongoose";

const Image = mongoose.model('image', {
    imagePath: String,
    title: String,
    description: String
});

export default Image;