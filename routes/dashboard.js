const router = require("express").Router();
const {checkAuthentication} = require("../middleware.js");

router.use(checkAuthentication);

router.get("/", (req, res) =>{
    res.render("dashboard", {name:req.user.name});
});

module.exports = router;