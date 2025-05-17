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
        const { userId, userLoggedInId } = req.body;

        //When followinga an user, we add the userId to our session user's following list
        await User.updateOne(
            { _id: userLoggedInId },
            { $addToSet: { following: userId } }
        );

        //When following a user, we add the userLoggedInId to the followed user's followers list
        await User.updateOne(
            { _id: userId },
            { $addToSet: { followers: userLoggedInId } }
        );


        //redirect back to the page
        res.json({ status: "follow" });

    } catch (error) {
        console.error('Error following user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const unfollowUser = async (req, res) => {
    try {
        const { userId, userLoggedInId } = req.body;

        //When unfollowing a user, we remove the userId from our session user's following list
        await User.findByIdAndUpdate(userLoggedInId, {
            $pull: { following: userId }
        });

        //When unfollowing a user, we remove the userLoggedInId from the followed user's followers list
        await User.findByIdAndUpdate(userId, {
            $pull: { followers: userLoggedInId }
        });

        //redirect back to the page
        res.json({ status: "unfollow" });
    } catch (error) {
        console.error('Error unfollowing user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}