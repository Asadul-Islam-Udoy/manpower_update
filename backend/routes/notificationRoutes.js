const express = require('express');
const isAdminUserMiddleware = require('../middleware/AdminUserMiddleware');
const isAdminMiddleware = require('../middleware/AdminMiddleware');
const {
    createNotification,
    seenUserNotification,
    createGroupNotification,
    getAdminUniqueUserNotification,
    updateNotifications,
    deleteNotifications,
    getUserAllNotificationNotification,
    getAllNotification
  } = require("../controllers/notificationController");

const router = express.Router();

// Create a new notification
router.post('/create/:id', isAdminUserMiddleware,isAdminMiddleware('admin'),createNotification);

// create group notification
router.post('/create/groups/notification',isAdminUserMiddleware,isAdminMiddleware('admin'),createGroupNotification);


//get admin unique user notifications
router.get('/get/admin/unique/user/notifications/:id',isAdminUserMiddleware,isAdminMiddleware('admin'),getAdminUniqueUserNotification);

///update user notification
router.put('/update/notification/:userid/:notificationid',isAdminUserMiddleware,isAdminMiddleware('admin'),updateNotifications);

//delete notification
router.delete('/delete/notification/:userid/:notificationid',isAdminUserMiddleware,deleteNotifications);

//get user all notification
router.get('/get/user/all/notifications',isAdminUserMiddleware,getUserAllNotificationNotification);

//get user all notification
router.get('/seen/user/notifications/:notificationid',isAdminUserMiddleware,seenUserNotification);

//get all notification
router.get('/get/all',isAdminUserMiddleware,isAdminMiddleware('admin'),getAllNotification);
module.exports = router;
