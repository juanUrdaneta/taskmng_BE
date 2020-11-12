const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, 'A user must have a name'],
            minlength: [4, 'A user name cannot contain less than 4 characters'],
            maxlength: [
                30,
                'A user name cannot contain more than 30 characters',
            ],
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'A user must have an email'],
        },
        password: {
            type: String,
            required: [true, 'A user must have a password'],
            select: false,
        },
        role: {
            type: String,
            required: [true, 'A user must have a role assigned'],
            enum: {
                values: ['admin', 'user'],
            },
            default: 'user',
        },
        acronim: String,
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);

userSchema.pre('save', async function (next) {
    const name = this.name.split(' ');
    const [firstName, lastname] = [name[0], name[1]];

    this.acronim = firstName[0]
        .toUpperCase()
        .concat(lastname[0].toUpperCase() || '');

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;

    next();
});

userSchema.methods.confirmPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
