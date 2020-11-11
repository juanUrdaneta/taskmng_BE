const { doc } = require('prettier');
const Task = require('../models/TaskModel');
const AppError = require('../utils/appErrors');
const catchAsync = require('../utils/catchAsyncMethod');

const documentNotFoundError = new AppError(
    'No document found with that ID',
    404
);

exports.createTask = catchAsync(async (req, res, next) => {
    const document = await Task.create(req.body);

    res.status(201).json({
        status: 'success',
        data: document,
    });
});

exports.getAllTasks = catchAsync(async (req, res, next) => {
    const document = await Task.find();

    res.status(200).json({
        status: 'success',
        data: document,
    });
});

exports.getTask = catchAsync(async (req, res, next) => {
    const document = await Task.findById(req.params.id);
    if (!document) return next(documentNotFoundError);
    res.status(200).json({
        status: 'sucess',
        data: document,
    });
});

exports.updateTask = catchAsync(async (req, res, next) => {
    const document = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!document) return next(documentNotFoundError);
    res.status(200).json({
        status: 'sucess',
        data: document,
    });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
    const document = await Task.findByIdAndDelete(req.params.id);

    if (!document) return next(documentNotFoundError);

    res.status(204).json({
        status: 'sucess',
        data: null,
    });
});
