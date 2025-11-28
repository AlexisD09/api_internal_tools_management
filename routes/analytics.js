const express = require('express');
const router = express.Router();
const analyticController = require('../controllers/analyticController');

router.get('/department-costs', analyticController.getAnalyticDepartmentCosts);

module.exports = router;