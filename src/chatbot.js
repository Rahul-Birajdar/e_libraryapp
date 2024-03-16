import React, { useState, useEffect, useRef } from "react";
import "./chatbot.css"; // Import the CSS file for styling

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [suggestedBooks, setSuggestedBooks] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Define a list of predefined questions and answers
  const predefinedQA = [
    { question: "What is your name?", answer: "I am a Book chatbot." },
    { question: "How are you?", answer: "I'm just a program, but I'm functioning properly. Thanks for asking!" },
    { question: "Who created you?", answer: "I was created by Rahul." },
    { question: "What can you do?", answer: "I can provide book recommendations, answer your questions, and engage in conversation." },    
    { question: "What's the best-selling book of all time?", answer: "The Bible is considered the best-selling book of all time." },
  ];

  const handleMessageSubmit = () => {
    if (input.trim() === "") return;
    const newMessage = { text: input, sender: "user" };
    setMessages([...messages, newMessage]);
    handleQuery(input);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleMessageSubmit();
    }
  };

  const handleResponse = (response) => {
    const newMessage = { text: response, sender: "bot" };
    setMessages([...messages, newMessage]);
  };
  
  const handleQuery = (query) => {
    const currentTime = new Date().getHours();
    let greeting = "";
    if (currentTime < 12) {
      greeting = "Good morning!";
    } else if (currentTime < 18) {
      greeting = "Good afternoon!";
    } else {
      greeting = "Good evening!";
    }
    if (query.toLowerCase().includes("hello")) {
        handleResponse(`${greeting} How can I assist you today?`);
    } else if (query.toLowerCase().includes("recommend")) {
        suggestBooks();
    } else if (query.toLowerCase().includes("thank")) {
        handleResponse("You're welcome!");
    } else if (query.toLowerCase().includes("goodbye") || query.toLowerCase().includes("bye")) {
        handleResponse("Goodbye! Have a great day!");
    } else {
      // Check if the query matches any predefined question
      const predefinedAnswer = predefinedQA.find(qa => query.toLowerCase().includes(qa.question.toLowerCase()));
      if (predefinedAnswer) {
        handleResponse(`${predefinedAnswer.question}\n${predefinedAnswer.answer}`);
      } else {
        handleResponse("I'm sorry, I didn't understand that.");
      }
    }
  };

  const suggestBooks = () => {
    const books = ["Writing for My Life","India Positive","HAMLET"];
    setSuggestedBooks(books); 
    const booksResponse = formatBooks(books);
    handleResponse("Here are some book recommendations for you:\n" + booksResponse);
  };
  
  const formatBooks = (books) => {
    return books.map((book, index) => `${index + 1}. ${book}\n`).join("");
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === "user" ? "user" : "bot"}`}
          >
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleMessageSubmit}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
