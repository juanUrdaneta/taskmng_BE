const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');

const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1', routes);
app.use(globalErrorHandler);

module.exports = app;
