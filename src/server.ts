import express, {Express, Request, Response} from 'express';
import {json, urlencoded} from "body-parser";
import dotenv from 'dotenv';
import {EventRouter} from "./routes/eventRoutes";



dotenv.config({ path: './config/.env' })
// connectDb();

const app: Express = express();
const port = 3000;
app.use(urlencoded({ extended: true }));
app.use(json())


// routes registrations

app.use(EventRouter)


app.get('/', (req: Request, res: Response)=>{
    res.send('Welcome to the mafu backend service');
});

app.listen(port, ()=> {
    console.log(`[Server]: running at http://localhost:${port}`);
});
