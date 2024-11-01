const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
    res.send("User route");
});

router.post("/signup", (req, res)=>{
    res.send("User route: Signup!");
});

module.exports = router;