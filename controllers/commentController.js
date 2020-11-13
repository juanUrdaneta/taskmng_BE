const Comment = require('../models/CommentModel');
const AppError = require('../utils/appErrors');
const catchAsync = require('../utils/catchAsyncMethod');
// const AppError = require('../utils/appErrors');
// const catchAsync = require('../utils/catchAsyncMethod');
const Factory = require('./handlerFactory');

// exports.getTask = Factory.getOne(Comment);
// exports.updateTask = Factory.updateOne(Comment);
// exports.deleteComment = Factory.deleteOne(Comment);

exports.createComment = Factory.createOne(Comment);
exports.getAllComments = Factory.getAll(Comment);

exports.setIds = (req, res, next) => {
    if (!req.body.task) req.body.task = req.params.taskId;
    if (!req.body.user) req.body.user = req.user.id;
    next();
};

exports.deleteMyComment = catchAsync(async (req, res, next) => {
    const comment = await Comment.findById(req.params.commentId);
    if (comment.user && req.user.id) {
        await Comment.findByIdAndRemove(comment.id);
    } else {
        return next(
            new AppError('You are not allowed to delete this comment!', 400)
        );
    }
    res.status(204).json({
        status: 'success',
    });
});
