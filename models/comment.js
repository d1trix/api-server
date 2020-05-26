const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const commentSchema = new mongoose.Schema({
  work_effort_id: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  left_at: {
    type: Date,
    required: true,
    default: Date.now
  },
  user_id: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Comment', commentSchema);