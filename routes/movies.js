const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

// Home Page
router.get("/", async (req, res) => {
    const movies = await Movie.find();
    res.render("index", { movies });
});

// Add Movie
router.post("/add", async (req, res) => {
    const { title, year, genre, rating } = req.body;

    await Movie.create({
        title,
        year,
        genre,
        rating
    });

    res.redirect("/");
});

// Search Movie
router.get("/search", async (req, res) => {
    const query = req.query.q;

    const movies = await Movie.find({
        title: { $regex: query, $options: "i" }
    });

    res.render("index", { movies });
});

module.exports = router;