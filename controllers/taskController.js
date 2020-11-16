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
    if (task.createdBy.toString() === req.user.id) {
        await Task.findByIdAndUpdate(req.params.taskId, {
            isDeleted: true,
            status: deleted,
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

exports.addTags = catchAsync(async (req, res, next) => {
    const tags = req.body.tags.map((tag) =>
        tag[0].toUpperCase().concat(tag.substring(1))
    );

    const task = await Task.findByIdAndUpdate(req.params.taskId, {
        tags: tags,
    });

    res.status(200).json({
        status: 'success',
        data: task,
    });
});

exports.updateStatus = catchAsync(async (req, res, next) => {
    let options = { status: req.body.status };
    if (req.body.status === 'Done') options.endDate = Date.now();
    console.log(options);

    const task = await Task.findByIdAndUpdate(req.params.taskId, options);

    res.status(200).json({
        status: 'success',
        data: task,
    });
});

exports.taskStats = catchAsync(async (req, res, next) => {
    const stats = await Task.aggregate([
        {
            $project: {
                status: 1,
                duration: {
                    $divide: [
                        {
                            $subtract: [
                                {
                                    $cond: [
                                        { $gt: ['$endDate', 0] },
                                        '$endDate',
                                        new Date(),
                                    ],
                                },
                                '$startDate',
                            ],
                        },
                        3600000,
                    ],
                },
                endDate: 1,
                startDate: 1,
            },
        },
        {
            $group: {
                _id: { $toUpper: '$status' },
                numberOfTasks: { $sum: 1 },
                avgTime: { $avg: '$duration' },
            },
        },
    ]);

    res.status(200).json({
        status: 'success',
        data: stats,
    });
});

// exports.getStats = catchAsync(async (req, res, next) => {});
