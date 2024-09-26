import dotenv from 'dotenv';
import mongoose from "mongoose";
import {Model as sequelize} from "sequelize";
dotenv.config({ path: './config/.env' })
const connectDb = async () => {

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`database connection established : ${conn.connection.host}`);
    } catch (error) {
        console.log("error connecting" + error.message);
        process.exit(1);
    }
}

sequelize.sync()
export default connectDb;
