const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');

// GET NOTIFICATIONS FOR A SPECIFIC USER
router.get('/:userId', notificationController.getNotifications);

// MARK AS READ
router.put('/read/:id', notificationController.markAsRead);

// MARK ALL AS READ
router.put('/read-all/:userId', notificationController.markAllAsRead);

// DELETE NOTIFICATION (corbeille)
router.delete('/delete/:id', notificationController.deleteNotification);

module.exports = router;
