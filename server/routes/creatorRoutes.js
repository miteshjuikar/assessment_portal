const express = require('express');
const router = express.Router();
const AssessmentController = require('../controllers/creatorController');
const { authMiddleware } = require('../controllers/userController');


router.post('/assessment',authMiddleware, AssessmentController.createAssessment);
router.post('/assessment/questions', AssessmentController.submitQuestion);

module.exports = router;
