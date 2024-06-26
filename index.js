//npm install -g firebase-tools
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import express from "express";
import connectDb from "./database/db.js";
import routerFloodZone from "./routes/floodZone.js";
import routerUser from "./routes/users.js";


const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

dotenv.config({ path: './config/.env' })
connectDb();
app.get('/', (req,res) => res.send("mafu api"))
app.use('/users', routerUser)
app.use('/zones-inondees', routerFloodZone)

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("server is running on " + process.env.PORT);
})



