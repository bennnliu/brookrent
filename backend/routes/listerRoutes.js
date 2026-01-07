import express from 'express';
import * as listerController from '../controllers/listerController.js'; 
import {verifyToken} from '../middleware/jwtMiddleware.js';
import { uploadImage } from '../middleware/cloudinaryMiddleware.js';

const router = express.Router();
router.use(verifyToken)
router.get("/listings", listerController.getListings)
router.get("/listings/:id",listerController.getListing)
router.post("/list", uploadImage , listerController.createListing)
router.put("/listings/:id", uploadImage, listerController.updateListing)
router.delete("/listings/:id",listerController.deleteListing)

export default router