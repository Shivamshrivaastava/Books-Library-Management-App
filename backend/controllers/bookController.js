const Book = require("../models/Book")

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", category = "" } = req.query

    // Build query
    const query = {}
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
        { isbn: { $regex: search, $options: "i" } },
      ]
    }
    if (category) {
      query.category = category
    }

    const skip = (page - 1) * limit
    const totalBooks = await Book.countDocuments(query)
    const books = await Book.find(query)
      .populate("addedBy", "name email")
      .skip(skip)
      .limit(Number.parseInt(limit))
      .sort({ createdAt: -1 })

    res.json({
      books,
      pagination: {
        currentPage: Number.parseInt(page),
        totalPages: Math.ceil(totalBooks / limit),
        totalBooks,
        hasNext: page < Math.ceil(totalBooks / limit),
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    console.error("Get books error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

// Get single book
const getBookById = async (req, res) => {
  try {
    const { id } = req.params

    const book = await Book.findById(id).populate("addedBy", "name email")
    if (!book) {
      return res.status(404).json({ error: "Book not found" })
    }

    res.json({ book })
  } catch (error) {
    console.error("Get book error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

// Create new book
const createBook = async (req, res) => {
  try {
    const { title, author, isbn, category, description, totalCopies, publishedYear, coverImage } = req.body

    // Validation
    if (!title || !author || !isbn) {
      return res.status(400).json({ error: "Title, author, and ISBN are required" })
    }

    // Check if book exists
    const existingBook = await Book.findOne({ isbn })
    if (existingBook) {
      return res.status(400).json({ error: "Book with this ISBN already exists" })
    }

    const book = await Book.create({
      title,
      author,
      isbn,
      category: category || "General",
      description: description || "",
      totalCopies: totalCopies || 1,
      availableCopies: totalCopies || 1,
      publishedYear,
      coverImage: coverImage || "",
      addedBy: req.user.userId,
    })

    const populatedBook = await Book.findById(book._id).populate("addedBy", "name email")

    res.status(201).json({
      message: "Book added successfully",
      book: populatedBook,
    })
  } catch (error) {
    console.error("Create book error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

// Update book
const updateBook = async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body

    const existingBook = await Book.findById(id)
    if (!existingBook) {
      return res.status(404).json({ error: "Book not found" })
    }

    // If totalCopies is being updated, adjust availableCopies
    if (updateData.totalCopies !== undefined) {
      const difference = updateData.totalCopies - existingBook.totalCopies
      updateData.availableCopies = Math.max(0, existingBook.availableCopies + difference)
    }

    const book = await Book.findByIdAndUpdate(id, updateData, { new: true }).populate("addedBy", "name email")

    res.json({
      message: "Book updated successfully",
      book,
    })
  } catch (error) {
    console.error("Update book error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

// Delete book
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params

    const book = await Book.findByIdAndDelete(id)
    if (!book) {
      return res.status(404).json({ error: "Book not found" })
    }

    res.json({ message: "Book deleted successfully" })
  } catch (error) {
    console.error("Delete book error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
}
