const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A Project Must have an Name'],
    unique: true,
    trim: true,
  },

  description: {
    type: String,
  },

  author: {
    type: String,
    required: [true, 'A Project Must have an Author'],
  },

  issues: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Issue',
    },
  ],
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
