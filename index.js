//npm install -g firebase-tools
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import express from "express";
import connectDb from "./database/db.js";
import routerFloodZone from "./routes/floodZone.js";
import routerUser from "./routes/users.js";
import cors from 'cors';
import FloodZone from "./models/floodZone.js";
//import FloodZone from "./models/floodZone.js";

const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors(corsOptions))

dotenv.config({ path: './config/.env' })
connectDb();
app.get('/', (req,res) => res.send("mafu api"))
app.use('/users', routerUser)
app.use('/zones-inondees', routerFloodZone)

/*
const uploadFloodsZones = (async (req, res) => {
    const floodZones = await FloodZone.find();
    floodZones.forEach(async zoneInondee => {
        zoneInondee.temperature = "Inondation";
        await zoneInondee.save()
    })
})
    uploadFloodsZones();
*/

const deleteZoneInondee = (async (req, res) => {
    await FloodZone.deleteMany({ floodScene: "Avenue Usher Assouan" }).then(result => console.log(result)
    )
}) 

deleteZoneInondee()

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("server is running on " + process.env.PORT);
})



