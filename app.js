require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const movieRoutes = require("./routes/movies");
const session = require("express-session");

const authRoutes = require("./routes/auth");

const app = express();

app.use(session({

    secret:"movieappsecret",

    resave:false,

    saveUninitialized:false

}));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/",authRoutes);

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/", movieRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});