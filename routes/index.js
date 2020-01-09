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
    }catch(err){
        console.log(err);
        console.log("payee did not save");
        res.redirect("/");
    }
});

router.get("/list", async (req, res) =>{
    let list;
    try{
        list = await Payee.find({});
        res.render("list/list", {payees:list});
    }catch(err){
        console.log(err);
        list = [];
        res.render("list/list", {payees:list});
    }
});

module.exports = router;