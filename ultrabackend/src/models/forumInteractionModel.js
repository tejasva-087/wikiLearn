const mongoose = require("mongoose");

const forumInteractionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Interaction must belong to a user"],
    },
    postId: {
      type: mongoose.Schema.ObjectId,
      ref: "ForumPost",
      required: [true, "Interaction must belong to a post"],
    },
    liked: {
      type: Boolean,
      default: false,
    },
    saved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Create a compound index to ensure a user can only have one interaction per post
forumInteractionSchema.index({ userId: 1, postId: 1 }, { unique: true });

const ForumInteraction = mongoose.model(
  "ForumInteraction",
  forumInteractionSchema,
);

module.exports = ForumInteraction;
