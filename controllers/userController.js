// Import User model //
// Also grab Thought model to delete info if user is deleted //
const { User, Thought, Reaction } = require('../models');

module.exports = {
    // Get all users
    // Added {}, { __v: 0 } so it would ignore the _V in insomnia //
    async getUsers(req, res) {
        try {
            const users = await User.find({}, { __v: 0 });
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v');
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a new user
    async createSingleUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Update a user
    async updateSingleUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true, select: { __v: 0 } }
            )
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete a user and associated thoughts //
    async deleteSingleUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            // Need to also delete from other User's array if User is deleted //
            await User.updateMany(
                { friends: req.params.userId },
                { $pull: { friends: req.params.userId } }
            );
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'User and associated thoughts deleted!' })
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Add a friend
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                // Use req.params.userID instead of req.boy due to the API route //
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            )
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json({message: 'Friend added!'});
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Remove a friend from User's list //
    // We still use update here to update on Friend to theoretically not exist rather than actually removing the whole array //
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                // $pull from an existing array all instances of a value or values that match a specified condition //
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            )
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json({message: 'Friend removed!'});
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
