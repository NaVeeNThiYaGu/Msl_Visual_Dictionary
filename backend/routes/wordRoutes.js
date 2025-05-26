import express from 'express';
import Word from '../models/Word.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const words = await Word.find();
    res.json(words);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/:query', async (req, res) => {
  try {
    const word = await Word.findOne({ word: req.params.query });
    if (!word) return res.status(404).json({ message: 'Word not found' });
    res.json(word);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const { word, definition, imageUrl, videoUrl } = req.body;
    const newWord = new Word({ word, definition, imageUrl, videoUrl });
    await newWord.save();
    res.status(201).json(newWord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updated = await Word.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Word not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Word.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Word not found' });
    res.json({ message: 'Word deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
