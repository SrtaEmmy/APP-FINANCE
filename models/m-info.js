const mongoose = require("mongoose");
const {Schema} = mongoose;

const infoSchema = new Schema({
    description: {type: String},
    amount: {type: Number},
    isIncome: {type: Boolean},
    date: {type: Date, default: Date.now},
});

module.exports = mongoose.model("information", infoSchema);