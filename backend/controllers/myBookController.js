const MyBook = require("../models/MyBook")
const Book = require("../models/Book")

// Get user's books
const getMyBooks = async (req, res) => {
  try {
    const { status } = req.query

    const query = { userId: req.user.userId }
    if (status) {
      query.status = status
    }

    const myBooks = await MyBook.find(query)
      .populate("bookId", "title author isbn category coverImage")
      .sort({ createdAt: -1 })

    res.json({ myBooks })
  } catch (error) {
    console.error("Get my books error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

// Add book to user's list
const addToMyBooks = async (req, res) => {
  try {
    const { bookId } = req.params
    const { status = "Want to Read" } = req.body

    // Check if book exists
    const book = await Book.findById(bookId)
    if (!book) {
      return res.status(404).json({ error: "Book not found" })
    }

    // Check if already in user's list
    const existingMyBook = await MyBook.findOne({
      userId: req.user.userId,
      bookId,
    })

    if (existingMyBook) {
      return res.status(400).json({ error: "Book already in your list" })
    }

    const myBook = await MyBook.create({
      userId: req.user.userId,
      bookId,
      status,
    })

    const populatedMyBook = await MyBook.findById(myBook._id).populate(
      "bookId",
      "title author isbn category coverImage",
    )

    res.status(201).json({
      message: "Book added to your list",
      myBook: populatedMyBook,
    })
  } catch (error) {
    console.error("Add to my books error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

// Update book status
const updateBookStatus = async (req, res) => {
  try {
    const { bookId } = req.params
    const { status } = req.body

    const validStatuses = ["Want to Read", "Currently Reading", "Read"]
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: "Invalid status. Must be one of: " + validStatuses.join(", "),
      })
    }

    const myBook = await MyBook.findOneAndUpdate(
      { userId: req.user.userId, bookId },
      { status },
      { new: true },
    ).populate("bookId", "title author isbn category coverImage")

    if (!myBook) {
      return res.status(404).json({ error: "Book not found in your list" })
    }

    res.json({
      message: "Status updated successfully",
      myBook,
    })
  } catch (error) {
    console.error("Update status error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

// Update book rating
const updateBookRating = async (req, res) => {
  try {
    const { bookId } = req.params
    const { rating } = req.body

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" })
    }

    const myBook = await MyBook.findOneAndUpdate(
      { userId: req.user.userId, bookId },
      { rating },
      { new: true },
    ).populate("bookId", "title author isbn category coverImage")

    if (!myBook) {
      return res.status(404).json({ error: "Book not found in your list" })
    }

    res.json({
      message: "Rating updated successfully",
      myBook,
    })
  } catch (error) {
    console.error("Update rating error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

// Remove book from user's list
const removeFromMyBooks = async (req, res) => {
  try {
    const { bookId } = req.params

    const myBook = await MyBook.findOneAndDelete({
      userId: req.user.userId,
      bookId,
    })

    if (!myBook) {
      return res.status(404).json({ error: "Book not found in your list" })
    }

    res.json({ message: "Book removed from your list" })
  } catch (error) {
    console.error("Remove from my books error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

module.exports = {
  getMyBooks,
  addToMyBooks,
  updateBookStatus,
  updateBookRating,
  removeFromMyBooks,
}
