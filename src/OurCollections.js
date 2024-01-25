import { useState, useEffect } from "react";
import { getStorage, ref, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import "./App.css";
import NavBar from "./NavBar";

const OurCollections = () => {
  const [pdfs, setPdfs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("uncategorized");
  const [clickCounts, setClickCounts] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);

  const incrementClickCount = (pdfName) => {
    setClickCounts((prevClickCounts) => {
      const updatedClickCounts = { ...prevClickCounts };
      if (pdfName in updatedClickCounts) {
        updatedClickCounts[pdfName]++;
      } else {
        updatedClickCounts[pdfName] = 1;
      }
      localStorage.setItem("clickCounts", JSON.stringify(updatedClickCounts));
      return updatedClickCounts;
    });
  };

  useEffect(() => {
    // Load click counts from local storage
    const storedClickCounts = localStorage.getItem("clickCounts");
    if (storedClickCounts) {
      setClickCounts(JSON.parse(storedClickCounts));
    }

    const fetchPDFs = async () => {
      try {
        const storage = getStorage();
        const storageRef = selectedCategory === "all"
          ? ref(storage, "pdfs")
          : ref(storage, `pdfs/${selectedCategory}`);

        const files = await listAll(storageRef);
        const pdfUrls = await Promise.all(
          files.items.map(async (file) => {
            const downloadUrl = await getDownloadURL(file);
            return { name: file.name, url: downloadUrl };
          })
        );

        setPdfs(pdfUrls);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      }
    };

    fetchPDFs();
  }, [selectedCategory, isDeleting]);

  const handlePdfClick = (pdfName) => {
    incrementClickCount(pdfName);
  };

  const handleDeletePdf = async (pdfName) => {
    const storage = getStorage();
    const pdfRef = ref(storage, `pdfs/${selectedCategory}/${pdfName}`);

    try {
      await deleteObject(pdfRef);
      setIsDeleting(!isDeleting); // Refresh the PDF list after deletion
      // Display a success message
      alert(`PDF "${pdfName}" deleted successfully!`);
    } catch (error) {
      console.error("Error deleting PDF:", error);
      // Display an error message if the deletion fails
      alert(`Error deleting PDF "${pdfName}": ${error.message}`);
    }
  };

  return (
    <div>
      <NavBar />
      <center>
        <h2>Our Collections</h2>
      </center>
      <div>
        <label>Select Category:</label>
        <select
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
        >
          <option value="uncategorized">Uncategorized</option>
          <option value="journal">Journal</option>
          <option value="magazine">Magazine</option>
        </select>
      </div>

      <ul>
        {pdfs.map((pdf, index) => (
          <li key={index}>
            <a
              href={pdf.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handlePdfClick(pdf.name)}
            >
              {pdf.name}
            </a>
            <span> Views: {clickCounts[pdf.name] || 0}</span>
            <button onClick={() => handleDeletePdf(pdf.name)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OurCollections;
