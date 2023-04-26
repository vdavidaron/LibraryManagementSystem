const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 5002;

const connectionString = "mongodb+srv://dbUser:dbUserPassword@cluster0.w7bvenf.mongodb.net/book_search_service";

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
});

const Book = mongoose.model("Book", bookSchema);

app.use(cors());

app.get("/books", async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

app.get("/books/:id", async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ msg: "Book not found" });
    }
});

app.get("/books/search/:query", async (req, res) => {
    const query = req.params.query;
    const books = await Book.find({ $text: { $search: query } });
    res.json(books);
});

app.listen(port, () => {
    console.log(`Book search service listening at http://localhost:${port}`);
});
