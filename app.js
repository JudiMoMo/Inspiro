import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import favicon from 'serve-favicon';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

import indexRouter from './routes/indexRoute.js';
import authRouter from './routes/authRoutes.js';
import likeRoutes from './routes/likeRoutes.js';
// import usersRouter from './routes/users.js';
import homeRouter from './routes/homeRoute.js';
import profileRouter from './routes/profileRoutes.js';
import postRouter from './routes/postRoutes.js';
import commentRouter from './routes/commentRoutes.js';
import followRoutes from './routes/followerRoutes.js';
import searchRouter from './routes/searchRoute.js';


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
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
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

// --- Make session user available to views ---
app.use((req, res, next) => {
  res.locals.sessionUser = req.session.user;
  next();
});

// Routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
// app.use('/users', usersRouter);
app.use('/home', homeRouter);
app.use('/profile', profileRouter);
app.use('/posts', postRouter);
app.use('/posts', likeRoutes);
app.use('/posts', commentRouter);
app.use('/user', followRoutes);
app.use('/search', searchRouter); // search bar


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
