const express = require("express");
const connectMongoose = require("./database");
const Book = require("./model/bookModel");

const app = express();
app.use(express.json());

connectMongoose();
app.post("/book", async (req, res) => {
  const { bookName, bookPrice, isBnNumber, authorName, publishedAt } = req.body;
  const books = await Book.create({
    bookName,
    bookPrice,
    isBnNumber,
    authorName,
    publishedAt,
  });
  res.status(200).json({
    message: "successfully stored the data",
  });
});
app.get("/book", async (req, res) => {
  const books = await Book.find();
  res.status(200).json({
    message: "data fetched successfully",
    books: books,
  });
});
app.listen(3000, () => {
  console.log("server has started at port no 3000");
});
