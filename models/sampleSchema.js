const mongoose = require('mongoose');

const sampleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true},
    category: { type: String, required: true},
});

const Samples = mongoose.model('Sample', sampleSchema);

module.exports = Samples;