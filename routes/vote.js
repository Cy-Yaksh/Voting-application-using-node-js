const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');

router.get('/vote', voteController.renderVote);
router.post('/vote', voteController.vote);
router.get('/results', voteController.results);

module.exports = router;
