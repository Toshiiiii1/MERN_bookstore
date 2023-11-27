import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton.jsx";
import Spinner from "../components/Spinner.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {useSnackbar} from "notistack";

const EditBook = () => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [publishYear, setPublishYear] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const {id} = useParams(); // getting id of specific book
    const {enqueueSnackbar} = useSnackbar();
	// getting specific book
	useEffect(() => {
		setLoading(true);
		axios
			.get(`http://localhost:5555/books/${id}`)
			.then((res) => {
				setTitle(res.data.title);
				setAuthor(res.data.author);
				setPublishYear(res.data.publishYear);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				alert("Error");
				console.log(error.message);
			});
	}, []);
	// updating book
	const handleEditBook = () => {
		const data = {
			title,
			author,
			publishYear,
		};
		setLoading(true);
		axios
			.put(`http://localhost:5555/books/${id}`, data)
			.then((res) => {
				setLoading(false);
				enqueueSnackbar("Successfully", {variant: "success"});
				navigate("/");
			})
			.catch((error) => {
				setLoading(false);
				enqueueSnackbar("Error", {variant: "error"});
				console.log(error);
			});
	};

	return (
		<>
            <div className="flex justify-center">
                <div className="p-4">
                    <BackButton />
                    <h1 className="text-3xl my-4">Edit book</h1>
                    {loading ? <Spinner /> : ""}
                    <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                        <div className="my-4">
                            <label className="text-xl mr-4 text-gray-500">
                                Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="border-2 border-gray-500 px-4 py-2 w-full"
                            />

                            <label className="text-xl mr-4 text-gray-500">
                                Author
                            </label>
                            <input
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className="border-2 border-gray-500 px-4 py-2 w-full"
                            />

                            <label className="text-xl mr-4 text-gray-500">
                                Publish year
                            </label>
                            <input
                                type="number"
                                value={publishYear}
                                onChange={(e) => setPublishYear(e.target.value)}
                                className="border-2 border-gray-500 px-4 py-2 w-full"
                            />
                        </div>
                        <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
		</>
	);
};

export default EditBook;
