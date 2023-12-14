import ZonesInondees from '../models/ZonesInondees.js';

const createZoneInondee = (async(req, res) => {
    const zoneInondee = await new ZonesInondees({
        floodLocation: req.body.floodLocation,
        floodHour: req.body.floodHour,
        floodDescription: req.body.floodDescription,
        floodIntensity: req.body.floodIntensity,
        floodImages: req.body.floodImages
    })
    zoneInondee.save()
        .then(() => res.status(201).json({message : 'Objet enregistré'}))
        .catch(error => res.status(400).json({error}))
    console.log(zoneInondee);
})

const getZonesInondees = (async(req, res) => {
    await User.find({}).then(item => res.send(item))
})

const getZoneInondee = (async (req, res) => {
    await User.findOne({ _id : req.params.id }).then(item => res.send(item));
})

const deleteZoneInondee = (async (req, res) => {
    await User.deleteOne({_id : req.params.id}).then(result => res.send(result))
})

export { createZoneInondee, deleteZoneInondee, getZoneInondee, getZonesInondees };

