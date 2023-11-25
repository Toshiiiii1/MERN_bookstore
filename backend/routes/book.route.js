import {Book} from "../models/book.model.js"
import express from "express";

const router = express.Router();

// getting all books route
router.get("/", async (req, res) => {
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
router.get("/:id", async (req, res) => {
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
router.post("/", async (req, res) => {
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
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
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

export default router;