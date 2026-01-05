const express = require('express')
const router = express.Router()

router.post("/listings",(req,res) => {
    console.log("Creating new listing")
})

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