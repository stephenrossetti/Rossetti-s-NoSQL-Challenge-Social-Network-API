// Require mongoose and dependencies //
// Require reactionSchema to define as a reaction property below //
const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');

// Define Schema to create Thought model //
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        // Use mongoose Date type for easier functionality //
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        // Add reactions from reactionSchema //
        reactions: [reactionSchema],
    },
    {
        // Here we are indicating that we want virtuals and getters (date formatting) //
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual property `reactionCount` that gets the amount of reactions per thought //
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Create a getter method to format the timestamp on query //
thoughtSchema.virtual('timestamp').get(function () {
    return this.createdAt.getTime();
});

// Initialize our Thought model //
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;