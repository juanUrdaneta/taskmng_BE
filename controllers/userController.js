const User = require('../models/userModel');
// const AppError = require('../utils/appErrors');
// const catchAsync = require('../utils/catchAsyncMethod');
const Factory = require('./handlerFactory');

exports.getUser = Factory.getOne(User);
exports.getAllUsers = Factory.getAll(User);
exports.createUser = Factory.createOne(User);
exports.updateUser = Factory.updateOne(User);
exports.deleteUser = Factory.deleteOne(User);
