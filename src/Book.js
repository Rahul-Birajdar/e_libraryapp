import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Book = ({ volumeInfo }) => {
  const imageVariants = {
    hover: {
      scale: 1.7,
      boxShadow: "0px 0px 8px #000",
      transition: {
        duration: 0.5,
        type: "spring",
        delay: 0.15,
      },
    },
  };

  let { title, authors, publisher, description, categories, previewLink, imageLinks } = volumeInfo;

  // Setting up default values for volume info data
  title = title || "Title is not available";
  authors = authors || "Author(s) name not available";
  publisher = publisher || "Publisher company not available";
  categories = categories || "Category not available";
  description = description || "Description not available";
  previewLink = previewLink || "https://www.googleapis.com";
  const imageUrl = imageLinks?.thumbnail || "";

  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    // Load click count from local storage
    const storedClickCount = localStorage.getItem(`clickCount_${title}`);
    if (storedClickCount) {
      setClickCount(Number(storedClickCount));
    }
  }, [title]);

  const handlePreviewLinkClick = () => {
    // Increment the click count and save it to local storage
    const updatedClickCount = clickCount + 1;
    setClickCount(updatedClickCount);
    localStorage.setItem(`clickCount_${title}`, updatedClickCount);
  };

  return (
    <div className="book-card">
      <div>
        <motion.div
          whileHover="hover"
          variants={imageVariants}
          style={{ display: "inline-block" }}
        >
          <img src={imageUrl} alt={title} />
        </motion.div>

        <h3>{title}</h3>
        <div>
          <h4 style={{ color: "orange" }}>
            Author:{" "}
            <span style={{ fontWeight: "bold", color: "orange" }}>
              {authors}
            </span>
          </h4>
        </div>
        <div>
          <h5 style={{ color: "orange" }}>
            Published by:{" "}
            <span style={{ fontWeight: "bold", color: "orange" }}>
              {publisher}
            </span>
          </h5>
        </div>
        <div>
          <h5 style={{ color: "orange" }}>
            Category :{" "}
            <span style={{ fontWeight: "bold", color: "orange" }}>
              {categories}
            </span>
          </h5>
        </div>

        <div className="book-description">{description}</div>
        <div>
          {previewLink && (
            <a
              href={previewLink}
              style={{
                fontWeight: "bold",
                color: "blue",
              }}
              onClick={handlePreviewLinkClick}
            >
              Preview Link
            </a>
          )}
        </div>
        <div>Views: {clickCount}</div>
      </div>
    </div>
  );
};

export default Book;
