// Require mongoose and dependencies //
// Model not needed //
const { Schema, Types } = require('mongoose');
const dateFormat = require("../utils/dateFormat");

// Define Schema for Reaction //
const reactionSchema = new Schema(
    {
        // Utilized Activity 26 for format. Type is already defined ObjectID and default is a set to new ObjectID //
        reactionId: {
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
        // Create a getter method to format the timestamp on query //
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
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

module.exports = reactionSchema;