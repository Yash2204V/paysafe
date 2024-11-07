require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const mainRouter = require("./routes/index");

app.get("/", async (req, res)=>{
    res.send("Hello World");
});

app.use('/api/v1', mainRouter);

app.listen(PORT, ()=>{
    console.log("Server running on http://localhost:3000");
})