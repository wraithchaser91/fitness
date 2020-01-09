const express = require("express");
const app = express();

app.get("/", (req, res)=>{
    res.send("This is a test");
});

app.listen(process.env.PORT || 3000);