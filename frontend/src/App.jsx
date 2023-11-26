import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateBook from "./components/CreateBook.jsx";
import Home from "./components/Home.jsx";
import DeleteBook from "./components/DeleteBook.jsx";
import EditBook from "./components/EditBook.jsx";
import ShowBook from "./components/ShowBook.jsx";

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/books/create" element={<CreateBook />} />
				<Route path="/books/detail/:id" element={<ShowBook />} />
				<Route path="/books/edit/:id" element={<EditBook />} />
				<Route path="/books/delete/:id" element={<DeleteBook />} />
			</Routes>
		</>
	);
};

export default App;
