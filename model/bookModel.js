const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  bookName: {
    type: String,
    unique: true,
  },
  bookPrice: {
    type: Number,
  },
  isBnNumber: {
    type: Number,
  },
  authorName: {
    type: String,
  },
  publishedAt: {
    type: String,
  },
  image: {
    type: String,
  },
});
const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
