const express = require('express')
const router = express.Router()

//Only allowed for listers
router.post("/signup", (req,res) => {
    console.log("Creating new user")
})

router.post("/login", (req,res) => {
    console.log("Logging in user")
})

module.exports = router;