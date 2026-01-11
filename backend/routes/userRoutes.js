import express from 'express'
import {verifyToken} from '../middleware/jwtMiddleware.js';
import * as userController from '../controllers/userController.js'

const router = express.Router()

router.post("/signup", userController.signUp)
router.post("/login", userController.login)
router.get('/userdata', verifyToken, userController.getUserData)


export default router