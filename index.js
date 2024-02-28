//npm install -g firebase-tools
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import express from "express";
import multer from "multer";
import connectDb from "./database/db.js";
import ZonesInondees from "./models/ZonesInondees.js";
import routerZoneInondee from "./routes/ZonesInondees.js";
import routerUser from "./routes/users.js";


const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

dotenv.config({ path: './config/.env' })
connectDb();
app.get('/', (req,res) => res.send("mafu api"))
app.use('/users', routerUser)
app.use('/zonesInondees', routerZoneInondee)


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('zinondees'), async (req, res) => {
    try {
        const imagePath = req.file.path;
        const { title, description } = req.body; // Ajoutez les autres données ici

        // Convertissez le chemin d'accès en base 64
        const imagePathBase64 = Buffer.from(imagePath).toString('base64');

        // Enregistrez le chemin d'accès imagePathBase64 et les autres données dans MongoDB
        const zinondees = new ZonesInondees({
            floodLocation: req.body.floodLocation,
            floodDescription: req.body.floodDescription,
            floodIntensity: req.body.floodIntensity,
            floodImages: imagePathBase64
        });

        await zinondees.save();

        res.send('Image et données téléchargées avec succès.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors du téléchargement de l\'image et des données.');
    }
});

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("server is running on " + process.env.PORT);
})



