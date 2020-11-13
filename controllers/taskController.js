const Task = require('../models/TaskModel');
const AppError = require('../utils/appErrors');
const catchAsync = require('../utils/catchAsyncMethod');
// const AppError = require('../utils/appErrors');
// const catchAsync = require('../utils/catchAsyncMethod');
const Factory = require('./handlerFactory');

exports.getTask = Factory.getOne(Task);
exports.getAllTasks = Factory.getAll(Task);
exports.createTask = Factory.createOne(Task);
exports.updateTask = Factory.updateOne(Task);
exports.deleteTask = Factory.deleteOne(Task);

exports.addUserForNewTask = (req, res, next) => {
    req.body.createdBy = req.user.id;
    next();
};

exports.removeTask = catchAsync(async (req, res, next) => {
    const task = await Task.findById(req.params.taskId);

    console.log(req.user.id, task.createdBy);
    if (task.createdBy == req.user.id) {
        await Task.findByIdAndUpdate(req.params.taskId, {
            isDeleted: true,
        });
    } else {
        return next(
            new AppError('You are not allowed to delete this task', 400)
        );
    }

    res.status(204).json({
        status: 'success',
    });
});
