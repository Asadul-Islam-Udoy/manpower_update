const Notification = require("../models/notification");


// Create a new notification to the sinle client or worker
exports.createNotification = async (req, res) => {
  try {
    const { title, description, details_url ,end_date } = req.body;
    const option = {
      user: req.params.id,
      title,
      description,
      details_url,
      end_date,
      date: Date.now(),
    };
    const notification = await Notification.findOne({ user: req.params.id });
    if (notification) {
      notification.newNotifiactions.unshift(option);
      notification.save({ validateBeforeSave: false });
    } else {
      await Notification.create({
        user: req.params.id,
        newNotifiactions: [
          {
            user: req.params.id,
            title,
            description,
            details_url,
            end_date,
            date: Date.now(),
          },
        ],
      });
    }
    res.status(200).json({
      flag: true,
      message: "notification create successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};



//send group notification in the client
exports.createGroupNotification = async (req, res) => {
  try {
    const { title, description, details_url, usersId, end_date } = req.body;
    if (!usersId) {
      return res.status(400).json({
        flag: false,
        message: "user is required!",
      });
    }
    if (usersId.split(",").length > 0) {
        usersId.split(",").forEach(async (item) => {
        const notification = await Notification.findOne({ user: item });
        const option = {
          user: item,
          title,
          description,
          details_url,
          end_date,
          date: Date.now(),
        };
        if (notification) {
          notification.newNotifiactions.unshift(option);
          notification.save({ validateBeforeSave: false });
        } else {
          await Notification.create({
            user: item,
            newNotifiactions: [
              { user: item, title, description, details_url, end_date},
            ],
          });
        }
      });
      res.status(201).json({
        flag: true,
        message: "notification create successfully!",
      });
    }
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};



//get admin unique user notifications
exports.getAdminUniqueUserNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id).populate("user");
    if(notification?.newNotifiactions?.length>0 || notification?.seenNotifications?.length>0){
        notification.newNotifiactions.filter((i)=>new Date(i.end_date) > new Date()); 
        notification.seenNotifications.filter((i)=>new Date(i.end_date) > new Date());  
        notification.save({validateBeforeSave:false});
    }

    res.status(201).json({
      flag: true,
      message: "notification getting  successfully!",
      notification,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};


//get all notification
exports.getAllNotification = async (req, res) => {
    try {
     const notifications = await Notification.find({}).populate('user');
      res.status(201).json({
        flag: true,
        message: "all notification getting successfully",
        notifications,
      });
    } catch (error) {
      return res.status(400).json({
        flag: false,
        message: error.message,
      });
    }
  };

  

//update user notification
exports.updateNotifications = async (req, res) => {
  try {
    const { title, description, details_url,end_date } = req.body;
    const userid = req.params.userid;
    const notificationid = req.params.notificationid;
    const notifications = await Notification.findOne({ user: userid });

    if (notifications.newNotifiactions.length > 0) {
      const findnotification = await notifications.newNotifiactions.find(
        (i) => i._id.toString() === notificationid
      );
      findnotification.title = title;
      findnotification.description = description;
      findnotification.details_url = details_url;
      findnotification.end_date = end_date;
    }
    if (notifications.seenNotifications.length > 0) {
      const findnotification = await notifications.seenNotifications.find(
        (i) => i._id.toString() === notificationid
      );
      findnotification.title = title;
      findnotification.description = description;
      findnotification.details_url = details_url;
      findnotification.end_date = end_date;
    }
    notifications.save({ validateBeforeSave: false });
    res.status(201).json({
      flag: true,
      message: "notification update   successfully!",
      notifications,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};


/// delete notification
exports.deleteNotifications = async (req, res) => {
  try {
    const userid = req.params.userid;
    const notificationid = req.params.notificationid;
    const notifications = await Notification.findOne({ user: userid });
    if (notifications.newNotifiactions.length > 0) {
      const findnotification = await notifications.newNotifiactions.filter(
        (i) => i._id.toString() !== notificationid
      );
      notifications.newNotifiactions = findnotification;
    }
    if (notifications.seenNotifications.length > 0) {
      const findnotification = await notifications.seenNotifications.filter(
        (i) => i._id.toString() !== notificationid
      );
      notifications.seenNotifications = findnotification;
    }
    notifications.save({ validateBeforeSave: false });
    res.status(201).json({
      flag: true,
      message: "notification delete   successfully!",
      notifications,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};


///get unique user all  notifications   ///it will be show /// apps developer
exports.getUserAllNotificationNotification = async (req, res) => {
  try {
    const notification_check = await Notification.findOne({ user: req.user._id });

    if(notification_check?.newNotifiactions?.length>0 || notification_check?.seenNotifications?.length>0){
        notification_check.newNotifiactions.filter((i)=>new Date(i.end_date) > new Date()); 
        notification_check.seenNotifications.filter((i)=>new Date(i.end_date) > new Date());  
        notification_check.save({validateBeforeSave:false});
    }
    const notifications = await Notification.findOne({ user: req.user._id });
    res.status(201).json({
      flag: true,
      message: "notifications getting successfully!",
      notifications,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};



///get seen user notification or single notification  /// click then hide ///apps developer
exports.seenUserNotification = async (req, res) => {
  try {
    const notificationid = req.params.notificationid;
    const notifications = await Notification.findOne({ user: req.user._id });
    const findnotification = await notifications.newNotifiactions.find(
      (i) => i._id.toString() == notificationid
    );
    if (findnotification) {
      if (notifications.newNotifiactions.length > 0) {
        const filterotification = await notifications.newNotifiactions.filter(
          (i) => i._id.toString() !== notificationid
        );
        notifications.newNotifiactions = filterotification;
        notifications.seenNotifications.unshift(findnotification);
      }
    }
    notifications.save({ validateBeforeSave: false });
    const notification = await notifications.seenNotifications.find(
      (i) => i._id.toString() == notificationid
    );
    res.status(201).json({
      flag: true,
      message: "single notification getting successfully!",
      notification,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};




