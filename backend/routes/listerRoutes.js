const express = require('express')
const router = express.Router()
const listerController = require('../controllers/listerController')

router.post("/properties", listerController.createListing)

router.patch("/listings/:id", (req,res) => {
    console.log("Updating listing")
})

router.get("/listings", (req,res) => {
    console.log("Sending user's listings")
})

router.delete("/listings/:id", (req,res) => {
    console.log("Deleting listing")
})

module.exports = router;