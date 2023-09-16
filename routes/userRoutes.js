const express = require('express');
const { signupUser, loginUser, saveNews, forgotPassword, resetPassword, unSaveNews, getUser, verifyToken, isSaved, getASavedNews, getLikedPosts, keepAlive } = require('../controllers/userController');
const router = express.Router();

router.get("/keep-alive", keepAlive);
router.post("/signup", signupUser);
router.post('/login', loginUser);
router.get('/getUser/:_id', getUser);
router.patch('/saveNews', saveNews);
router.patch('/unSaveNews', unSaveNews);
router.post('/isSaved', isSaved);
router.post('/getLikedPosts', getLikedPosts);
router.post('/getASavedNews', getASavedNews);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword);
router.post('/verifyToken', verifyToken);




module.exports = router;