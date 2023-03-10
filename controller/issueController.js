const Issue = require('./../model/issueModel');
const catchAsync = require('./../util/catchAsync');
const AppError = require('./../util/appError');

exports.createIssue = catchAsync(async function (req, res, next) {
  if (!req.body.project) req.body.project = req.params.projectId;

  const newIssue = await Issue.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      newIssue,
    },
  });
});

exports.getAllIssues = catchAsync(async function (req, res, next) {
  let filter = {};

  if (req.params.projectId) filter = { project: req.params.projectId };

  const query = Issue.find(filter);

  if (req.query.label)
    query.find({
      label: { $all: req.query.label },
    });

  if (req.query.author) query.find({ author: req.query.author });
  if (req.query.title) query.find({ title: { $all: req.query.slug } });
  if (req.query.description)
    query.find({ description: { $all: req.query.description } });

  const issues = await query;

  res.status(200).json({
    status: 'sucess',
    results: issues.length,
    data: {
      issues,
    },
  });
});

exports.getIssue = catchAsync(async function (req, res, next) {
  const issue = await Issue.findById(req.params.id);

  if (!issue) return next(new AppError('No Issue found', 404));

  res.status(200).json({
    status: 'sucess',
    data: {
      issue,
    },
  });
});

exports.deleteIssue = catchAsync(async function (req, res, next) {
  await Issue.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'sucess',
    data: null,
  });
});
