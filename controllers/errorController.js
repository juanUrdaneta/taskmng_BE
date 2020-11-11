const AppError = require('../utils/appErrors');

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        err: err,
        message: err.message,
        stack: err.stack,
    });
};

const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        console.log(err);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong',
        });
    }
};

module.exports = (err, req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        sendErrorProd(err, res);
    } else if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    }
    next();
};
