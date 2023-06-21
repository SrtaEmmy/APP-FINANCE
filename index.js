const express = require("express");
const app = express();
const expHbs = require("express-handlebars");
const path = require("path");
const method_override = require("method-override");
require("./db");
const flash = require("express-flash");
const session = require("express-session");


app.set("port", process.env.PORT||3000);

//handlebars
const hbs = expHbs.create({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    extname: ".hbs",
});
app.set('view engine', '.hbs');

//configurar e-flash y e-session
// app.use(session({
//     secret: 'my-little-secret',
//     resave: false,
//     saveUninitialized: true
// }));
// app.use(flash());


app.listen(app.get("port"), ()=>{
    console.log("server on port", app.get("port"));
});

//midlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));//permite enviar datos mediante post/get
app.use(method_override('_method')) //permite usar delete, put

//routes
app.use(require("./routes/app"));





