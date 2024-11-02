const express = require("express");
const app = express();
const cors = require("cors");
const mainRouter = require("./routes/index");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", async (req, res)=>{
    res.send("Hello World");
});

app.use('/api/v1', mainRouter);

app.listen(3000, ()=>{
    console.log("Server running on http://localhost:3000");
})