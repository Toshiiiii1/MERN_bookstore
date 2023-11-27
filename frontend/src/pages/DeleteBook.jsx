import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton.jsx";
import Spinner from "../components/Spinner.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DeleteBook = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { id } = useParams();
	// deleting book
	const handleEditBook = () => {
		setLoading(true);
		axios
			.delete(`http://localhost:5555/books/${id}`)
			.then((res) => {
				setLoading(false);
				alert(res.data.message);
				navigate("/");
			})
			.catch((error) => {
				setLoading(false);
				alert("Error");
				console.log(error);
			});
	};
	return (
		<>
			<div className="flex justify-center">
				<div className="p-4">
					<BackButton />
					<h1 className="text-3xl my-4">Delete book</h1>
					{loading ? <Spinner /> : ""}
					<div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
						<h3 className="text-2xl">
							Are you sure you want to delete this book?
						</h3>
						<button
							className="p-4 bg-red-600 text-white m-8 w-full"
							onClick={handleEditBook}
						>
							Yes
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default DeleteBook;
