const Task = require('../models/TaskModel');

exports.createTask = async (req, res, next) => {
    const document = await Task.create(req.body);

    res.status(201).json({
        status: 'success',
        data: document,
    });
};
