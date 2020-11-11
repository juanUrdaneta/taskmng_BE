const { translateAliases } = require('../models/TaskModel');
const Task = require('../models/TaskModel');

exports.createTask = async (req, res, next) => {
    const document = await Task.create(req.body);

    res.status(201).json({
        status: 'success',
        data: document,
    });
};

exports.getAllTasks = async (req, res, next) => {
    const document = await Task.find();

    res.status(200).json({
        status: 'success',
        data: document,
    });
};

exports.getTask = async (req, res, next) => {
    const document = await Task.findById(req.params.id);

    res.status(200).json({
        status: 'sucess',
        data: document,
    });
};

exports.updateTask = async (req, res, next) => {
    const document = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        status: 'sucess',
        data: document,
    });
};

exports.deleteTask = async (req, res, next) => {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: 'sucess',
        data: null,
    });
};
