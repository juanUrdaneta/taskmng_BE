const Task = require('../models/TaskModel');
// const AppError = require('../utils/appErrors');
// const catchAsync = require('../utils/catchAsyncMethod');
const Factory = require('./handlerFactory');

exports.createTask = Factory.createOne(Task);
exports.getAllTasks = Factory.getAll(Task);
exports.getTask = Factory.getOne(Task);
exports.updateTask = Factory.updateOne(Task);
exports.deleteTask = Factory.deleteOne(Task);
