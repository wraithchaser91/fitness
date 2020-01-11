const router = require("express").Router();
// const middleware = require("../middleware.js");

router.get("/", (req, res) =>{
    res.render("dashboard", {name:req.user.name});
});

module.exports = router;