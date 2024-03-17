// Import Thought model //
// Also grab User model to delete info if thought is deleted //
const { Thought, User } = require('../models');

// Very similar to the userController since it's a similar methodology but with thoughts and reactions //
module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find({}, { __v: 0 });
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a new thought
    // Need to push to User's array //
    async createSingleThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const {_id} = thought;
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: _id } },
                { runValidators: true, new: true }
            )
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Update a thought
    async updateSingleThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            )
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete a thought and associated thoughts //
    async deleteSingleThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            // This will update the User's thought array to pull out that deleted thought //
            await User.updateMany(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } }
            );
            // Delete all reactions associated with that thought //
            await Thought.deleteMany({ _id: { $in: thought.reactions } });
            res.json({ message: 'Thought and associated reactions deleted!' })
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Add a reaction
    async addReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                // Use req.boy due to the API route //
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            )
            if (!reaction) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json({ message: 'Reaction added!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Remove a reaction from Thought's list //
    async removeReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                // $pull from an existing array all instances of a value or values that match a specified condition //
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            )
            if (!reaction) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json({ message: 'Reaction removed!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
