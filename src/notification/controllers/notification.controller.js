const { Notification } = require('../models/notification.model');

// GET NOTIFICATIONS FOR A SPECIFIC USER
exports.getNotifications = async (req, res) => {
    try {
        const userId = req.params.userId;
        const notifications = await Notification.find({ userId: userId, corbeille: '0' }).sort({ createdAt: -1 });

        res.status(200).json({
            status: true,
            message: 'Notifications récupérées.',
            data: notifications
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
            data: []
        });
    }
};

// MARK AS READ
exports.markAsRead = async (req, res) => {
    try {
        const id = req.params.id;
        await Notification.findByIdAndUpdate(id, { status: 'read' });
        res.status(200).json({ status: true, message: 'Marqué comme lu.' });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// MARK ALL AS READ
exports.markAllAsRead = async (req, res) => {
    try {
        const userId = req.params.userId;
        await Notification.updateMany({ userId: userId, status: 'unread' }, { status: 'read' });
        res.status(200).json({ status: true, message: 'Toutes les notifications ont été marquées comme lues.' });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// DELETE NOTIFICATION (put in corbeille)
exports.deleteNotification = async (req, res) => {
    try {
        const id = req.params.id;
        await Notification.findByIdAndUpdate(id, { corbeille: '1' });
        res.status(200).json({ status: true, message: 'Notification supprimée.' });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// HELPER: CREATE NOTIFICATION (can be called internally)
exports.createNotificationInternal = async (userId, title, message, type = 'info', metadata = {}) => {
    try {
        const notif = new Notification({ userId, title, message, type, metadata });
        await notif.save();
        return notif;
    } catch (error) {
        console.error('Error creating internal notification:', error);
    }
};
