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
            user : req.body.userId
        })
        
        await zoneInondee.save()
        res.status(201).json({
            message: 'Objet enregistred',
            data : zoneInondee
        })
    } catch (error) {
        console.log(error);
    }
})

const getFloodsZones = (async (req, res) => {

    const floodZones = await FloodZone.find().populate({"path": "users"});
    res.status(201).json({
        data : floodZones,
        message : "get floods zones informations"
    })
})

const getFloodZone = (async (req, res) => {
    const floodZone = await FloodZone.findOne({ _id: req.body.floodZoneId }).populate({"path": "users"})
    res.status(201).json({
        data: floodZone,
        message: "get flood zone information"
    })
})

/* const deleteZoneInondee = (async (req, res) => {
    await FloodZone.deleteOne({ _id: req.params.id }).then(result => res.status(201).json(result))
}) */

export { addFloodZone, getFloodZone, getFloodsZones };

