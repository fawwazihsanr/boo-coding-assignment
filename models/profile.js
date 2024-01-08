const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    mbti: String,
    enneagram: String,
    variant: String,
    tritype: String,
    socionics: String,
    sloan: String,
    psyche: String,
    image: String
});

module.exports = mongoose.model("Profile", profileSchema);
