const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/appFinance", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("DB is connected"))
.catch(err => console.log(err));
//requerir este archivo (db.js) en index.js