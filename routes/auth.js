const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

const User = require("../models/User");


router.get("/login",(req,res)=>{

    res.render("login",{error:null});

});


router.get("/register",(req,res)=>{

    res.render("register");

});

router.post("/register",async(req,res)=>{

    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password,10);

    await User.create({

        email,
        password:hashedPassword

    });

    res.redirect("/login");

});

/* Login User */
router.post("/login",async(req,res)=>{

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(!user){

        return res.render("login",{

            error:"User not found"

        });

    }

    const isMatch = await bcrypt.compare(

        password,
        user.password

    );

    if(!isMatch){

        return res.render("login",{

            error:"Incorrect Password"

        });

    }

    req.session.user = user;

    res.redirect("/");

});

module.exports = router;