const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A issue must have an title'],
  },
  description: {
    type: String,
  },

  label: [String],

  author: {
    type: String,
    required: [true, 'Author must put their name'],
  },

  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
    require: [true, 'Issue must belongs to a project'],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

issueSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'project',
    select: 'name description author',
  });
  next();
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
