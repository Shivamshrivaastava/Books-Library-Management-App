const express = require('express');
const router = express.Router();
const Book = require('../models/Books');

// GET /api/books - fetch all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
