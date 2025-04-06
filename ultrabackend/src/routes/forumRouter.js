const express = require("express");
const forumController = require("../controllers/forumController");
const { verifyToken } = require("../middleware/auth.middleware");

const router = express.Router();

// Protect all routes
router.use(verifyToken);

// Post routes
router
  .route("/posts")
  .get(forumController.getAllPosts)
  .post(forumController.createPost);

router
  .route("/posts/:id")
  .get(forumController.getPost)
  .put(forumController.updatePost)
  .delete(forumController.deletePost);

// User-specific routes
router.get("/posts/user/:userId?", forumController.getUserPosts);
router.get("/posts/saved", forumController.getSavedPosts);

// Interaction routes
router.post("/posts/:id/like", forumController.likePost);
router.post("/posts/:id/save", forumController.savePost);

// Comment routes
router.post("/posts/:id/comments", forumController.addComment);
router.post("/posts/:id/comments/:commentId/replies", forumController.addReply);

// Search route
router.get("/search", forumController.searchPosts);

module.exports = router;
