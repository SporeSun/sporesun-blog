const express = require('express');
const router = express.Router();

// Importing individual route files
const userRoutes = require('./users');
const postRoutes = require('./posts');
const commentRoutes = require('./comments');

// Middleware to use specific routes
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

// Exporting the main router
module.exports = router;
