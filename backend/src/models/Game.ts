// models/Game.js
import mongoose from 'mongoose';

const QuizInfoSchema = new mongoose.Schema({
    x: Number,
    y: Number,
    answer: String,
    size: Number
});

const GameSchema = new mongoose.Schema({
  // ここでフィールドとその型を定義する
  quizName: String,
  quizImage: String,
  thumbnail: String,
  stickerImage: String,
  quizInfo: [QuizInfoSchema],
  answerDate: Date
});

export default mongoose.model('Game', GameSchema);
