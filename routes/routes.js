const express = require("express");
const router = express.Router();

//Require controller modules.
const movie_controller = require("../controllers/movieController");

/// Movies Routes ///
// Get full catalog of movies
router.get("/movies/all", movie_controller.moviesList);

// Get request for one movie by id
router.get("/movies/:id", movie_controller.movieDetails);

// Post request  to add a new movie
router.post("/movies/new", movie_controller.movieAdd);

// Delete a movie
router.delete("/movies/delete/:id", movie_controller.moviesDelete);

// Update the info of a movie
router.patch("/movies/edit/:id", movie_controller.movieUpdate);

//Show static files
router.use("/index", express.static("public"));

// Export the router object
module.exports = router;
