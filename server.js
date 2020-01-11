if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.set("views", __dirname+"/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }))
 
// parse application/json
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

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on("error", err => console.error(err));
db.once("open", () => console.log("Connection to DB"));

const indexRouter = require("./routes/index");
const dashRouter = require("./routes/dashboard");

app.use("/", indexRouter);
app.use("/dashboard", dashRouter);

app.listen(process.env.PORT || 3000);