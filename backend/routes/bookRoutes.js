const express = require("express")
const { getAllBooks, getBookById, createBook, updateBook, deleteBook } = require("../controllers/bookController")
const { authenticateToken, requireAdmin } = require("../middleware/auth")

const router = express.Router()

// Public routes
router.get("/", getAllBooks)
router.get("/:id", getBookById)

// Protected routes
router.post("/", authenticateToken, createBook)
router.put("/:id", authenticateToken, updateBook)
router.delete("/:id", authenticateToken, deleteBook)

module.exports = router
