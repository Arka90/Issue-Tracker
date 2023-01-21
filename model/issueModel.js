const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A issue must have an title'],
  },
  description: {
    type: String,
  },

  label: Array,

  Author: {
    type: String,
    required: [true, 'Author must put their name'],
  },

  Project: {
    type: mongoose.Schema.ObjectId,
    ref: 'project',
  },
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;