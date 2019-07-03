const express = require("express");

const Document = require("../models/Document");
const Movie = require("../models/Movies");
const router = express.Router();

/**
 * Documents
 * Obtiene todos los documentos en la colección - /documents/all
 */
router.get("/documents/all", (req, res, next) => {
  req.app.locals.db
    .collection("documents")
    .find({})
    .toArray((err, result) => {
      if (err) {
        res.status(400).send({ error: err });
      }
      if (result === undefined || result.length === 0) {
        res.status(400).send({ error: "No documents in database" });
      } else {
        res.status(200).send(result);
      }
    });
});
/**
 * Movies
 * Obtiene todas las movies de la DB
 */
router.get("/movies/all", (req, res, next) => {
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
});

/**
 * Documents
 * Obtiene un documento específico en este caso basado
 * en una identificación del documento proporcionada por el cliente - /documents/:id
 */

router.get("/documents/:id", (req, res, next) => {
  req.app.locals.db.collection("documents").findOne(
    {
      _id: req.params.id
    },
    (err, result) => {
      if (err) {
        res.status(400).send({ error: err });
      }
      if (result === undefined) {
        res
          .status(400)
          .send({ error: "No document matching that id was found" });
      } else {
        res.status(200).send(result);
      }
    }
  );
});
/**
 * Movies
 * Obtiene una movie en concreto. Accediendo a esta con
 * su "id".
 */
router.get("/movies/:id", (req, res, next) => {
  req.app.locals.db.collection("movies").findOne(
    {
      _id: req.params.id
    },
    (err, result) => {
      if (err) {
        res.status(400).send({ error: err });
      }
      if (result === undefined) {
        res.status(400).send({ error: "No movie matching that id was found" });
      } else {
        res.status(200).send(result);
      }
    }
  );
});

/**
 * Documents
 * Carga un nuevo documento en la base de datos - /documents/new
 */
router.post("/documents/new", (req, res, next) => {
  const newDocument = new Document(
    req.body.title,
    req.body.username,
    req.body.body
  );
  req.app.locals.db.collection("documents").insertOne(
    {
      newDocument
    },
    (err, result) => {
      if (err) {
        res.status(400).send({ error: err });
      }
      res.status(200).send(result);
    }
  );
});

/**
 * Movies
 * Carga una nueva Movie a la DB
 */
router.post("/movies/new", (req, res, next) => {
  const newMovie = new Movie(
    req.body.title,
    req.body.year,
    req.body.author,
    req.body.body
  );
  req.app.locals.db.collection("movies").insertOne(
    {
      newMovie
    },
    (err, result) => {
      if (err) {
        res.status(400).send({ error: err });
      }
      res.status(200).send(result);
    }
  );
});

/**
 * Elimina un documento basado en una identificación de
 * documento proporcionada por el cliente - /documents/delete/:id
 */
router.delete("/documents/delete/:id", (req, res, next) => {
  req.app.locals.db.collection("documents").deleteOne(
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
});

/**
 * Movies
 * Eliminar una Movie basado en su id.
 */
router.delete("/movies/delete/:id", (req, res, next) => {
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
});

/**
 * Cambia un documento basado en un cuerpo de solicitud JSON
 * enviado por el cliente - /documents/edit/:id
 */
router.patch("/documents/edit/:id", (req, res, next) => {
  req.app.locals.db.collection("documents").updateOne(
    {
      _id: req.params.id
    },
    {
      $set: {
        title: req.body.title,
        username: req.body.username,
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
});

/**
 * Movies
 * Editamos una movie basandonos en su id de entrada
 */
router.patch("/movies/edit/:id", (req, res, next) => {
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
});

/**
 * Exportamos nuestro objeto router parapoder usarlo en el index.js
 * como middleware de router para la ruta /api.
 * Ruta completa sería /api/documents/
 */
module.exports = router;
