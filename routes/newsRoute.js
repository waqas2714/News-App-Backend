const express = require('express');
const { getTrendingNews, getPageNews, getAllNews, getSources, getSingleNews } = require('../controllers/newsController');
const router = express.Router();

router.get('/getTrendingNews', getTrendingNews);
router.post('/getPageNews', getPageNews);
router.get('/getAllNews', getAllNews);
router.get('/getSources', getSources);
// router.get('/getSinglenews/:title', getSingleNews);

module.exports = router; 