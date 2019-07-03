const test = require("tape");
const request = require("supertest");
const express = require("express");

const Movie = require("../models/Movies");
const app = require("../index");
let movieId;

before(done => {
  app.on("APP_STARTED", () => {
    done();
  });
});

describe("API Integration Test", () => {
  it("Runs all tests", done => {
    test("/api/movies/new", assert => {
      request(app)
        .post("/api/movies/new")
        .send(new Movie("test title", "test year", "test author", "test body"))
        .expect(200)
        .end((err, res) => {
          if (err) return assert.fail(JSON.stringify(res));
          assert.pass("Created a new movie successfully, test passed!");
          assert.end();
        });
    });

    test("/api/movies/all", assert => {
      request(app)
        .get("/api/movies/all")
        .expect(200)
        .end((err, res) => {
          if (err) return assert.fail(JSON.stringify(res));
          movieId = res.body[0]._id;
          assert.pass("Got all movies successfully, test passed!");
          assert.end();
        });
    });

    test("/api/movies/:id", assert => {
      request(app)
        .get(`/api/movies/${movieId}`)
        .expect(200)
        .end((err, res) => {
          if (err) return assert.fail(JSON.stringify(res));
          assert.pass("Got a specific movie successfully, test passed!");
          assert.end();
        });
    });

    test("/api/movies/edit/:id", assert => {
      request(app)
        .patch(`/api/movies/edit/${movieId}`)
        .send(
          new Movie(
            "test title edit",
            "test year edit",
            "test author edit",
            "test body edit"
          )
        )
        .expect(200)
        .end((err, res) => {
          if (err) return assert.fail(JSON.stringify(res));
          assert.pass("Edited a movie successfully, test passed!");
          assert.end();
        });
    });

    test("/api/movies/delete/:id", assert => {
      request(app)
        .delete(`/api/movies/delete/${movieId}`)
        .expect(200)
        .end((err, res) => {
          if (err) return assert.fail(JSON.stringify(res));
          assert.pass("Deleted a specific movie successfully, test passed!");
          assert.end();
          done();
        });
    });
  });
});
