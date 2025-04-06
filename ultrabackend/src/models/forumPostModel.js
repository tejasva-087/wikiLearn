const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Reply must belong to a user"],
    },
    content: {
      type: String,
      required: [true, "Reply cannot be empty"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const commentSchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Comment must belong to a user"],
    },
    content: {
      type: String,
      required: [true, "Comment cannot be empty"],
    },
    replies: [replySchema],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const forumPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A post must have a title"],
      trim: true,
      maxlength: [
        100,
        "A post title must have less or equal than 100 characters",
      ],
    },
    content: {
      type: String,
      required: [true, "A post must have content"],
    },
    authorId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Post must belong to a user"],
    },
    likes: {
      type: Number,
      default: 0,
    },
    tags: [String],
    comments: [commentSchema],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

forumPostSchema.pre(/^find/, function (next) {
  this.populate({
    path: "authorId",
    select: "name avatar",
  });

  next();
});

const ForumPost = mongoose.model("ForumPost", forumPostSchema);

module.exports = ForumPost;
