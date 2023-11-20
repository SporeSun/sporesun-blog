const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

// User registration
router.get('/register', (req, res) => {
    res.render('registration');
});
router.post('/register', async (req, res) => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new user
        const newUser = await User.create({
            username: req.body.username,
            password: hashedPassword
        });

        // Set up session variable to indicate user is logged in
        req.session.save(() => {
            req.session.userId = newUser.id;
            req.session.username = newUser.username;
            req.session.loggedIn = true;

            res.redirect('/api/dashboard');
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});


// User login
router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login', async (req, res) => {
    try {
        // Find the user by username
        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        // Check the password
        const validPassword = await bcrypt.compare(req.body.password, userData.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        // Set up session variable to indicate user is logged in
        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

            res.json({ user: userData, message: 'You are now logged in!' });
            res.redirect('/api/dashboard'); // Redirect to dashboard
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});


// User logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});


module.exports = router;
