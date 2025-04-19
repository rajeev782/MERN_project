// models/Podcast.js
const mongoose = require('mongoose');

const podcastSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    audioUrl: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Podcast', podcastSchema);
