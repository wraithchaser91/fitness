if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
const express = require("express");
const app = express();

//view engine
const expressLayouts = require("express-ejs-layouts");
app.set("view engine", "ejs");
app.set("views", __dirname+"/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

//parsing tools
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }))
app.use(bodyParser.json());

//init passport
const passport = require("passport");
const initPassport = require("./passport-config");
initPassport(passport);
const flash = require("express-flash");
const session = require("express-session");
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//connect to a database
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on("error", err => console.error(err));
db.once("open", () => console.log("Connection to DB"));

//setting up routes
const indexRouter = require("./routes/index");
const dashRouter = require("./routes/dashboard");
const adminRouter = require("./routes/admin");
app.use("/", indexRouter);
app.use("/dashboard", dashRouter);
app.use("/admin", adminRouter);

//finally, start listening
app.listen(process.env.PORT || 3000);