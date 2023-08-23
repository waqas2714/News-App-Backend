const express = require('express');
const { addComment, getComments } = require('../controllers/commentController');
const router = express.Router();

router.post('/addComment', addComment);
router.post('/getComments', getComments);

module.exports = router; 