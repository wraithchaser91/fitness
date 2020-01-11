const router = require("express").Router();
const {checkAuthentication, checkAdmin} = require("../middleware.js");
const Payee = require("../models/Payee");

router.use(checkAuthentication);
router.use(checkAdmin);

router.get("/", async(req, res) =>{
    let payees;
    try{
        payees = await Payee.find({});
    }catch{
        payees = [];
    }
    res.render("admin", {
        username: req.user.username,
        payees,
        css:"dashboard"
    });
});

router.get("/payees", (req, res) =>{
    res.render("admin/payees");
});

router.get("/records", (req, res) =>{
    res.render("admin/records");
});

router.get("/panel", (req, res) =>{
    res.render("admin/panel");
});

module.exports = router;