import "./App.css";
import { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "./FbConfig";
import { v4 } from "uuid";
import NavBar from "./NavBar";

function App() {
  const [fileUpload, setFileUpload] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("uncategorized"); // Default category is "uncategorized"

  const maxFileSize = 10 * 1024 * 1024; // 10MB in bytes

  const uploadFile = () => {
    if (fileUpload == null) {
      window.alert("Please select a file to upload.");
      return;
    }

    if (!fileUpload.name.toLowerCase().endsWith(".pdf")) {
      window.alert("Only PDF files are allowed.");
      return;
    }

    if (fileUpload.size > maxFileSize) {
      window.alert(`File size should be less than ${maxFileSize / (1024 * 1024)}MB.`);
      return;
    }

    // Additional checks based on your requirements can be added here

    // Adjust the reference path based on the selected category
    const fileRef = ref(storage, `pdfs/${selectedCategory}/${fileUpload.name + v4()}`);
    uploadBytes(fileRef, fileUpload)
      .then(() => {
        // File uploaded successfully, show an alert
        window.alert("File uploaded successfully!");
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  return (
    
    <div className="App"><NavBar/>
      <div>
        <label>Select Category:</label>
        <select
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
        >
          <option value="uncategorized">Uncategorized</option>
          <option value="journal">Journal</option>
          <option value="magazine">Magazine</option>
          {/* Add more categories as needed */}
        </select>
      </div>

      <p>File size limit: {maxFileSize / (1024 * 1024)}MB</p>

      <input
        type="file"
        accept=".pdf"
        onChange={(event) => {
          setFileUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}>Upload PDF</button>
    </div>
  );
}

export default App;
