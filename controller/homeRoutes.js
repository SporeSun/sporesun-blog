const router = require('express').Router();

// Route to serve the homepage
router.get('/', (req, res) => {
    res.render('home');
});

// Add more routes as needed

module.exports = router;
