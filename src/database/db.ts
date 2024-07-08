import * as mongoose from "mongoose";

const connectDb = async () => {

    try {
        const conn = await mongoose.connect(process.env.DB_CONN_STRING, {})
        console.log(`database connection established : ${conn.connection?.host}`);
    } catch (error) {
        console.log("error connecting" + error.message);
        process.exit(1);
    }
}


export default connectDb;
