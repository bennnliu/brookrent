import express from 'express'
import * as adminController from '../controllers/adminController.js';
import {verifyToken} from '../middleware/jwtMiddleware.js';
import { uploadImage } from '../middleware/cloudinaryMiddleware.js';
import {isAdmin} from '../middleware/isAdminMiddleWare.js'

const router = express.Router()

router.use(verifyToken)

router.post("/list",isAdmin,uploadImage,adminController.createListing)
router.put("/listings/:id",isAdmin,uploadImage,adminController.updateListing)
router.delete("/listings/:id",isAdmin,uploadImage,adminController.deleteListing)

export default router