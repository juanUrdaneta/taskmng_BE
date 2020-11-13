const express = require('express');
const taskController = require('../controllers/taskController');
const authController = require('../controllers/authController');
const commentRoutes = require('./commentRoutes');

const router = express.Router();

router.use('/:taskId/comment', commentRoutes);

router
    .route('/')
    .get(taskController.getAllTasks)
    .post(taskController.createTask);

router
    .route('/:id')
    .get(taskController.getTask)
    .patch(taskController.updateTask)
    .delete(taskController.deleteTask);

module.exports = router;
