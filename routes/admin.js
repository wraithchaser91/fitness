const router = require("express").Router();
const {checkAuthentication, checkAdmin} = require("../middleware.js");
const {validation} = require("../validation");
const bcrypt = require("bcryptjs");
const Payee = require("../models/Payee");
const Payment = require("../models/Payment");
const User = require("../models/User");

//method override
const methodOverride = require("method-override");
router.use(methodOverride("_method"));

router.use(checkAuthentication);
router.use(checkAdmin);

router.get("/", (req, res)=>{
    res.render("admin", {username: req.user.username, css:"admin/dashboard"});
});

//////////*******MANAGING PAYEES******\\\\\\\\\\\\\\ 
router.get("/payees", async(req, res)=>{
    let payees;
    let payments;
    try{
        payees = await Payee.find({}).populate("user").sort({name:1}).exec();
        payments = await Payment.find({}).populate("payee").sort({_id:-1}).limit(10).exec();
    }catch(error){
        errorLog(error);
        payees = [];
        payments = [];
    }
    res.render("admin/payees", {payees, payments, css:"admin/payees"});
});

router.get("/newPayee", (req, res)=>{
    res.render("admin/newPayee", {css:"admin/payees"});
});

router.post("/newPayee", async(req, res)=>{
    let name = req.body.name;
    if(name && name != "undefined"){
        try{
            const payee = new Payee({name});
            await payee.save();
            res.redirect("/admin/payees");
        }catch(error){
            errorLog(error);
            res.render("admin/newPayee");
        }
    }else{
        res.render("admin/newPayee");
    }
});

router.get("/payees/:id", async(req, res)=>{
    try{
        const payee = await Payee.findById(req.params.id);
        const payments = await Payment.find({payee: payee}).sort({date:-1}).exec();
        res.render("admin/payee", {payee, payments, css:"admin/payee"});
    }catch(error){
        errorLog(error);
        res.redirect("/admin/payees");
    }
});

router.post("/newPayment", async(req, res)=>{
    if(req.body.date === "" || req.body.amount === ""){
        res.redirect("/admin/payees");
    }else{
        const payment = new Payment({
            amount: req.body.amount,
            date: new Date(req.body.date),
            payee: req.body.payee
        });
        try{
            await payment.save();
            res.redirect("/admin/payees");
        }catch(error){
            errorLog(error);
            res.redirect("/admin/payees")
        }
    }
});

router.get("/register/:id", async(req, res)=>{
    try{
        const payee = await Payee.findById(req.params.id);
        res.render("admin/register", {payee, user:new User(), message:"", css:"admin/register"});
    }catch(error){
        errorLog(error);
        res.redirect("/admin/payees");
    }
});

router.post("/register", async(req, res)=>{
    let user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password:"",
        isTempPassword:true,
        permissionLevel:req.body.permissions
    });
    try{
        const payee = await Payee.findOne({name:req.body.name});
        const {error} = validate(req.body);
        if(error){
            return res.render("admin/register", {payee, user, message:`${error}`, css:"admin/register"});
        }else{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashedPassword;
            await user.save();
            payee.user = user;
            await payee.save();
            res.redirect("/admin/payees");
        }
    }catch(error){
        errorLog(error);
        res.render("admin/register", {payee, user, message:`Error: ${error}`, css:"admin/register"});
    }
});

//////////*******MANAGING RECORDS******\\\\\\\\\\\\\\ 
router.get("/records", async(req, res)=>{
    let payments;
    let payees;
    try{
        payments = await Payment.find({}).populate("payee").sort({date:-1}).exec();
        payees = await Payee.find({});
    }catch(error){
        errorLog(error);
        payments = [];
        payees = [];
    }
    res.render("admin/records", {payments, payees, css:"admin/records"});
});

//////////*******MANAGING USERS******\\\\\\\\\\\\\\ 
router.get("/panel", async(req, res)=>{
    let users;
    try{
        users = await User.find({});
    }catch(error){
        errorLog(error);
        users = [];
    }
    res.render("admin/panel", {users, css:"admin/panel"});
});

router.get("/panel/user/:id", async(req, res)=>{
    let user;
    try{
        user = await User.findById(req.params.id);
        let ableToUpdate = true;
        if(user.permissionLevel === 0){
            //need to find out if only admin
            const admins = await User.find({permissionLevel: 0});
            if(admins.length <= 1)ableToUpdate = false;
        }
        res.render("admin/user", {user, css:"admin/user", ableToUpdate});
    }catch(error){
        errorLog(error);
        res.redirect("/admin/panel");
    }
});

router.get("/panel/user/update/:id", async(req, res)=>{
    let user;
    try{
        user = await User.findById(req.params.id);
        res.render("admin/updateUser", {user, message:"", css:"admin/update"});
    }catch(error){
        errorLog(error);
        res.render("admin/updateUser", {user, message:error, css:"admin/update"});
    }
});

router.post("/panel/user/update", async(req, res)=>{
    try{
        const user = await User.findOne({name:req.body.name});
        const {error} = validate(req.body);
        if(error){
            return res.render(`admin/updateUser`, {user, message:error, css:"admin/update"});
        }else{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashedPassword;
            user.username = req.body.username;
            user.email = req.body.email;
            user.permissionLevel = req.body.permissions;
            user.isTempPassword = true;
            await user.save();
            res.redirect(`/admin/panel/user/${user.id}`);
        }
    }catch(error){
        errorLog(error);
        res.render(`admin/updateUser`, {user, message:error, css:"admin/update"});
    }
});

router.delete("/panel/unregister/:id", async(req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        let payee = await Payee.findOne({user:user});
        if(payee){
            payee.user = null;
            await payee.save();
        }
        await user.remove();
        res.redirect("/admin/panel");
    }catch(error){
        errorLog(error);
        res.redirect("/admin/panel");
    }
});

//logout route
router.delete("/logout", (req, res)=>{
    req.logOut();
    res.redirect("/");
});

errorLog = err =>{
    console.log(`ERROR: ${err}`);
}

module.exports = router;