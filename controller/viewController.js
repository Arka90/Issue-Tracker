const axios = require('axios');

const Project = require('./../model/projectModel');
const Issues = require('./../model/issueModel');

const catchAsync = require('./../util/catchAsync');

exports.addProjectPage = catchAsync(async (req, res, next) => {
  return res.render('create_project', {
    title: 'Create Project',
  });
});

exports.addIssuePage = catchAsync(async (req, res, next) => {
  return res.render('create_issue', {
    title: 'Create Issue',
  });
});

exports.home = catchAsync(async (req, res, next) => {
  let projects = await Project.find();

  console.log(projects);

  return res.render('home', {
    title: 'Home',
    projects: projects,
  });
});

exports.projectDetails = catchAsync(async (req, res, next) => {
  let issues = await Issues.find({ project: req.params.projectId });
  let project = await Project.findById(req.params.projectId);
  return res.render('details_page', {
    title: `${project.name}`,
    issues: issues,
    projectId: req.params.projectId,
  });
});

exports.filter = catchAsync(async (req, res, next) => {
  const { field, options, id } = req.params;

  const filterOption = options.split('&');

  let url = `http://localhost:3000/api/v1/project/${id}/issue`;

  filterOption.forEach((el, i) => {
    if (i == 0) url += `?${field}=${el}`;
    else url += `&${field}=${el}`;
  });

  const issues = await axios({
    method: 'GET',
    url,
  });
  let project = await Project.findById(id);

  return res.render('details_page', {
    title: `${project.name}`,
    issues: issues.data.data.issues,
    projectId: id,
  });
});
