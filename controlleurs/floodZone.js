import axios from 'axios';
import FloodZone from '../models/floodZone.js';
import { config } from 'dotenv';

config({path : "../config/.env"})

const addFloodZone = ( async (req, res) => {
    try {
        let temperature = "";
        let weather = "";
        let openWeatherUrl  = `https://api.openweathermap.org/data/3.0/onecall?lat=${req.body.latitude}&lon=${req.body.longitude}&units=metric&lang=fr&appid=${process.env.OPEN_WEATHER_KEY}`
        
        await axios.get(openWeatherUrl)
            .then(response => {
                let data = response.data
                temperature = data.current.temp
                weather = data.current.weather[0].description
            })
            .catch(
                error => {console.log(error); } 
            )
        const zoneInondee = await new FloodZone({
            floodScene:req.body.floodScene,
            floodLocation: {
                longitude: req.body.longitude,
                latitude: req.body.latitude
            },
            floodDescription: req.body.floodDescription,
            floodIntensity: req.body.floodIntensity,
            floodImage: req.body.floodImage,
            floodCategory : req.body.floodCategory,
            weather: weather,
            temperature : temperature,
            floodDate : req.body.floodDate,
            user : req.userId
        })

        await zoneInondee.save()

        const populatedZone = await FloodZone.findById(zoneInondee._id).populate('user', 'userFullName userEmail');
        
        res.status(201).json({
            message: 'Objet enregistred',
            data : populatedZone
        })
    } catch (error) {
        console.log(error);
    }
})


const getFloodsZones = (async (req, res) => {

    const floodZones = await FloodZone.find().populate('user', 'userFullName userEmail');
    res.status(201).json({
        data : floodZones,
        message : "get floods zones informations"
    })
})

const getFloodZone = (async (req, res) => {
    const floodZone = await FloodZone.findOne({ _id: req.body.floodZoneId }).populate('user', 'userFullName userEmail');
    res.status(201).json({
        data: floodZone,
        message: "get flood zone information"
    })
})



export { addFloodZone, getFloodZone, getFloodsZones };

/*
{
    "userId": "66bb91eb2b04be5e0f5e2ca9",
    "floodScene": "Deux Plateaux",
    "longitude": "-3.9926",
    "latitude": "5.3642",
    "floodDescription": "description de l’alerte à Deux Plateaux ",
    "floodIntensity": "forte",
    "floodImage": "",
    "floodCategory": "inondation",
    "temperaty": "32",
    "weather": "Ensoleillé"
    }
*/

