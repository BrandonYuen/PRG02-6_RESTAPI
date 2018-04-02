const config = require('../config');
const express = require('express');
const router = express.Router();

// render portfolio view
//router.get('/', {portfolioController.renderSinglePage});
router.get('/', (req, res, next) => {
	res.sendFile('dist/index.html', { root: '.' });
})

module.exports = router;
