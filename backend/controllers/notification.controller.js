import Notification from "../models/notification.model.js";

// @desc            Get all notifications
// @route           GET /api/notifications
// @access          Private
export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    const notifications = await Notification.find({ to: userId }).populate({
      path: "from",
      select: "username profileImg",
    });

    await Notification.updateMany({ to: userId }, { read: true });

    res.status(200).json(notifications);
  } catch (err) {
    console.log("Error in getNotifications controller:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @desc            Delete notifications
// @route           DELETE /api/notifications
// @access          Private
export const deleteNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    await Notification.deleteMany({ to: userId });

    res.status(200).json({ message: "Notifications deleted successfully" });
  } catch (err) {
    console.log("Error in deleteNotifications controller:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @desc            Delete notifications
// @route           DELETE /api/notifications
// @access          Private
export const deleteSingleNotification = async (req, res) => {
  try {
    const notificationId = req.params.notificationId;
    const userId = req.user._id;

    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    if (notification.to.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ error: "You are not allowed to delete this notification" });
    }

    await Notification.findByIdAndDelete(notificationId);
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (err) {
    console.log("Error in deleteSingleNotification controller:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
