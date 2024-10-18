import FloodZone from '../models/floodZone.js';


const addFloodZone = ( async (req, res) => {
    try {
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
            weather: req.body.weather,
            temperature : req.body.temperature,
            user : req.userId
        })

        await zoneInondee.save()

        const populatedZone = await FloodZone.findById(zoneInondee._id).populate('user', 'userFirstName userLastName userEmail');
        
        res.status(201).json({
            message: 'Objet enregistred',
            data : populatedZone
        })
    } catch (error) {
        console.log(error);
    }
})

const getFloodsZones = (async (req, res) => {

    const floodZones = await FloodZone.find().populate('user', 'userFirstName userLastName userEmail');
    res.status(201).json({
        data : floodZones,
        message : "get floods zones informations"
    })
})

const getFloodZone = (async (req, res) => {
    const floodZone = await FloodZone.findOne({ _id: req.body.floodZoneId }).populate('user', 'userFirstName userLastName userEmail');
    res.status(201).json({
        data: floodZone,
        message: "get flood zone information"
    })
})

/* const deleteZoneInondee = (async (req, res) => {
    await FloodZone.deleteOne({ _id: req.params.id }).then(result => res.status(201).json(result))
}) */

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

