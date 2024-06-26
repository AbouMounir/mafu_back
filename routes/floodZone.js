import express from 'express';
import { addFloodZone, getFloodZone, getFloodsZones } from '../controlleurs/floodZone.js';
import { authMiddleware } from '../controlleurs/mildeware/authMiddleware.js';
const routerFloodZone = express.Router()

routerFloodZone.get(('/all-infos'),authMiddleware, getFloodsZones)
routerFloodZone.post(('/add'),authMiddleware, addFloodZone)
routerFloodZone.get(('/current-info'),authMiddleware, getFloodZone)
//routerFloodZone.delete(('/:id'), deleteZoneInondee)
//routerFloodZone.get(('/images/:id'), getFloodZoneImage)
//routerFloodZone.put(('/update/:id'), updateZoneInondee)

export default routerFloodZone