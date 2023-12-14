import express from 'express';
import { createZoneInondee, deleteZoneInondee, getZoneInondee, getZonesInondees } from '../controlleurs/ZonesInondees.js';
const routerZoneInondee = express.Router()

routerZoneInondee.get(('/'), getZonesInondees)
routerZoneInondee.post(('/'), createZoneInondee)
routerZoneInondee.get(('/:id'), getZoneInondee)
routerZoneInondee.delete(('/:id'), deleteZoneInondee)
//routerZoneInondee.put(('/update/:id'), updateZoneInondee)


export default routerZoneInondee