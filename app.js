import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import favicon from 'serve-favicon';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import homeRouter from './routes/home.js';
import profileRouter from './routes/profile.js';
import postRouter from './routes/posts.js';

dotenv.config(); // Load environment variables

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('public/uploads'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


// Session middleware (must be before routes)
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // MUST be false for localhost unless using HTTPS
    maxAge: 1000 * 60 * 60 // 1 hour or whatever you prefer
  }
}));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/home', homeRouter);
app.use('/profile', profileRouter);
app.use('/post', postRouter);

// 404 error handler
app.use((req, res, next) => {
  res.status(404).render('error', { message: 'Page Not Found' });
});

// Global error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

export default app;
