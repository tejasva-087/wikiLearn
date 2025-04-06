const ForumPost = require("../models/forumPostModel");
const ForumInteraction = require("../models/forumInteractionModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

// Helper function to format post data with user interaction info
const formatPostWithUserInteraction = async (post, userId) => {
  // Convert Mongoose document to plain object
  const formattedPost = post.toObject();

  // Check if the user has interacted with this post
  const interaction = await ForumInteraction.findOne({
    userId,
    postId: post._id,
  });

  // Add interaction data
  formattedPost.isLiked = interaction ? interaction.liked : false;
  formattedPost.isSaved = interaction ? interaction.saved : false;

  // Format author data
  if (formattedPost.authorId) {
    formattedPost.authorName = formattedPost.authorId.name;
    formattedPost.authorAvatar = formattedPost.authorId.avatar;
    formattedPost.authorId = formattedPost.authorId._id;
  }

  // Format comments
  formattedPost.comments = await Promise.all(
    formattedPost.comments.map(async (comment) => {
      const commentAuthor = await User.findById(comment.authorId);
      return {
        ...comment,
        authorName: commentAuthor ? commentAuthor.name : "Unknown User",
        authorAvatar: commentAuthor ? commentAuthor.avatar : null,
        replies: await Promise.all(
          comment.replies.map(async (reply) => {
            const replyAuthor = await User.findById(reply.authorId);
            return {
              ...reply,
              authorName: replyAuthor ? replyAuthor.name : "Unknown User",
              authorAvatar: replyAuthor ? replyAuthor.avatar : null,
            };
          }),
        ),
      };
    }),
  );

  return formattedPost;
};

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  // Get posts with pagination
  const posts = await ForumPost.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  // Format posts with user interaction data
  const formattedPosts = await Promise.all(
    posts.map((post) => formatPostWithUserInteraction(post, req.user.id)),
  );

  res.status(200).json({
    status: "success",
    results: formattedPosts.length,
    posts: formattedPosts,
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await ForumPost.findById(req.params.id);

  if (!post) {
    return next(new AppError("No post found with that ID", 404));
  }

  // Format post with user interaction data
  const formattedPost = await formatPostWithUserInteraction(post, req.user.id);

  res.status(200).json({
    status: "success",
    post: formattedPost,
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  // Create new post
  const newPost = await ForumPost.create({
    title: req.body.title,
    content: req.body.content,
    authorId: req.user.id,
    tags: req.body.tags || [],
  });

  // Format post with user interaction data
  const formattedPost = await formatPostWithUserInteraction(
    newPost,
    req.user.id,
  );

  res.status(201).json({
    status: "success",
    post: formattedPost,
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const post = await ForumPost.findById(req.params.id);

  if (!post) {
    return next(new AppError("No post found with that ID", 404));
  }

  // Check if user is the author
  if (post.authorId.id !== req.user.id) {
    return next(new AppError("You can only update your own posts", 403));
  }

  // Update post
  const updatedPost = await ForumPost.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  // Format post with user interaction data
  const formattedPost = await formatPostWithUserInteraction(
    updatedPost,
    req.user.id,
  );

  res.status(200).json({
    status: "success",
    post: formattedPost,
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await ForumPost.findById(req.params.id);

  if (!post) {
    return next(new AppError("No post found with that ID", 404));
  }

  // Check if user is the author
  if (post.authorId.id !== req.user.id) {
    return next(new AppError("You can only delete your own posts", 403));
  }

  await ForumPost.findByIdAndDelete(req.params.id);

  // Delete all interactions with this post
  await ForumInteraction.deleteMany({ postId: req.params.id });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.likePost = catchAsync(async (req, res, next) => {
  const postId = req.params.id;
  const userId = req.user.id;

  // Find the post
  const post = await ForumPost.findById(postId);

  if (!post) {
    return next(new AppError("No post found with that ID", 404));
  }

  // Find or create interaction
  let interaction = await ForumInteraction.findOne({ userId, postId });

  if (!interaction) {
    interaction = await ForumInteraction.create({
      userId,
      postId,
      liked: true,
    });

    // Increment post likes
    await ForumPost.findByIdAndUpdate(postId, { $inc: { likes: 1 } });
  } else {
    // Toggle like status
    const newLikedStatus = !interaction.liked;

    // Update post likes count
    const likeDelta = newLikedStatus ? 1 : -1;
    await ForumPost.findByIdAndUpdate(postId, { $inc: { likes: likeDelta } });

    // Update interaction
    interaction.liked = newLikedStatus;
    await interaction.save();
  }

  res.status(200).json({
    status: "success",
    data: {
      liked: interaction.liked,
    },
  });
});

exports.savePost = catchAsync(async (req, res, next) => {
  const postId = req.params.id;
  const userId = req.user.id;

  // Find the post
  const post = await ForumPost.findById(postId);

  if (!post) {
    return next(new AppError("No post found with that ID", 404));
  }

  // Find or create interaction
  let interaction = await ForumInteraction.findOne({ userId, postId });

  if (!interaction) {
    interaction = await ForumInteraction.create({
      userId,
      postId,
      saved: true,
    });
  } else {
    // Toggle saved status
    interaction.saved = !interaction.saved;
    await interaction.save();
  }

  res.status(200).json({
    status: "success",
    data: {
      saved: interaction.saved,
    },
  });
});

exports.getUserPosts = catchAsync(async (req, res, next) => {
  const userId = req.params.userId || req.user.id;

  const posts = await ForumPost.find({ authorId: userId }).sort({
    createdAt: -1,
  });

  // Format posts with user interaction data
  const formattedPosts = await Promise.all(
    posts.map((post) => formatPostWithUserInteraction(post, req.user.id)),
  );

  res.status(200).json({
    status: "success",
    results: formattedPosts.length,
    posts: formattedPosts,
  });
});

exports.getSavedPosts = catchAsync(async (req, res, next) => {
  // Find all saved interactions for the user
  const savedInteractions = await ForumInteraction.find({
    userId: req.user.id,
    saved: true,
  });

  // Get the post IDs
  const postIds = savedInteractions.map((interaction) => interaction.postId);

  // Find the posts
  const posts = await ForumPost.find({ _id: { $in: postIds } }).sort({
    createdAt: -1,
  });

  // Format posts with user interaction data
  const formattedPosts = await Promise.all(
    posts.map((post) => formatPostWithUserInteraction(post, req.user.id)),
  );

  res.status(200).json({
    status: "success",
    results: formattedPosts.length,
    posts: formattedPosts,
  });
});

exports.addComment = catchAsync(async (req, res, next) => {
  const postId = req.params.id;
  const { content } = req.body;

  if (!content) {
    return next(new AppError("Comment content cannot be empty", 400));
  }

  // Find the post
  const post = await ForumPost.findById(postId);

  if (!post) {
    return next(new AppError("No post found with that ID", 404));
  }

  // Add comment
  const newComment = {
    authorId: req.user.id,
    content,
  };

  post.comments.push(newComment);
  await post.save();

  // Get the newly added comment
  const addedComment = post.comments[post.comments.length - 1];

  // Get author info
  const author = await User.findById(req.user.id);

  res.status(201).json({
    status: "success",
    comment: {
      _id: addedComment._id,
      authorId: req.user.id,
      authorName: author.name,
      authorAvatar: author.avatar,
      content: addedComment.content,
      createdAt: addedComment.createdAt,
      replies: [],
    },
  });
});

exports.addReply = catchAsync(async (req, res, next) => {
  const postId = req.params.id;
  const commentId = req.params.commentId;
  const { content } = req.body;

  if (!content) {
    return next(new AppError("Reply content cannot be empty", 400));
  }

  // Find the post
  const post = await ForumPost.findById(postId);

  if (!post) {
    return next(new AppError("No post found with that ID", 404));
  }

  // Find the comment
  const comment = post.comments.id(commentId);

  if (!comment) {
    return next(new AppError("No comment found with that ID", 404));
  }

  // Add reply
  const newReply = {
    authorId: req.user.id,
    content,
  };

  comment.replies.push(newReply);
  await post.save();

  // Get the newly added reply
  const addedReply = comment.replies[comment.replies.length - 1];

  // Get author info
  const author = await User.findById(req.user.id);

  res.status(201).json({
    status: "success",
    reply: {
      _id: addedReply._id,
      authorId: req.user.id,
      authorName: author.name,
      authorAvatar: author.avatar,
      content: addedReply.content,
      createdAt: addedReply.createdAt,
    },
  });
});

exports.searchPosts = catchAsync(async (req, res, next) => {
  const query = req.query.q;

  if (!query) {
    return next(new AppError("Search query is required", 400));
  }

  // Search in title, content, and tags
  const posts = await ForumPost.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { content: { $regex: query, $options: "i" } },
      { tags: { $in: [new RegExp(query, "i")] } },
    ],
  }).sort({ createdAt: -1 });

  // Format posts with user interaction data
  const formattedPosts = await Promise.all(
    posts.map((post) => formatPostWithUserInteraction(post, req.user.id)),
  );

  res.status(200).json({
    status: "success",
    results: formattedPosts.length,
    posts: formattedPosts,
  });
});
