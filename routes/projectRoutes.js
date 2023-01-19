const express = require('express');
const projectController = require('./../controller/projectController');
const router = express.Router();

router.post('/createProject', projectController.createProject);
router.get('/getAllProject', projectController.getAllProject);
router.get('/getProject/:id', projectController.getProject);
router.delete('/deleteProject/:id', projectController.deleteProject);

module.exports = router;
