// Require mongoose and dependencies //
// Model not needed //
const { Schema } = require('mongoose');

// Define Schema for Reaction //
const reactionSchema = new Schema(
    {
        // Utilized Activity 26 for format. Type is already defined ObjectID and default is a set to new ObjectID //
        reactionID: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        // Use mongoose Date type for easier functionality //
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        // Here we are indicating that we want getters (date formatting) //
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

// Create a getter method to format the timestamp on query //
reactionSchema.virtual('timestamp').get(function () {
    return this.createdAt.getTime();
});

module.exports = reactionSchema;