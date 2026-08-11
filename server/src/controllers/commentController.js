import Comment from '../models/Comment.js';

export async function listComments(req, res) {
  try {
    const { targetType, targetSlug } = req.params;
    const comments = await Comment.find({ targetType, targetSlug })
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.json({ count: comments.length, comments });
  } catch (err) {
    res.status(500).json({ message: 'Could not load comments.', error: err.message });
  }
}

export async function createComment(req, res) {
  try {
    const { targetType, targetSlug } = req.params;
    const { body } = req.body;

    if (!body || !body.trim()) {
      return res.status(400).json({ message: 'Comment body cannot be empty.' });
    }
    if (!['Character', 'TitanKin'].includes(targetType)) {
      return res.status(400).json({ message: 'Invalid comment target type.' });
    }

    const comment = await Comment.create({
      author: req.user._id,
      targetType,
      targetSlug,
      body: body.trim(),
    });
    const populated = await comment.populate('author', 'username');
    res.status(201).json({ comment: populated });
  } catch (err) {
    res.status(500).json({ message: 'Could not post comment.', error: err.message });
  }
}

export async function deleteComment(req, res) {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found.' });

    const isOwner = comment.author.equals(req.user._id);
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'You can only delete your own comments.' });
    }

    await comment.deleteOne();
    res.json({ message: 'Comment deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Could not delete comment.', error: err.message });
  }
}
