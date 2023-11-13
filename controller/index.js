const router = require('express').Router();

const apiRoutes = require('./api'); // Adjust the path if necessary
const homeRoutes = require('./homeRoutes.js');

// Use the API routes
router.use('/api', apiRoutes);

// Use the Home routes
router.use('/', homeRoutes);

// Export the consolidated routes
module.exports = router;
