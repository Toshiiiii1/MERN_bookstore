import express from "express";
import { PORT, db } from "./config.js";
import mongoose, { mongo } from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

app.use(express.json());

// home route
app.get("/", (req, res) => {
	return res.status(200).send("Hello world");
});

// getting all books route
app.get("/books", async (req, res) => {
	try {
		const books = await Book.find({});
		return res.status(200).send({
			count: books.length,
			data: books,
		});
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
});

// getting a book by id route
app.get("/books/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const book = await Book.findById(id);
        if (!book) {
			return res.status(404).send({ message: "Book not found" });
		}
		return res.status(200).send(book);
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
});

// creating a book route
app.post("/books", async (req, res) => {
	try {
		if (!req.body.title || !req.body.author || !req.body.publishYear) {
			return res.status(400).send({
				message:
					"Send all required fields: title, author and publish year",
			});
		}
		const newBook = {
			title: req.body.title,
			author: req.body.author,
			publishYear: req.body.publishYear,
		};
		const book = await Book.create(newBook);
		return res.status(200).send(book);
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
});

// updating a book route
app.put("/books/:id", async (req, res) => {
	try {
		if (!req.body.title || !req.body.author || !req.body.publishYear) {
			return res.status(400).send({
				message:
					"Send all required fields: title, author and publish year",
			});
		}
		const { id } = req.params;
		const result = await Book.findByIdAndUpdate(id, req.body);
		if (!result) {
			return res.status(404).send({ message: "Book not found" });
		}
		return res.status(404).send({ message: "Updated book successfully" });
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
});

// deleting a book route
app.delete("/books/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const result = await Book.findByIdAndDelete(id, req.body);
		if (!result) {
			return res.status(404).send({ message: "Book not found" });
		}
		return res.status(404).send({ message: "Deleted book successfully" });
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
});

// starting app
app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`);
});

// connecting to database
mongoose
	.connect(db)
	.then(() => console.log("Connected to database successfully"))
	.catch((error) => console.log(error));
