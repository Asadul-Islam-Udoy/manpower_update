const Contract = require("../models/contract");
exports.SendMessageController = async (req, res) => {
  try {
    const { email_or_phone, message, username } = req.body;

    const user = await Contract.findOne({ user: req.params.userid });
    if (user) {
      user.messages.push({
        message: message,
        email_or_phone: email_or_phone,
        username: username,
        date:Date.now()
      });
      user.is_admin_get = false;
      user.date = Date.now();
      user.save({ validateBeforeSave: false });
    } else {
      const messages =[{message: message,is_admin_get:false,date:Date.now(),email_or_phone: email_or_phone,username: username,}]
      await Contract.create({
        user: req.params.userid,
        email_or_phone,
        messages,
        username,
        date:Date.now(),
        is_admin_get:false
      });
    }
    res.status(200).json({
      flag: true,
      message: "message create successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

/// get all messages
exports.GetAllMessageController = async (req, res) => {
  try {
    const messages = await Contract.find({}).populate("user");
    if (!messages) {
      return res.status(400).json({
        flag: false,
        message: "message create fails",
      });
    }
    res.status(200).json({
      flag: true,
      message: "mesaage getting successfully!",
      messages,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

///get single message
exports.GetSingleMessageController = async (req, res) => {
  try {
    const message = await Contract.findOne({user:req.params.userId});
    if (!message) {
      return res.status(400).json({
        flag: false,
        message: "message is not found!",
      });
    }
    if (message.is_admin_get === false) {
      message.is_admin_get = true;
      message.save({ validateBeforeSave: false });
    }
    res.status(200).json({
      flag: true,
      message: "mesaage getting successfully!",
      message,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

///message delete
exports.DeleteMessageController = async (req, res) => {
  try {
    const message_find = await Contract.findOne({user:req.params.userId});
    if (!message_find) {
      return res.status(400).json({
        flag: false,
        message: "message is not found!",
      });
    }
    if(message_find.messages.length > 0){
      const p = message_find.messages.filter((i)=>i._id.toString() !== req.params.messageId);
      message_find.messages = p;
    }
    message_find.save({validateBeforeSave:false});
    res.status(200).json({
      flag: true,
      message: "message delete successfully successfully!",
      message_find,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};
