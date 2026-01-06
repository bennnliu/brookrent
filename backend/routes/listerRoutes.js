const express = require('express')
const router = express.Router()
const listerController = require('../controllers/listerController')

router.post("/list", listerController.verifyToken, listerController.createListing)

router.put("/listings/:id", listerController.verifyToken, listerController.updateListing)

router.get("/listings", (req,res) => {
    console.log("Sending user's listings")
})

router.delete("/listings/:id", listerController.verifyToken, listerController.deleteListing)

module.exports = router;