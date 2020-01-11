const router = require("express").Router();
const passport = require("passport");
const {checkUnAuthenticated} = require("../middleware");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

router.get("/", checkUnAuthenticated, (req, res) =>{
    res.render("index");
});

//Login
router.post("/login", checkUnAuthenticated, passport.authenticate("local",{
    successRedirect: "dashboard",
    failureRedirect: "/",
    failureFlash: true
}));

//Register
router.get("/register", async(req, res) =>{
    // return res.redirect("/");
    let username = "TestBoi";
    let name = "TestBoy";
    let password = "dosentMatter";
    let email = "test@testy.com";
    let permissionLevel = 1;

    try{
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);
        
        let user = new User({
            username,name,email,password:hashedPassword,permissionLevel
        })
        await user.save();
        res.redirect("/");
    }catch(error){
        console.log(error);
        res.redirect("/");
    }

});

module.exports = router;