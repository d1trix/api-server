const express = require('express');
const router = express.Router({ mergeParams: true });
const Comment = require('../models/comment');

// will return all the comments for this work effort
router.get('/work-effort/:workEffortId/comments', async (req, res) => {
  try {
    const work_effort_id = req.params['workEffortId'];
    const comments = await Comment.find({ work_effort_id });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// will save a new comment to the work effort
router.post('/work-effort/:workEffortId/comments', async (req, res) => {
  const bindingModel = req.body;
  const comment = new Comment({
    work_effort_id: bindingModel.work_effort_id,
    comment: bindingModel.comment,
    left_at: bindingModel.left_at,
    user_id: bindingModel.user_id
  })
  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);

  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

// will delete a single comment
router.delete('/work-effort/:workEffortId/comments/:commentId', async (req, res) => {
  try {
    const work_effort_id = req.params['workEffortId'];
    const comment_id = req.params['commentId'];

    await Comment.deleteOne({ _id: comment_id, work_effort_id }, (err) => { console.log(err) });
    res.json({ message: 'Comment deleted!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

});



module.exports = router;