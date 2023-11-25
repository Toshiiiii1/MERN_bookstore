import express from "express";
import { PORT, db } from "./config.js";
import mongoose, { mongo } from "mongoose";

const app = express();

app.get("/", (req, res) => {
    return res.status(200).send("Hello world");
});

// starting app
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});

// connecting to database
mongoose.connect(db)
    .then(() => console.log("Connect to database successfully"))
    .catch((error) => console.log(error));