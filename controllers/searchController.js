import User from "../models/User.js";
import Post from "../models/Post.js";


export const searchUsersPosts = async (req, res) => {

    //With the current user, find all the posts and users that match the query. I needs to be maximum 20 posts and 20 users
    const posts = await Post.find()
        .populate('author', 'username profileImage')
        .sort({ createdAt: -1 })
        .limit(20);
    const users = await User.find()
        .sort({ createdAt: -1 })
        .limit(10);

    //Withg that, we send the data to the explore page with the users and the posts, we
    res.render('explore', { posts, users });

}

export const explore = async (req, res) => {
    //We just render the explore page with the posts and users
    const posts = await Post.find()
        .populate('author', 'username profileImage')
        .sort({ createdAt: -1 })
        .limit(20);
    const users = await User.find()
        .sort({ createdAt: -1 })
        .limit(10);
    res.render('explore', { posts, users });
}







