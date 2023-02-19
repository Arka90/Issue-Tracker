const express = require('express');
const morgan = require('morgan');
const projectRouter = require('./routes/projectRoutes');
const issueRouter = require('./routes/issueRoutes');
const viewRouter = require('./routes/viewRoutes');
var bodyParser = require('body-parser');
const AppError = require('./util/appError');
const globalErrorHandeler = require('./controller/errorController');
const app = express();
const ejs = require('ejs');
const path = require('path');
app.use(bodyParser.urlencoded());
// Setting Up the views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(`${__dirname}/public`));

app.use(morgan('dev'));
app.use(express.json());

app.use('/', viewRouter);
app.use('/api/v1/project', projectRouter);
app.use('/api/v1/issue', issueRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandeler);

module.exports = app;
