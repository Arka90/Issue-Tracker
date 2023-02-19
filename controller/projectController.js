const Project = require('./../model/projectModel');
const catchAsync = require('./../util/catchAsync');
const AppError = require('./../util/appError');
const Issue = require('./../model/issueModel');
exports.createProject = catchAsync(async (req, res, next) => {
  const newProject = await Project.create(req.body);
  return res.status(201).json({
    status: 'sucess',
    data: {
      project: newProject,
    },
  });
});

exports.getAllProject = catchAsync(async (req, res, next) => {
  const projects = await Project.find();

  res.status(200).json({
    status: 'sucess',
    results: projects.length,
    data: {
      projects,
    },
  });
});

exports.getProject = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(new AppError('No Project found with the ID', 404));
  }

  res.status(200).json({
    status: 'sucess',
    data: {
      project,
    },
  });
});

exports.deleteProject = catchAsync(async (req, res, next) => {
  await Issue.deleteMany({ project: req.params.id });
  await Project.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
