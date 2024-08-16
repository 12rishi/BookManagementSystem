const express = require("express");
const connectMongoose = require("./database");
const Book = require("./model/bookModel");
const multer = require("multer");
const { storage } = require("./middleware/multerConfig");
const fs = require("fs");

const app = express();
app.use(express.json());
const upload = multer({ storage: storage });

connectMongoose();
app.post("/book", upload.single("image"), async (req, res) => {
  const { bookName, bookPrice, isBnNumber, authorName, publishedAt } = req.body;
  const image = req.file.filename;
  const books = await Book.create({
    bookName,
    bookPrice,
    isBnNumber,
    authorName,
    publishedAt,
    image,
  });
  res.status(200).json({
    message: "successfully stored the data",
    books,
  });
});
app.get("/book", async (req, res) => {
  const books = await Book.find();
  res.status(200).json({
    message: "data fetched successfully",
    books: books,
  });
});
app.get("/book/:id", async (req, res) => {
  const { id } = req.params;
  const data = await Book.findById(id);
  res.status(200).json({
    message: "successfully fetched the single book",
    data: data,
  });
});
app.delete("/book/:id", async (req, res) => {
  const { id } = req.params;
  await Book.findByIdAndDelete(id);
  res.status(200).json({
    message: "successfully deleted",
  });
});
app.patch("/book/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { bookName, bookPrice, isBnNumber, authorName, publishedAt } = req.body;
  const oldData = await Book.findById(id);
  let fileName;
  if (req.file) {
    const oldImage = oldData.image;
    const urlLength = "http://localhost:3000/".length;
    const newImage = oldImage.slice(urlLength);
    console.log(newImage);

    fs.unlink(`storage/${newImage}`, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("deleted file successfully");
      }
    });
    fileName = `http://localhost:3000/${req.file.filename}`;
  }
  await Book.findByIdAndUpdate(id, {
    bookName,
    bookPrice,
    isBnNumber,
    authorName,
    publishedAt,
    image: fileName,
  });
  res.status(200).json({
    message: "successfully updated",
  });
});
app.use(express.static("./storage/"));
app.listen(3000, () => {
  console.log("server has started at port no 3000");
});
