import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function EditWordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { wordData } = location.state || {};

  const [formData, setFormData] = useState({
    word: '',
    definition: '',
    imageUrl: '',
    videoUrl: '',
  });

  useEffect(() => {
    if (wordData) {
      setFormData(wordData);
    } else {
      alert('No word data found');
      navigate('/');
    }
  }, [wordData, navigate]);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/words/${formData._id}`, formData);
      alert('Word updated successfully!');
      navigate('/');
    } catch (err) {
      alert('Error updating word.');
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h1>Edit Word</h1>
      <form onSubmit={handleSubmit}>
        <label>Word:</label>
        <input name="word" placeholder="Word" value={formData.word} onChange={handleChange} required />
        <label>Definition:</label>
        <input name="definition" placeholder="Definition" value={formData.definition} onChange={handleChange} required />
        <label>Image URL:</label>
        <input name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} required />
        <label>Video URL:</label>
        <input name="videoUrl" placeholder="Video URL" value={formData.videoUrl} onChange={handleChange} required />
        <button type="submit">Update Word</button>
      </form>
    </div>
  );
}

export default EditWordPage;
