import fs from "fs";
import mimeTypes from 'mime-types';
import multer from 'multer';
import path from "path";
import tmp from "tmp";
import ZonesInondees from '../models/ZonesInondees.js';

const storage = multer.memoryStorage(
    {
        destination: function (req, file, cb) {
            cb(null, 'tmp/uploads');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    })

export const upload = multer({ storage: storage });

const createZoneInondee = ( async (req, res) => {
    try {

        if (req.file) {
            const tmpFile = tmp.fileSync();
            fs.writeFileSync(tmpFile.name, req.file.buffer);
        }

        const zoneInondee = await new ZonesInondees({
            floodScene:req.body.floodScene,
            floodLocation: {
                longitude: req.body.longitude,
                latitude: req.body.latitude
            },
            floodDescription: req.body.floodDescription,
            floodIntensity: req.body.floodIntensity,
            floodImages: req.file ? {
                imagePath: req.file.originalname,
                data: req.file.buffer
            } : {}
        })
        await zoneInondee.save()
            .then((resp) => res.status(201).json({
                message: 'Objet enregistré',
                data : resp
            }))
            .catch(error => res.status(400).json({ error }))
    } catch (error) {
        console.log(error);
    }
})

const getZonesInondees = (async (req, res) => {

    const fonc = (item) => {
        return {
            "floodScene": item.floodScene,
            "floodLocation":item.floodLocation,
            "floodDescription":item.floodDescription,
            "floodImages":item.floodImages.imagePath,
            "floodIntensity": item.floodIntensity,
            "floodDate": item.floodDate
        }
    }
    const zonesInondees = await ZonesInondees.find({});
    const zi = zonesInondees.map(fonc)
    console.log(zi);
    res.send(zonesInondees)
})

const getZoneInondeeInfo = (async (req, res) => {
    await ZonesInondees.findOne({ _id: req.params.id })
        .then(item =>
            {
                res.status(201).json({
                    data: {
                        floodScene: item.floodScene,
                        floodLocation: item.floodLocation,
                        floodImages:item.floodDescription.imagePath,
                        floodDescription: item.floodDescription,
                        floodIntensity: item.floodIntensity,
                        floodDate: item.floodDate
                    },
                    message: "flood information"
                })})
        .catch(error => console.log(error));
})

const getZoneInondeeImage = (async (req, res) => {

    const zoneInondee = await ZonesInondees.findOne({ _id: req.params.id })

    if (!zoneInondee) {
        return res.status(404).send('zone non trouvé.');
    }
    const fileExtension = path.extname(zoneInondee.floodImages.imagePath).slice(1);
    const mimeType = mimeTypes.lookup(fileExtension) || 'application/octet-stream';

    res.set('Content-Type', mimeType); // Assurez-vous de définir le type MIME approprié
    res.send(zoneInondee.floodImages.data);
})

const deleteZoneInondee = (async (req, res) => {
    await ZonesInondees.deleteOne({ _id: req.params.id }).then(result => res.send(result))
})

export { createZoneInondee, deleteZoneInondee, getZoneInondeeImage, getZoneInondeeInfo, getZonesInondees };

