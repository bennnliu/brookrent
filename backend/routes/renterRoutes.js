const express = require('express')
const renterController = require('../controllers/renterController')
const router = express.Router()

router.get("/properties", renterController.getProperties)

module.exports = router;