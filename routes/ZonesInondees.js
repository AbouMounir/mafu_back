import express from 'express';
import { createZoneInondee, deleteZoneInondee, getZoneInondee, getZonesInondees, updateZoneInondee } from '../controlleurs/ZoneInondees.js';
const routerZoneInondee = express.Router()

routerZoneInondee.get(('/'), getZonesInondees)
routerZoneInondee.create(('/'), createZoneInondee)
routerZoneInondee.get(('/:id'), getZoneInondee)
routerZoneInondee.delete(('/:id'), deleteZoneInondee)
routerZoneInondee.put(('/update/:id'), updateZoneInondee)


export default routerZoneInondee