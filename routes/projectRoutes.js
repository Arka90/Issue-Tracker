const express = require('express');
const projectController = require('./../controller/projectController');
const issueController = require('./../controller/issueController');
const router = express.Router({ mergeParams: true });

router
  .route('/:projectId/issue')
  .get(issueController.getAllIssues)
  .post(issueController.createIssue);

router
  .route('/')
  .get(projectController.getAllProject)
  .post(projectController.createProject);

router
  .route('/:id')
  .get(projectController.getProject)
  .delete(projectController.deleteProject);

module.exports = router;
