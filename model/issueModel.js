const mongoose = require('mongoose');
const slugify = require('slugify');
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

issueSchema.pre('save', function (next) {
  const sluggedLabel = this.label.map((el) => {
    return slugify(el, { lower: true });
  });

  this.label = sluggedLabel;
  next();
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
