const router = require("express").Router();
const Payee = require("../models/Payee");

router.get("/", (req, res) =>{
    res.render("index");
});

router.post("/new", async (req, res) =>{
    try{
        const payee = new Payee({
            name: req.body.name
        })
        await payee.save();
        console.log("payee saved");
        res.redirect("/");
    }catch{
        console.log("payee did not save");
        res.redirect("/");
    }
});

router.get("/list", async (req, res) =>{
    let list;
    try{
        list = await Payee.find({});
        res.json(list);
    }catch{
        list = [];
        res.json(list);
    }
});

module.exports = router;