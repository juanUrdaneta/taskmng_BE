const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        trim: true,
        required: [true, 'A comment is needed to create a comment'],
        minlength: [4, 'Comment should not have less than 4 characters'],
        maxlength: [100, 'Comment should not exeed 100 characters'],
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    user: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    task: [{ type: mongoose.Schema.ObjectId, ref: 'Task' }],
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
