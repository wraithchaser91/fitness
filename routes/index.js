const router = require("express").Router();
const passport = require("passport");
const {checkUnAuthenticated} = require("../middleware");

router.get("/", checkUnAuthenticated, (req, res) =>{
    res.render("index");
});

// //Login
router.post("/login", checkUnAuthenticated, passport.authenticate("local",{
    successRedirect: "dashboard",
    failureRedirect: "/",
    failureFlash: true
}));

module.exports = router;