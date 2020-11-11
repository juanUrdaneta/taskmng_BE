const AppError = require('../utils/appErrors');
const catchAsync = require('../utils/catchAsyncMethod');

const documentNotFoundError = new AppError(
    'No document found with that ID',
    404
);

exports.createOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const document = await Model.create(req.body);

        res.status(201).json({
            status: 'success',
            data: document,
        });
    });

exports.getAll = (Model) =>
    catchAsync(async (req, res, next) => {
        const document = await Model.find();

        res.status(200).json({
            status: 'success',
            data: document,
        });
    });

exports.getOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const document = await Model.findById(req.params.id);
        if (!document) return next(documentNotFoundError);
        res.status(200).json({
            status: 'sucess',
            data: document,
        });
    });

exports.updateOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const document = await Model.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        if (!document) return next(documentNotFoundError);
        res.status(200).json({
            status: 'sucess',
            data: document,
        });
    });

exports.deleteOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const document = await Model.findByIdAndDelete(req.params.id);

        if (!document) return next(documentNotFoundError);

        res.status(204).json({
            status: 'sucess',
            data: null,
        });
    });
