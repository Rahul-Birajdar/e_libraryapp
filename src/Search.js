import React, { useState } from "react";


const Searchform = ({ searchText }) => {
  const [text, setText] = useState("");
  const [showValidTextModal, setShowValidTextModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setShowValidTextModal(true);
      return;
    }
    searchText(text);
  };

  const onChangeValue = (e) => {
    const inputValue = e.target.value;
    setText(inputValue);
  };

  const handleModalClose = () => {
    setShowValidTextModal(false);
  };

  return (
    <div>      
      <center><h2>An E-Library For All Book Lovers</h2></center>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <input
          type="text"
          placeholder="Search Chetan Bhagat, Vikram Seth, etc..."
          value={text}
          onChange={onChangeValue}
        />
        <button
          style={{
            marginLeft: "1rem",
            transition: "all 0.3s ease 0s",
            padding: "0.6rem",
            borderRadius: "0.2rem",
            cursor: "pointer"
          }}
          type="submit"
        >
          Search
        </button>
      </form>
      <div
        id="popup1"
        className={showValidTextModal ? "overlay modal-active" : "overlay"}
      >
        <div className="popup">
          <div className="close" onClick={handleModalClose}>
            &times;
          </div>
          <p>Please enter a valid search term.</p>
        </div>
      </div>
    </div>
  );
};

export default Searchform;
