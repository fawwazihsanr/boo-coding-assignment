const express = require('express');
const router = express.Router();
const Comments = require('../models/comment')
const {createComment, getComment, actionComment} = require('../services/comment')

module.exports = function() {
    router.post('/', async (req, res) => {
        try {
            const {comment, mbti, enneagram, zodiac} = req.body;
            const savedComment = await createComment(comment, mbti, enneagram, zodiac);
            res.json(savedComment);
        } catch (error) {
            res.status(500).json({error: error});
        }
    })

    router.post('/:commentId/like', async(req, res) => {
        try{
            const {commentId} = req.params;
            const {userId, type} = req.body;
            await actionComment(commentId, userId, type)
            res.json(await Comments.findById(commentId));
        } catch (error){
            res.status(500).json({ error: error.message });
        }
    })

    router.get('/', async(req, res) => {
        try {
            const { type } = req.query;
            const comments = await getComment(type);
            res.json(comments);
        } catch (error) {
            console.error('Error retrieving comments:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
          }
    })
    return router;
}