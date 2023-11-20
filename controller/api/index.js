const express = require('express');
const router = express.Router();

// Importing individual route files
const userRoutes = require('./userRoute.js');
const postRoutes = require('./postRoute.js');
const commentRoutes = require('./commentRoute.js');
const dashboardRoutes = require('./dashboardRoute.js');
// Middleware to use specific routes
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/dashboard', dashboardRoutes);

// Exporting the main router
module.exports = router;
