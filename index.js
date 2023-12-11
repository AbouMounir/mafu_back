//npm install -g firebase-tools

import bodyParser from "body-parser";
import dotenv from 'dotenv';
import express from "express";
import connectDb from "./database/db.js";
import routerUser from "./routes/users.js";


const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.listen(4000, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("server is running on " + process.env.PORT);
})

dotenv.config({ path: './config/.env' })
connectDb();


app.use('/users', routerUser)

