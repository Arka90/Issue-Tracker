const Issue = require('./../model/issueModel');
const catchAsync = require('./../util/catchAsync');
const AppError = require('./../util/appError');

exports.createIssue = catchAsync(async function (req, res, next) {
  if (!req.body.Project) req.body.Project = req.params.projectId;

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

  if (req.params.projectId) filter = { Project: req.params.projectId };

  const issues = await Issue.find(filter);

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
