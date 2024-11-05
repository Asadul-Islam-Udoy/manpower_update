const express = require('express');
const isAdminMiddleware = require("../middleware/AdminMiddleware");
const isAdminUserMiddleware = require('../middleware/AdminUserMiddleware');
const { 
    SendMessageController,
    GetAllMessageController,
    GetSingleMessageController,
    DeleteMessageController
} = require('../controllers/contractController');


const router = express.Router();

router.post('/client/send/:userid',isAdminUserMiddleware ,SendMessageController);

router.get('/get/all',isAdminUserMiddleware,isAdminMiddleware('admin'),GetAllMessageController);

router.get('/get/single/:userId',isAdminUserMiddleware,isAdminMiddleware('admin'),GetSingleMessageController);

router.delete('/delete/:userId/:messageId',isAdminUserMiddleware,isAdminMiddleware('admin'),DeleteMessageController);

module.exports = router;