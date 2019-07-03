/**
 * Es una clase de Javascript con un constructor que toma 3 cadenas y las almacena.
 * Esto actúa como el esquema para los datos en MongoDB.
 */
module.exports = class Movie {
  constructor(title, year, author, body) {
    this.title = title;
    this.year = year;
    this.author = author;
    this.body = body;
  }
};
