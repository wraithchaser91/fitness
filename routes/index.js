const router = require("express").Router();
const passport = require("passport");

router.get("/", (req, res) =>{
    console.log("first");
    res.render("index");
});

//Login
router.post("/login", passport.authenticate("local",{
    successRedirect: "dashboard",
    failureRedirect: "/",
    failureFlash: true
}));

module.exports = router;