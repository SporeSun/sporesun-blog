const express = require('express');
const router = express.Router();
const { Comment } = require('../../models');

// Add a comment
router.post('/', async (req, res) => {
    // Logic to add a new comment
});

// Delete a comment
router.delete('/:id', async (req, res) => {
    // Logic to delete a comment
});

module.exports = router;
