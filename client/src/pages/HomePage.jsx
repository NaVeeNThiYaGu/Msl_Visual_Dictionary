import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Spinner from "./Spinner";

function HomePage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/words/${query}`);
      setResults([res.data]);
    } catch (err) {
      setResults([]);
      alert("Word not found");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this word?")) return;
    try {
      await axios.delete(`http://localhost:5000/words/${id}`);
      setResults([]);
      alert("Word deleted");
    } catch (err) {
      alert("Error deleting word");
      console.error(err);
    }
  };

  const handleEdit = (wordData) => {
    navigate("/edit", { state: { wordData } });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="container">
      <h1>Sign Language Visual Dictionary</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search words..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSearch}>🔍 Search</button>
        <button onClick={() => navigate("/add")} style={{ marginLeft: "10px" }}>
          ➕ Add Word
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <>
          {results.length > 0 &&
            results.map((word, index) => (
              <div
                className="word-card"
                key={index}
                style={{
                  border: "1px solid #ccc",
                  margin: "10px",
                  padding: "10px",
                }}
              >
                <h2>{word.word}</h2>
                <p>{word.definition}</p>
                <img src={word.imageUrl} alt={word.word} width="150" />
                <div>
                  {/* <video width="250" controls>
              <source src={word.videoUrl} type="video/mp4" />
            </video> */}
                  <iframe width="560" height="315" src={word.videoUrl}></iframe>
                </div>
                <div className="actions">
                  <button onClick={() => handleEdit(word)}>✏️ Edit</button>
                  <button
                    onClick={() => handleDelete(word._id)}
                    style={{ marginLeft: "10px" }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
}

export default HomePage;
