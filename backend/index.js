import express from "express";
import { PORT, db } from "./config.js";
import mongoose from "mongoose";
import router from "./routes/book.route.js";

const app = express();

app.use(express.json());

// using route
app.use("/books", router);

// handling CORS policy
app.use(cors({
	origin: 'http://localhost:3000',
	methods: ["GET", "POST", "PUT", "DELETE"],
	allowedHeaders: ['Content-Type']
}));

// home route
app.get("/", (req, res) => {
	return res.status(200).send("Hello world");
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
