const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Registro de usuario
public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({message: "Username and password are required"});
  }
  if (users.some(user => user.username === username)) {
    return res.status(409).json({message: "Username already exists"});
  }

  users.push({username: username, password: password});
  return res.status(201).json({message: "User registered successfully"});
});

// Obtener todos los libros
public_users.get('/', function (req, res){
  res.json(books);
});

// Obtener libro por ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  if (books[isbn]) {
    return res.json(books[isbn]);
  } else {
    return res.status(404).json({message: "Book not found"});
  }
});

// Obtener libros por autor
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author.toLowerCase();
  let results = [];

  Object.values(books).forEach(book => {
    if (book.author.toLowerCase() === author) {
      results.push(book);
    }
  });

  if (results.length > 0) {
    return res.json(results);
  } else {
    return res.status(404).json({message: "No books found for this author"});
  }
});

// Obtener libros por título
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title.toLowerCase();
  let results = [];

  Object.values(books).forEach(book => {
    if (book.title.toLowerCase() === title) {
      results.push(book);
    }
  });

  if (results.length > 0) {
    return res.json(results);
  } else {
    return res.status(404).json({message: "No books found with this title"});
  }
});

// Obtener reseñas del libro por ISBN
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  if (books[isbn]) {
    return res.json(books[isbn].reviews);
  } else {
    return res.status(404).json({message: "Book not found"});
  }
});

module.exports.general = public_users;
