import mongoose from 'mongoose';

const wordSchema = new mongoose.Schema({
  word: { type: String, required: true, unique: true },
  definition: { type: String, required: true },
  imageUrl: { type: String, required: true },
  videoUrl: { type: String, required: true },
});

const Word = mongoose.model('Word', wordSchema);
export default Word;