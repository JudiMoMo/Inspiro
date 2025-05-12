import comments from '../models/Comment.js';

//specific user create a comment
export const createComment = async (req, res) => {
    try {
        const { post, user, content } = req.body;
        const newComment = new comments({ post, user, content, createdAt: Date.now(), updatedAt: Date.now() });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Witha  specific post get all the comments of that post
export const getComments = async (req, res) => {
    try {
        const { postId } = req.params;
        const allComments = await comments.find({ post: postId }).populate('user', 'name');
        res.status(200).json(allComments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//With a specific comment get the comment
export const getComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const comment = await comments.findById(commentId).populate('user', 'name');
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(comment);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
//With a specific comment update the comment
export const updateComment = async (req, res) =>{
    try {
        const { commentId } = req.params;
        const { content } = req.body;
        const updatedComment = await comments.findByIdAndUpdate(
            commentId,
            { content },
            { updatedAt: date.now() }
        );
        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}