const express = require('express');
const router = express.Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to display the dashboard
router.get('/', withAuth, async (req, res) => {
    try {
        // Retrieve user's posts
        const postData = await Post.findAll({
            where: {
                userId: req.session.userId
            }
        });

        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('dashboard', { 
            posts, 
            loggedIn: req.session.loggedIn 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to handle adding a new post
router.post('/add', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            userId: req.session.userId
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route to update an existing post
router.put('/update/:id', withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.update(req.body, {
            where: {
                id: req.params.id,
                userId: req.session.userId
            }
        });
        if (!updatedPost) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        res.json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to delete a post
router.delete('/delete/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                userId: req.session.userId
            }
        });
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        res.json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
