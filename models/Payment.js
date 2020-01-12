const mongoose = require("mongoose");

paymentSchema = mongoose.Schema({
    amount:{
        type:Number,
        required: true
    },
    date:{
        type:Date, 
        required: true
    },
    payee:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Payee"
    }
});

module.exports = mongoose.model("Payment", paymentSchema);