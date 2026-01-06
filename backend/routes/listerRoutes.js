import express from 'express';
import * as listerController from '../controllers/listerController.js'; 
import {verifyToken} from '../middleware/jwtMiddleware.js';

const router = express.Router();

router.use(verifyToken)

router.post("/list", listerController.createListing)

router.put("/listings/:id", listerController.updateListing)

router.get("/listings", (req,res) => {
    console.log("Sending user's listings")
})

router.delete("/listings/:id", listerController.deleteListing)

export default router