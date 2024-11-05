//send  notification  all workers
exports.createAllWorkerGroupNotification = async (req, res) => {
    try {
      const { title, description, details_url ,end_date} = req.body;
      const users = await User.find({ userType: { $eq: "worker" } });
      let usersId = [];
      if (users?.length > 0) {
        users.forEach((element) => {
          usersId.push(element._id.toString());
        });
      }
      if (!usersId) {
        return res.status(400).json({
          flag: false,
          message: "user is required!",
        });
      }
      if (usersId?.length > 0) {
        usersId.forEach(async (item) => {
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
  //create all workers groups notification
router.post('/create/groups/all/workers/notification',isAdminUserMiddleware,isAdminMiddleware('admin'),createAllWorkerGroupNotification);

