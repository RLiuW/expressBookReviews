const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    let validusers = users.filter((user)=>{
        return (user.username === username && user.password === password)
      });
      if(validusers.length > 0){
        return true;
      } else {
        return false;
      }
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const { isbn } = req.params;
    const { username } = req.session; // Assuming username is stored in the session
  
    // Check if the user is authenticated
   // if (!username || !isValid(username)) {
   //   return res.status(401).json({ message: "Unauthorized" });
    //}
  
    // Check if the book with provided ISBN exists
    if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found" });
    }
  
    const { review } = req.body;
  
    // Check if review query parameter is provided
    if (!review) {
      return res.status(400).json({ message: "Review is required" });
    }
  
    // Check if the user has already posted a review for the same ISBN
    if (books[isbn].reviews && books[isbn].reviews[username]) {
      // Modify existing review
      books[isbn].reviews[username] = review;
      return res.json({ message: "Review updated successfully" });
    } else {
      // Add new review
      if (!books[isbn].reviews) {
        books[isbn].reviews = {};
      }
      books[isbn].reviews[username] = review;
      return res.json({ message: "Review added successfully" });
    }
  });

  regd_users.delete("/auth/review/:isbn", (req, res) => {
    const { isbn } = req.params;
    const { username } = req.session; // Assuming username is stored in the session
  
    if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found" });
    }
  
   
    // Check if the user has already posted a review for the same ISBN
    if (books[isbn].reviews && books[isbn].reviews[username]) {
      // Modify existing review
      delete books[isbn].reviews[username];
      return res.json({ message: "Review deleted successfully" });
    } 
  });


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
