/**
 * Es una clase de Javascript con un constructor que toma 3 cadenas y las almacena.
 * Esto actúa como el esquema para los datos en MongoDB.
 */
module.exports = class Document {
  constructor(title, username, body) {
    this.title = title;
    this.username = username;
    this.body = body;
  }
};
