const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');


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

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  const books = require("./booksdb.js").books;

public_users.get('/', function (req, res){
  res.send(JSON.stringify(books, null, 4));
})
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;

  if (books[isbn]) {
    return res.send(books[isbn])
  } else {
    return res.status(404).json({message: "Book not found"});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author.toLowerCase();
  let results = [];

  Object.values(books).forEach(book => {
    if (book.author.toLowerCase() === author) {
      results.push(book);
    }
  });
  
  if (results.length > 0) {
    return res.send(results);
  } else {
    return res.status(404).json({message: "No books found for this author"});
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title.toLowerCase();
  let results = [];

  Object.values(books).forEach(book => {
    if (book.title.toLowerCase() === title) {
      results.push(book);
    }
  });

  if (results.length > 0) {
    return res.send(results);
  } else {
    return res.status(404).json({message: "No books found with this title"});
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;

  if (books[isbn]) {
    return res.send(books[isbn].reviews);
  } else {
    return res.status(404).json({message: "Book not found"});
  }
});

module.exports.general = public_users;
