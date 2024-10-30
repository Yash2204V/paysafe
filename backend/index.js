const express = require("express");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${username}:${password}@paytm-clone.p9gdk.mongodb.net/?retryWrites=true&w=majority&appName=paytm-clone`);

const db = mongoose.connection;

db.once("open", () => {
    console.log("Connected to MongoDB");
});

app.get("/", (req,res)=>{
    res.send("Hello World!");
})

app.listen(3000, ()=>{
    console.log("Server running on http://localhost:3000");
})