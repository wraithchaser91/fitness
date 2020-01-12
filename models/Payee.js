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
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});

module.exports = mongoose.model("Payee", payeeSchema);