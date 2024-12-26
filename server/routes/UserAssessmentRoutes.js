const express = require('express');
const { getAssessmentById } = require('../controllers/userAssessmentController');
const router = express.Router();

router.get('/assessment/:id', getAssessmentById);


module.exports = router;
