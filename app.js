const express = require('express');
const morgan = require('morgan');
const projectRouter = require('./routes/projectRoutes');
const issueRouter = require('./routes/issueRoutes');
const AppError = require('./util/appError');
const globalErrorHandeler = require('./controller/errorController');
const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/project', projectRouter);
app.use('/api/v1/issue', issueRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandeler);

module.exports = app;
