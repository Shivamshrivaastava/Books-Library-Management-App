const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const MyBook = require('../models/MyBook');
const Book = require('../models/Books');


// GET /api/mybooks - get user's books
router.get('/', authMiddleware, async (req, res) => {
  try {
    const myBooks = await MyBook.find({ userId: req.user.id }).populate('bookId');
    res.json(myBooks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/mybooks/:bookId - add a book to user's list
router.post('/:bookId', authMiddleware, async (req, res) => {
  const { bookId } = req.params;

  try {
    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Check if already added
    const existing = await MyBook.findOne({ userId: req.user.id, bookId });
    if (existing) return res.status(400).json({ message: 'Book already added' });

    const myBook = new MyBook({ userId: req.user.id, bookId });
    await myBook.save();

    res.status(201).json({ message: 'Book added to My Books', myBook });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/mybooks/:bookId/status - update reading status
router.patch('/:bookId/status', authMiddleware, async (req, res) => {
  const { bookId } = req.params;
  const { status } = req.body;

  if (!['Want to Read', 'Currently Reading', 'Read'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const myBook = await MyBook.findOne({ userId: req.user.id, bookId });
    if (!myBook) return res.status(404).json({ message: 'Book not found in your list' });

    myBook.status = status;
    await myBook.save();

    res.json({ message: 'Status updated', myBook });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/mybooks/:bookId/rating - update rating
router.patch('/:bookId/rating', authMiddleware, async (req, res) => {
  const { bookId } = req.params;
  const { rating } = req.body;

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  try {
    const myBook = await MyBook.findOne({ userId: req.user.id, bookId });
    if (!myBook) return res.status(404).json({ message: 'Book not found in your list' });

    myBook.rating = rating;
    await myBook.save();

    res.json({ message: 'Rating updated', myBook });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
