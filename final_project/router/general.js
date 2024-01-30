
const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Get the book list available in the shop using promise callbacks
public_users.get('/', function (req, res, next) {
    // Create a promise to fetch the book list
    const getBookListPromise = new Promise((resolve, reject) => {
      // Simulate asynchronous operation (e.g., fetching data from a database)
      setTimeout(() => {
        if (books) {
          resolve(books);
        } else {
          reject(new Error("Failed to fetch book list"));
        }
      }, 1000); // Simulate delay of 1 second
    });
  
    // Handle the promise using callbacks
    getBookListPromise.then((bookList) => {
      // Send the book list as JSON string with proper formatting
      res.send(JSON.stringify(bookList, null, 4));
    }).catch((error) => {
      // Handle error if promise is rejected
      res.status(500).json({ message: error.message });
    });
  });


  
// Get book details based on ISBN using promise callbacks
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
  
    // Create a promise to fetch book details by ISBN
    const getBookDetailsPromise = new Promise((resolve, reject) => {
      // Simulate asynchronous operation (e.g., fetching data from a database)
      setTimeout(() => {
        if (books[isbn]) {
          resolve(books[isbn]);
        } else {
          reject(new Error("Book not found"));
        }
      }, 1000); // Simulate delay of 1 second
    });
  
    // Handle the promise using callbacks
    getBookDetailsPromise.then((bookDetails) => {
      // Send book details as JSON response
      res.json(bookDetails);
    }).catch((error) => {
      // Handle error if promise is rejected
      res.status(404).json({ message: error.message });
    });
  });



// Get book details based on author using promise callbacks
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
  
    // Create a promise to fetch books by author
    const getBooksByAuthorPromise = new Promise((resolve, reject) => {
      // Simulate asynchronous operation (e.g., fetching data from a database)
      setTimeout(() => {
        const authorBooks = Object.values(books).filter(book => book.author === author);
        if (authorBooks.length > 0) {
          resolve(authorBooks);
        } else {
          reject(new Error("Books by author not found"));
        }
      }, 1000); // Simulate delay of 1 second
    });
  
    // Handle the promise using callbacks
    getBooksByAuthorPromise.then((authorBooks) => {
      // Send books by author as JSON response
      res.json(authorBooks);
    }).catch((error) => {
      // Handle error if promise is rejected
      res.status(404).json({ message: error.message });
    });
  });



// Get book details based on author using promise callbacks
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
  
    // Create a promise to fetch books by author
    const getBooksByAuthorPromise = new Promise((resolve, reject) => {
      // Simulate asynchronous operation (e.g., fetching data from a database)
      setTimeout(() => {
        const authorBooks = Object.values(books).filter(book => book.author === author);
        if (authorBooks.length > 0) {
          resolve(authorBooks);
        } else {
          reject(new Error("Books by author not found"));
        }
      }, 1000); // Simulate delay of 1 second
    });
  
    // Handle the promise using callbacks
    getBooksByAuthorPromise.then((authorBooks) => {
      // Send books by author as JSON response
      res.json(authorBooks);
    }).catch((error) => {
      // Handle error if promise is rejected
      res.status(404).json({ message: error.message });
    });
  });


  
// Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn] && books[isbn].reviews) {
    return res.json(books[isbn].reviews);
  } else {
    return res.status(404).json({ message: "Reviews not found for the book" });
  }
});

module.exports.general = public_users;

// Get all books based on title
/*
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  const titleBooks = Object.values(books).filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
  if (titleBooks.length > 0) {
    return res.json(titleBooks);
  } else {
    return res.status(404).json({ message: "Books with title not found" });
  }
});
*/

// Get book details based on author
/*
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  const authorBooks = Object.values(books).filter(book => book.author === author);
  if (authorBooks.length > 0) {
    return res.json(authorBooks);
  } else {
    return res.status(404).json({ message: "Books by author not found" });
  }
});
*/

// Get book details based on ISBN
/*
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.json(books[isbn]);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});
*/

// Get the book list available in the shop
/*public_users.get('/',function (req, res,next) {
   Send the book list as JSON string with proper formatting
  return res.send(JSON.stringify(books, null, 4));
});*/