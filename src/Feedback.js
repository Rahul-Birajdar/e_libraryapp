import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set } from "firebase/database";
import NavBar from "./NavBar";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBO3Y_-7HvXxT9hjtZgnwg20PcD8ZQlWfc",
  authDomain: "e-library-77143.firebaseapp.com",
  projectId: "e-library-77143",
  storageBucket: "e-library-77143.appspot.com",
  messagingSenderId: "599247874650",
  appId: "1:599247874650:web:95b5617a29e5535830c663"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

export default function Feedback() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [feedback, setFeedback] = useState("");
    const [rating, setRating] = useState("5");
  
    const hName = (event) => {
      setName(event.target.value);
    };
    const hEmail = (event) => {
      setEmail(event.target.value);
    };
    const hPhoneNumber = (event) => {
      setPhoneNumber(event.target.value);
    };
    const hFeedback = (event) => {
      setFeedback(event.target.value);
    };
    const hRating = (event) => {
      setRating(event.target.value);
    };
  
    const isEmailValid = (email) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    };
  
    const isPhoneNumberValid = (phoneNumber) => {
      const phoneNumberPattern = /^\+91[0-9]{10}$/; // Check if the number starts with +91 and is followed by 10 digits
      return phoneNumberPattern.test(phoneNumber);
    };
  
    const save = (event) => {
      event.preventDefault();
  
      // Data validations
      if (!name.trim()) {
        alert("Name cannot be empty");
        return;
      }
      if (name.trim().length < 2) {
        alert("Name should have at least two letters");
        return;
      }
      if (!/^[A-Za-z\s]+$/.test(name.trim())) {
        alert("Invalid name format. Only letters and spaces are allowed.");
        return;
      }
      if (!email.trim()) {
        alert("Email cannot be empty");
        return;
      }
      if (!isEmailValid(email)) {
        alert("Invalid email format. Please enter a valid email address.");
        return;
      }
      if (!phoneNumber.trim()) {
        alert("Phone number cannot be empty");
        return;
      }
      if (!isPhoneNumberValid(phoneNumber)) {
        alert("Invalid phone number format. Please enter an Indian phone number starting with +91.");
        return;
      }
      if (!feedback.trim()) {
        alert("Feedback cannot be empty");
        return;
      }
      if (feedback.trim().length < 10) {
        alert("Feedback should have at least ten characters");
        return;
      }
  
      // Save data to Firebase Realtime Database
      const feedbackRef = ref(db, "feedback");
      const newFeedbackRef = push(feedbackRef);
      const feedbackData = {
        name: name.trim(),
        email: email.trim(),
        phoneNumber: phoneNumber.trim(),
        feedback: feedback.trim(),
        rating: rating
      };
  
      // Use set() method to save data
      set(newFeedbackRef, feedbackData)
        .then(() => {
          alert("Thank you for your Feedback");
          setName("");
          setEmail("");
          setPhoneNumber("");
          setFeedback("");
          setRating("5");
        })
        .catch((err) => {
          alert("Issue: " + err.message);
        });
    };
  
    return (
      <><NavBar />
        <center>
          <div className="feedback-container">
            <h1>Feedback Form</h1>
            <form onSubmit={save}>
              <input
                type="text"
                placeholder="Enter your name"
                onChange={hName}
                value={name}
                required
              />
              <br />
              <input
                type="email"
                placeholder="Enter E-mail Id"
                onChange={hEmail}
                value={email}
                required
              />
              <br />
              <input
                type="text"
                placeholder="Enter Phone Number (+91xxxxxxxxxx)"
                onChange={hPhoneNumber}
                value={phoneNumber}
                required
              />
              <br />
              <div className="rating">
                <label htmlFor="rating">Rating:</label>
                {[1, 2, 3, 4, 5].map((star) => (
                  <label key={star} className={rating >= star ? "on" : "off"}>
                    <input
                      type="radio"
                      id={`star${star}`}
                      name="rating"
                      value={star}
                      onChange={hRating}
                      required
                    />
                    {star === 1 ? "\u2605" : "\u2605".repeat(star)}
                  </label>
                ))}
              </div>
              <textarea
                placeholder="Enter your feedback"
                rows={5}
                cols={30}
                onChange={hFeedback}
                value={feedback}
                required
              ></textarea>
              <br />
              <button type="submit">Submit Feedback</button>
            </form>
          </div>
        </center>
      </>
    );
  }
  
