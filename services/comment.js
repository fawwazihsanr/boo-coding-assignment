const Comment = require('../models/comment');

const createComment = async (comment, mbti, enneagram, zodiac) => {
    const newComment = new Comment({comment, mbti, enneagram, zodiac});
    return await newComment.save();
}

const getComment = async (type, ) => {
    let query = {};
            
    if (type === 'mbti') {
        query = { 'mbti': { $exists: true } };
        } else if (type === 'enneagram') {
        query = { 'enneagram': { $exists: true } };
        } else if (type === 'zodiac'){
        query = { 'zodiac': { $exists: true } };
    }

    return await Comment.find(query);
}

const actionComment = async (commentId, userId, type) => {
    const comment = await Comment.findById(commentId);
    const alreadyLiked = comment.likes.some((like) => like.user === userId);
    const alreadyDisliked = comment.dislikes.some((dislike) => dislike.user === userId);
    
    if (type === 'like'){
        if (alreadyLiked){
            await Comment.findByIdAndUpdate(
                commentId,
                {
                    $pull: {likes: {user: userId}},
                },
                {new: true}
            );
        } else{
            await Comment.findByIdAndUpdate(
                commentId,
                {
                    $push: {likes: {user: userId} },
                    $pull: {dislikes: {user: userId}},
                },
                {new: true}
            );
        }
    } else if(type === 'dislike'){
        if (alreadyDisliked){
            await Comment.findByIdAndUpdate(
                commentId,
                {
                    $pull: {dislikes: {user: userId}},
                },
                {new: true}
            );
        } else {
            await Comment.findByIdAndUpdate(
                commentId,
                {
                    $push: {dislikes: {user: userId} },
                    $pull: {likes: {user: userId}},
                },
                {new: true}
            );
        }
    }
}
module.exports = {createComment, getComment, actionComment}