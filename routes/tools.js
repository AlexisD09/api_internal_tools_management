const express = require('express');
const router = express.Router();
const toolController = require('../controllers/toolController');

router.get('/', toolController.getTools);

router.get('/:id', toolController.getTool);

module.exports = router;