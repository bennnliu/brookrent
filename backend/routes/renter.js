const express = require('express')
const router = express.Router()

router.get("/properties", (req,res) => {
    console.log("Sending properties");
    res.send("Sending properties")

}) 

module.exports = router;