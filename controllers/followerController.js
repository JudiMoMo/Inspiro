import User from '../models/User.js';


export const getFollowers = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).populate('followers', 'name surname username profileImage');
        if (!user) {
            return res.status(404).send('User not found');
        }
        const followers = user.followers;
        return render('followers', { followers });
    } catch (error) {
        console.error('Error fetching followers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getFollowing = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).populate('following', 'name surname username profileImage');
        if (!user) {
            return res.status(404).send('User not found');
        }
        const following = user.following;
        return render('following', { following });
    }
    catch (error) {
        console.error('Error fetching following:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const followUser = async (req, res) => {
    try {
        const { userId, followUserId } = req.body;

        // Add followUserId to the following list of userId
        await User.updateOne(
            { _id: userId },
            { $addToSet: { following: followUserId } }
        );

        await User.updateOne(
            { _id: followUserId },
            { $addToSet: { followers: userId } }
        );


        //redirect back to the page
        res.json({ status: follow });

    } catch (error) {
        console.error('Error following user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const unfollowUser = async (req, res) => {
    try {
        const { userId, unfollowUserId } = req.body;

        // Remove unfollowUserId from the following list of userId
        await User.findByIdAndUpdate(userId, { $pull: { following: unfollowUserId } });

        // Remove userId from the followers list of unfollowUserId
        await User.findByIdAndUpdate(unfollowUserId, { $pull: { followers: userId } });

        //redirect back to the page
        res.json({ status: unfollow });
    } catch (error) {
        console.error('Error unfollowing user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}