const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new mongoose.Schema({
    user: String
  });

const commentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    mbti: {
        type: String,
        enum: ['infp', 'infj', 'enfp', 'enfj', 'intj', 'intp', 'entp', 'entj', 'isfp', 'isfj', 'esfp', 'esfj', 'istp', 'istj', 'estp', 'estj']
    },
    enneagram: {
        type: String,
        enum: ['1w2', '2w3', '3w2', '3w4', '4w3', '4w5', '5w4', '5w6', '6w5', '6w7', '7w6', '7w8', '8w7', '8w9', '9w8', '9w1'],
    },
    zodiac: {
        type: String,
        enum: ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
    },
    likes: [likeSchema],
    dislikes: [likeSchema]
  });

module.exports = mongoose.model("Comment", commentSchema);
