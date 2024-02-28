import express from 'express';
import { createZoneInondee, deleteZoneInondee, getZoneInondeeImage, getZoneInondeeInfo, getZonesInondees, upload } from '../controlleurs/ZonesInondees.js';
const routerZoneInondee = express.Router()

routerZoneInondee.get(('/'), getZonesInondees)
routerZoneInondee.post(('/'),upload.single('floodImages'), createZoneInondee)
routerZoneInondee.get(('/info/:id'), getZoneInondeeInfo)
routerZoneInondee.get(('/images/:id'), getZoneInondeeImage)
routerZoneInondee.delete(('/:id'), deleteZoneInondee)
//routerZoneInondee.put(('/update/:id'), updateZoneInondee)


export default routerZoneInondee