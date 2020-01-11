const mongoose = require("mongoose");

payeeSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    firstDate:{
        type:Date, 
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model("Payee", payeeSchema);