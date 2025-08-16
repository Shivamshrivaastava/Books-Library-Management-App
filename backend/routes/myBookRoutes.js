const express = require("express")
const {
  getMyBooks,
  addToMyBooks,
  updateBookStatus,
  updateBookRating,
  removeFromMyBooks,
} = require("../controllers/myBookController")
const { authenticateToken } = require("../middleware/auth")

const router = express.Router()

// All routes require authentication
router.use(authenticateToken)

router.get("/", getMyBooks)
router.post("/:bookId", addToMyBooks)
router.patch("/:bookId/status", updateBookStatus)
router.patch("/:bookId/rating", updateBookRating)
router.delete("/:bookId", removeFromMyBooks)

module.exports = router
