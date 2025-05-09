import Like from '../models/Like.js';
import Post from '../models/Post.js';

export const likePost = async (req, res) => {
  try {

    const {postId } = req.params;
    const userId = req.session.user?.id;

    if (!userId) return res.status(401).send('Not logged in');

    const PostsLiked = await Post.findOne({_id: postId});
    const like = new Like({ post: postId, user: userId });

   
    await like.save();

    //Update the collection of likes of the post so that it can be used to show the number of likes on the post
    PostsLiked.likes.push(userId);
    await PostsLiked.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const unlikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.session.user.id;
    const PostsUnLiked = await Post.findOne({_id: postId});

    // if (!userId) return res.status(401).send('Not logged in');

    await Like.deleteOne({ post: postId, user: userId });

    PostsUnLiked.likes = PostsUnLiked.likes.filter((like) => like.toString() !== userId.toString());
    await PostsUnLiked.save();

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
