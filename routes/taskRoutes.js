const express = require('express');
const taskController = require('../controllers/taskController');
const authController = require('../controllers/authController');
const commentRoutes = require('./commentRoutes');

const router = express.Router();

router.use('/:taskId/comment', commentRoutes);

router.use(authController.protect);

router.delete('/deleteMyTask/:taskId', taskController.removeTask);

router
    .route('/')
    .get(taskController.getAllTasks)
    .post(taskController.addUserForNewTask, taskController.createTask);

router
    .route('/:id')
    .get(taskController.getTask)
    .patch(taskController.updateTask)
    .delete(taskController.deleteTask);

module.exports = router;
