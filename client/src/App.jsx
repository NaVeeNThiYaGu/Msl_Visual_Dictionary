import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddWordPage from './pages/AddWordPage';
import EditWordPage from './pages/EditWordPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddWordPage />} />
        <Route path="/edit" element={<EditWordPage />} />
      </Routes>
    </Router>
  );
}

export default App;
