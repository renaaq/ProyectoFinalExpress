const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{
  return users.some(user => user.username === username);
}

const authenticatedUser = (username,password)=>{
  return users.some(user => user.username === username && user.password === password);
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({message: "Username and password are required"});
  }

  if (!isValid(username)) {
    return res.status(404).json({message: "User not found"});
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({ username }, "fingerprint_customer", { expiresIn: 60* 60 }); // Token valid for 1 hour
    req.session.authorization = { accessToken, username };
    return res.status(200).json({message: "User logged in successfully", accessToken});
  } else {
    return res.status(401).json({message: "Invalid username or password"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const username = req.session.authorization?.username;
  const isbn = req.params.isbn;
  const review = req.query.review;

  if (!username) {
    return res.status(403).json({message: "User not authenticated"});
  }
  if (!review) {
    return res.status(400).json({message: "Review is required"});
  }
  if (!books.books[isbn]) {
    return res.status(404).json({message: "Book not found"});
  }

  if (!books.books[isbn].reviews) {
    books.books[isbn].reviews = {};
  }
  books.books[isbn].reviews[username] = review;

  return res.status(200).json({message: `review added successfully by ${username}`})
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
