const Movie = require("../models/Movies");

// List all movies from MongoDB database
exports.moviesList = function(req, res, next) {
  req.app.locals.db
    .collection("movies")
    .find({})
    .toArray((err, result) => {
      if (err) {
        res.status(400).send({ error: err });
      }
      if (result === undefined || result.length === 0) {
        res.status(400).send({ error: "No movies in database" });
      } else {
        res.status(200).send(result);
      }
    });
};

// Select a movie by id from database
exports.movieDetails = function(req, res, next) {
  req.app.locals.db.collection("movies").findOne(
    {
      _id: req.params.id
    },
    (err, result) => {
      if (err) {
        res.status(400).send({ error: err });
      }
      if (result) {
        res.status(400).send({ error: "No movie matching that id was found" });
      } else {
        res.status(200).send(result);
      }
    }
  );
};

// Add a new movie to database
exports.movieAdd = function(req, res, next) {
  const { title, year, author, body } = req.body;
  const newMovie = new Movie(title, year, author, body);
  req.app.locals.db
    .collection("movies")
    .insertOne({ newMovie }, (err, result) => {
      if (err) {
        res.status(400).send({ error: err });
      }
      res.status(200).send(result);
    });
};

// Delete a movie from database
exports.moviesDelete = function(req, res, next) {
  req.app.locals.db.collection("movies").deleteOne(
    {
      _id: req.params.id
    },
    (err, result) => {
      if (err) {
        res.status(400).send({ error: err });
      }
      res.status(200).send(result);
    }
  );
};

// Update the info of a movie based in the id
exports.movieUpdate = function(req, res, next) {
  req.app.locals.db.collection("movies").updateOne(
    {
      _id: req.params.id
    },
    {
      $set: {
        title: req.body.title,
        year: req.body.year,
        author: req.body.author,
        body: req.body.body
      }
    },
    (err, result) => {
      if (err) {
        res.status(400).send({ error: err });
      }
      res.status(200).send(result);
    }
  );
};
