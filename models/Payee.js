const mongoose = require("mongoose");

payeeSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    }
});

module.exports = mongoose.model("Payee", payeeSchema);