const express = require('express');
const router = express.Router();
const AssessmentController = require('../controllers/creatorController');
const { authMiddleware } = require('../controllers/userController');


router.post('/assessment',authMiddleware, AssessmentController.createAssessment);
router.post('/assessment/questions', AssessmentController.submitQuestion);

router.get('/assessments', AssessmentController.getAllAssessments);
router.get('/assessment/:id', AssessmentController.getAssessmentById);
router.get('/myAssessments', authMiddleware, AssessmentController.getMyAssessments);


module.exports = router;
