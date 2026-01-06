import express from 'express'
import * as renterController from '../controllers/renterController.js'

const router = express.Router()

router.get("/properties", renterController.getProperties)
router.get("/properties/:id",renterController.getProperty)

export default router