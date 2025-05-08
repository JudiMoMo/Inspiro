import Like from '../models/Like.js';

export const likePost = async (req, res) => {
  try {
    const {postId } = req.params;
    const userId = req.session.user?.id;

    if (!userId) return res.status(401).send('Not logged in');

    const like = new Like({ post: postId, user: userId });
    await like.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const unlikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.session.user.id;

    // if (!userId) return res.status(401).send('Not logged in');

    await Like.deleteOne({ post: postId, user: userId });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: `SERVER ERRROR PostID=${postId} unliked and UserID${userId} deleted`  });
  }
};

export const getPostLikes = async (req, res) => {
  try {
    const { postId } = req.params;
    const likes = await Like.find({ post: postId }).populate('user', 'username profileImage');
    res.status(200).json(likes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
