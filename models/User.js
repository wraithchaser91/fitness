const mongoose = require("mongoose");

userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    permissionLevel:{
        type:Number,
        required: true
    }
});

module.exports = mongoose.model("User", userSchema);