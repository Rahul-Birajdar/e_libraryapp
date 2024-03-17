import NavBar from "./NavBar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Searchform from "./Search";
import Book from "./Book"; // Import your Book component
import Chatbot from "./chatbot"; // Import the Chatbot component

const BookDetails = () => {
    const [details, setDetails] = useState([]);
    const [term, setTerm] = useState("");
    const [author, setAuthor] = useState(""); // Author filter
    const [category, setCategory] = useState(""); // Category filter
    const [isLoading, setIsLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const authors = ["Ruskin Bond ", "Chetan Bhagat ","R.K Narayan","Shashi Tharoor","Bipin Chandra","Arundhati Roy","Vikram Seth","J.K Rowling",
    "George Saunders","Elif Shafak","Marilynne Robinson","Jerry Jenkins","Charles Dickens","William Shakespeare","Stephen King","Agatha Christe",
    "Danielle Steel","Harold Robbins","John Green","Alice Walker"];//20 authors
    const categories = ["Fiction", "Literature ","Drama","Science fiction","Philosophy","Biography","Mystery","History","Horror","Humor",
    "Poetry","Novel"]; //12 categories
    
    useEffect(() => {
        // Check local storage for dark mode preference on load
        const darkModePreference = localStorage.getItem("darkMode");
        if (darkModePreference) {
            setIsDarkMode(darkModePreference === "true");
        }
        const fetchDetails = async () => {
            setIsLoading(true);
            try {
                const query = `q=${term}${author ? `+inauthor:${author}` : ""}${
                    category ? `+subject:${category}` : ""
                }&maxResults=12`;

                const response = await axios.get(
                    `https://www.googleapis.com/books/v1/volumes?${query}`
                );
                setDetails(response.data.items);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching book details:", error);
                setIsLoading(false);
            }
        };
        fetchDetails();
    }, [term, author, category]);

    // Toggle dark mode
    const toggleDarkMode = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        // Store user preference in local storage
        localStorage.setItem("darkMode", newDarkMode);

        // Add or remove the dark-mode class on the root element
        document.documentElement.classList.toggle("dark-mode", newDarkMode);
    };

    return (
        <>
            <NavBar />
            <button onClick={toggleDarkMode}>
                {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <h2 className={`title ${isDarkMode ? "dark" : "light"}`}>{term}</h2>

            <Searchform searchText={(text) => setTerm(text)} />
            <div>
                <label htmlFor="authorFilter">Author: </label>
                <select
                    id="authorFilter"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="">Select an author</option>
                    {authors.map((author, index) => (
                        <option key={index} value={author}>
                            {author}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="categoryFilter">Category: </label>
                <select
                    id="categoryFilter"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Select a category</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            {isLoading ? (
                <div className="b-container">Loading...</div>
            ) : details.length === 0 ? (
                <h1>Couldn't find books about {term}</h1>
            ) : (
                <section className="book-container">
                    {details.map((book, index) => (
                        <Book key={index} volumeInfo={book.volumeInfo} />
                    ))}
                </section>
            )}
            <Chatbot />
        </>
    );
};

export default BookDetails;
