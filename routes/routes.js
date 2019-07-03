const express = require("express");
const router = express.Router();

//Require controller modules.
const movie_controller = require("../controllers/movieController");
const Movie = require("../models/Movies");

/// Movies Routes ///
// Get full catalog of movies
router.get("/movies/all", movie_controller.movies_list);

// Get request for one movie by id
router.get("/movies/:id", movie_controller.movie_details);

// Post request  to add a new movie
router.post("/movies/new", movie_controller.movie_add);

// Delete a movie
router.delete("/movies/delete/:id", movie_controller.movies_delete);

// Update the info of a movie
router.patch("/movies/edit/:id", movie_controller.movie_update);

// Export the router object
module.exports = router;
