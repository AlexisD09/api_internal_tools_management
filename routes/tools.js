const express = require('express');
const router = express.Router();
const toolController = require('../controllers/toolController');
const validateTool = require("../middlewares/toolMiddleware");

router.get('/', toolController.getTools);
router.get('/:id', toolController.getTool);
router.post('/', validateTool, toolController.postTool);
router.put('/:id', validateTool(true), toolController.updateTool);

module.exports = router;