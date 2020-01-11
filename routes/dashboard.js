const router = require("express").Router();
const {checkAuthentication} = require("../middleware.js");

router.use(checkAuthentication);

router.get("/", (req, res) =>{
    let permLevel = req.user.permissionLevel;
    if(permLevel === 0)res.redirect("admin");
    else res.render("dashboard", {name:req.user.name});
});

module.exports = router;