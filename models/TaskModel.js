const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, 'A Task must have a name'],
            minlength: [4, 'A task name must have at least 4 characters'],
            maxlength: [20, 'A task name must be shorter than 20 characters'],
        },
        description: {
            type: String,
            default: '',
        },
        status: {
            type: String,
            required: [true, 'A Task must have a status assigned to it'],
            enum: {
                values: ['To Do', 'In Progress', 'On Hold', 'Done', 'Deleted'],
                message:
                    'Available statuses are: To Do, In Progress, Done or Deleted',
            },
        },
        startDate: {
            type: Date,
            default: Date.now(),
        },
        endDate: {
            type: Date,
        },
        assignees: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);

this.pre('find', function (next) {
    this.populate({
        path: 'User',
        select: '-__v -password',
    });
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
