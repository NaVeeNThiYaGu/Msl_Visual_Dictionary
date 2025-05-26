import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';


function AddWordPage() {
  const [formData, setFormData] = useState({
    word: '',
    definition: '',
    imageUrl: '',
    videoUrl: '',
  });

  const navigate = useNavigate();

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/words', formData);
      alert('Word added successfully!');
      navigate('/'); 
    } catch (err) {
      alert('Error adding word.');
      console.error(err);
    }
  };

  return (
    <div className="form-container" >
      <h1>Add New Word</h1>
      <form onSubmit={handleSubmit}>
        <label>Word:</label>
        <input name="word" placeholder="Word" onChange={handleChange} required />
        <label>Definition:</label>
        <input name="definition" placeholder="Definition" onChange={handleChange} required />
        <label>Image URL:</label>
        <input name="imageUrl" placeholder="Image URL" onChange={handleChange} required />
        <label>Video URL:</label>
        <input name="videoUrl" placeholder="Video URL" onChange={handleChange} required />
        <button type="submit">Add Word</button>
      </form>
    </div>
  );
}

export default AddWordPage;
