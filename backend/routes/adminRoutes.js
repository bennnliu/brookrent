import express from 'express'
import * as adminController from '../controllers/adminController.js';
import {verifyToken} from '../middleware/jwtMiddleware.js';
import { uploadImage } from '../middleware/cloudinaryMiddleware.js';
import {isAdmin} from '../middleware/isAdminMiddleWare.js'

const router = express.Router()
router.use(verifyToken)
router.use(isAdmin)


router.get("/listings",adminController.getListings)
router.get("/listings/:id",adminController.getListing)
router.post("/list",uploadImage,adminController.createListing)
router.put("/listings/:id",uploadImage,adminController.updateListing)
router.delete("/listings/:id",adminController.deleteListing)

export default router