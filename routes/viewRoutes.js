const express = require('express');
const router = express.Router();
const viewController = require('./../controller/viewController');
router.get('/', viewController.home);
router.get('/project/:projectId', viewController.projectDetails);
router.get('/addProject', viewController.addProjectPage);
router.get('/addIssue', viewController.addIssuePage);

router.get('/filterIssue/:field/:options/:id', viewController.filter);
module.exports = router;
