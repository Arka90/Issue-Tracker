const Project = require('./../model/projectModel');
const catchAsync = require('./../util/catchAsync');
const AppError = require('./../util/appError');
const { json } = require('express');
exports.createProject = catchAsync(async (req, res, next) => {
  const newProject = await Project.create(req.body);
  return res.status(200).json({
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
    return next(new AppError('No tour find with the ID', 404));
  }

  res.status(200).json({
    status: 'sucess',
    data: {
      project,
    },
  });
});

exports.deleteProject = catchAsync(async (req, res, next) => {
  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) {
    return next(new AppError('No Project found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
