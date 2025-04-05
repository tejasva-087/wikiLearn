import {
	createContext,
	useReducer,
	useEffect,
	type ReactNode,
	useContext,
	useCallback,
} from "react";
import type { ForumState, ForumPostType } from "../types";
import { useForumApi } from "../hooks/useForumApi";
import { useAuth } from "../../auth/context/AuthContext";

// Initial state
const initialState: ForumState = {
	posts: [],
	userPosts: [],
	savedPosts: [],
	currentPost: null,
	isLoading: false,
	error: null,
};

// Action types
type ForumAction =
	| { type: "FETCH_POSTS_START" }
	| { type: "FETCH_POSTS_SUCCESS"; payload: ForumPostType[] }
	| { type: "FETCH_USER_POSTS_SUCCESS"; payload: ForumPostType[] }
	| { type: "FETCH_SAVED_POSTS_SUCCESS"; payload: ForumPostType[] }
	| { type: "FETCH_POST_SUCCESS"; payload: ForumPostType }
	| { type: "CREATE_POST_SUCCESS"; payload: ForumPostType }
	| { type: "UPDATE_POST_SUCCESS"; payload: ForumPostType }
	| { type: "DELETE_POST_SUCCESS"; payload: string }
	| { type: "LIKE_POST_SUCCESS"; payload: { postId: string; isLiked: boolean } }
	| { type: "SAVE_POST_SUCCESS"; payload: { postId: string; isSaved: boolean } }
	// biome-ignore lint/suspicious/noExplicitAny:
	| { type: "ADD_COMMENT_SUCCESS"; payload: { postId: string; comment: any } }
	| {
			type: "ADD_REPLY_SUCCESS";
			// biome-ignore lint/suspicious/noExplicitAny:
			payload: { postId: string; commentId: string; reply: any };
	  }
	| { type: "FETCH_ERROR"; payload: string };

function forumReducer(state: ForumState, action: ForumAction): ForumState {
	switch (action.type) {
		case "FETCH_POSTS_START":
			return { ...state, isLoading: true, error: null };

		case "FETCH_POSTS_SUCCESS":
			return { ...state, posts: action.payload, isLoading: false };

		case "FETCH_USER_POSTS_SUCCESS":
			return { ...state, userPosts: action.payload, isLoading: false };

		case "FETCH_SAVED_POSTS_SUCCESS":
			return { ...state, savedPosts: action.payload, isLoading: false };

		case "FETCH_POST_SUCCESS":
			return { ...state, currentPost: action.payload, isLoading: false };

		case "CREATE_POST_SUCCESS":
			return {
				...state,
				posts: [action.payload, ...state.posts],
				userPosts: [action.payload, ...state.userPosts],
				isLoading: false,
			};

		case "UPDATE_POST_SUCCESS":
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === action.payload._id ? action.payload : post
				),
				userPosts: state.userPosts.map((post) =>
					post._id === action.payload._id ? action.payload : post
				),
				savedPosts: state.savedPosts.map((post) =>
					post._id === action.payload._id ? action.payload : post
				),
				currentPost:
					state.currentPost?._id === action.payload._id
						? action.payload
						: state.currentPost,
				isLoading: false,
			};

		case "DELETE_POST_SUCCESS":
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== action.payload),
				userPosts: state.userPosts.filter(
					(post) => post._id !== action.payload
				),
				savedPosts: state.savedPosts.filter(
					(post) => post._id !== action.payload
				),
				currentPost:
					state.currentPost?._id === action.payload ? null : state.currentPost,
				isLoading: false,
			};

		case "LIKE_POST_SUCCESS":
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === action.payload.postId
						? {
								...post,
								isLiked: action.payload.isLiked,
								likes: action.payload.isLiked ? post.likes + 1 : post.likes - 1,
						  }
						: post
				),
				userPosts: state.userPosts.map((post) =>
					post._id === action.payload.postId
						? {
								...post,
								isLiked: action.payload.isLiked,
								likes: action.payload.isLiked ? post.likes + 1 : post.likes - 1,
						  }
						: post
				),
				savedPosts: state.savedPosts.map((post) =>
					post._id === action.payload.postId
						? {
								...post,
								isLiked: action.payload.isLiked,
								likes: action.payload.isLiked ? post.likes + 1 : post.likes - 1,
						  }
						: post
				),
				currentPost:
					state.currentPost?._id === action.payload.postId
						? {
								...state.currentPost,
								isLiked: action.payload.isLiked,
								likes: action.payload.isLiked
									? state.currentPost.likes + 1
									: state.currentPost.likes - 1,
						  }
						: state.currentPost,
			};

		case "SAVE_POST_SUCCESS":
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === action.payload.postId
						? { ...post, isSaved: action.payload.isSaved }
						: post
				),
				userPosts: state.userPosts.map((post) =>
					post._id === action.payload.postId
						? { ...post, isSaved: action.payload.isSaved }
						: post
				),
				savedPosts: action.payload.isSaved
					? state.savedPosts
					: state.savedPosts.filter(
							(post) => post._id !== action.payload.postId
					  ),
				currentPost:
					state.currentPost?._id === action.payload.postId
						? { ...state.currentPost, isSaved: action.payload.isSaved }
						: state.currentPost,
			};

		case "ADD_COMMENT_SUCCESS":
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === action.payload.postId
						? {
								...post,
								comments: [action.payload.comment, ...post.comments],
						  }
						: post
				),
				userPosts: state.userPosts.map((post) =>
					post._id === action.payload.postId
						? {
								...post,
								comments: [action.payload.comment, ...post.comments],
						  }
						: post
				),
				savedPosts: state.savedPosts.map((post) =>
					post._id === action.payload.postId
						? {
								...post,
								comments: [action.payload.comment, ...post.comments],
						  }
						: post
				),
				currentPost:
					state.currentPost?._id === action.payload.postId
						? {
								...state.currentPost,
								comments: [
									action.payload.comment,
									...state.currentPost.comments,
								],
						  }
						: state.currentPost,
			};

		case "ADD_REPLY_SUCCESS":
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === action.payload.postId
						? {
								...post,
								comments: post.comments.map((comment) =>
									comment._id === action.payload.commentId
										? {
												...comment,
												replies: [...comment.replies, action.payload.reply],
										  }
										: comment
								),
						  }
						: post
				),
				userPosts: state.userPosts.map((post) =>
					post._id === action.payload.postId
						? {
								...post,
								comments: post.comments.map((comment) =>
									comment._id === action.payload.commentId
										? {
												...comment,
												replies: [...comment.replies, action.payload.reply],
										  }
										: comment
								),
						  }
						: post
				),
				savedPosts: state.savedPosts.map((post) =>
					post._id === action.payload.postId
						? {
								...post,
								comments: post.comments.map((comment) =>
									comment._id === action.payload.commentId
										? {
												...comment,
												replies: [...comment.replies, action.payload.reply],
										  }
										: comment
								),
						  }
						: post
				),
				currentPost:
					state.currentPost?._id === action.payload.postId
						? {
								...state.currentPost,
								comments: state.currentPost.comments.map((comment) =>
									comment._id === action.payload.commentId
										? {
												...comment,
												replies: [...comment.replies, action.payload.reply],
										  }
										: comment
								),
						  }
						: state.currentPost,
			};

		case "FETCH_ERROR":
			return { ...state, error: action.payload, isLoading: false };

		default:
			return state;
	}
}

// Create context
interface ForumContextType extends ForumState {
	loadPosts: (page?: number, limit?: number) => Promise<void>;
	loadUserPosts: () => Promise<void>;
	loadSavedPosts: () => Promise<void>;
	loadPost: (postId: string) => Promise<void>;
	createNewPost: (
		title: string,
		content: string,
		tags?: string[]
	) => Promise<void>;
	updateExistingPost: (
		postId: string,
		data: { title?: string; content?: string; tags?: string[] }
	) => Promise<void>;
	deleteExistingPost: (postId: string) => Promise<void>;
	toggleLike: (postId: string) => Promise<void>;
	toggleSave: (postId: string) => Promise<void>;
	postComment: (postId: string, content: string) => Promise<void>;
	postReply: (
		postId: string,
		commentId: string,
		content: string
	) => Promise<void>;
	searchForPosts: (query: string) => Promise<ForumPostType[]>;
}

const ForumContext = createContext<ForumContextType | undefined>(undefined);

// Provider component
interface ForumProviderProps {
	children: ReactNode;
}

export function ForumProvider({ children }: ForumProviderProps) {
	const [state, dispatch] = useReducer(forumReducer, initialState);
	const forumApi = useForumApi();
	const { user } = useAuth();

	useEffect(() => {
		if (user) {
			loadPosts();
		}
	}, [user]);

	const loadPosts = async (page = 1, limit = 10) => {
		dispatch({ type: "FETCH_POSTS_START" });
		try {
			const posts = await forumApi.fetchPosts(page, limit);
			dispatch({ type: "FETCH_POSTS_SUCCESS", payload: posts });
		} catch (error) {
			console.error("Failed to load posts:", error);
			dispatch({ type: "FETCH_ERROR", payload: "Failed to load posts" });
		}
	};

	const loadUserPosts = async () => {
		if (!user) {
			return;
		}

		dispatch({ type: "FETCH_POSTS_START" });
		try {
			const posts = await forumApi.fetchUserPosts(user.id);
			dispatch({ type: "FETCH_USER_POSTS_SUCCESS", payload: posts });
		} catch {
			dispatch({ type: "FETCH_ERROR", payload: "Failed to load your posts" });
		}
	};

	const loadSavedPosts = async () => {
		dispatch({ type: "FETCH_POSTS_START" });
		try {
			const posts = await forumApi.fetchSavedPosts();
			dispatch({ type: "FETCH_SAVED_POSTS_SUCCESS", payload: posts });
		} catch {
			dispatch({ type: "FETCH_ERROR", payload: "Failed to load saved posts" });
		}
	};

	const loadPost = async (postId: string) => {
		dispatch({ type: "FETCH_POSTS_START" });
		try {
			const post = await forumApi.fetchPostById(postId);
			dispatch({ type: "FETCH_POST_SUCCESS", payload: post });
		} catch {
			dispatch({ type: "FETCH_ERROR", payload: "Failed to load post" });
		}
	};

	const createNewPost = async (
		title: string,
		content: string,
		tags?: string[]
	) => {
		dispatch({ type: "FETCH_POSTS_START" });
		try {
			const post = await forumApi.createPost(title, content, tags);
			dispatch({ type: "CREATE_POST_SUCCESS", payload: post });
		} catch (error) {
			dispatch({ type: "FETCH_ERROR", payload: "Failed to create post" });
			throw error;
		}
	};

	const updateExistingPost = async (
		postId: string,
		data: { title?: string; content?: string; tags?: string[] }
	) => {
		dispatch({ type: "FETCH_POSTS_START" });
		try {
			const post = await forumApi.updatePost(postId, data);
			dispatch({ type: "UPDATE_POST_SUCCESS", payload: post });
		} catch (error) {
			dispatch({ type: "FETCH_ERROR", payload: "Failed to update post" });
			throw error;
		}
	};

	const deleteExistingPost = async (postId: string) => {
		dispatch({ type: "FETCH_POSTS_START" });
		try {
			await forumApi.deletePost(postId);
			dispatch({ type: "DELETE_POST_SUCCESS", payload: postId });
		} catch (error) {
			dispatch({ type: "FETCH_ERROR", payload: "Failed to delete post" });
			throw error;
		}
	};

	const toggleLike = async (postId: string) => {
		try {
			const post =
				state.posts.find((p) => p._id === postId) ||
				state.userPosts.find((p) => p._id === postId) ||
				state.savedPosts.find((p) => p._id === postId) ||
				state.currentPost;

			if (!post) {
				return;
			}

			const isCurrentlyLiked = post.isLiked;

			// Optimistic update
			dispatch({
				type: "LIKE_POST_SUCCESS",
				payload: { postId, isLiked: !isCurrentlyLiked },
			});

			// Use try-catch to handle errors without causing re-renders
			try {
				await forumApi.likePost(postId);
			} catch {
				// Revert on error
				dispatch({
					type: "LIKE_POST_SUCCESS",
					payload: { postId, isLiked: isCurrentlyLiked },
				});

				dispatch({ type: "FETCH_ERROR", payload: "Failed to like post" });
			}
		} catch (error) {
			console.error("Error in toggleLike:", error);
		}
	};

	const toggleSave = async (postId: string) => {
		try {
			const post =
				state.posts.find((p) => p._id === postId) ||
				state.userPosts.find((p) => p._id === postId) ||
				state.savedPosts.find((p) => p._id === postId) ||
				state.currentPost;

			if (!post) {
				return;
			}

			const isCurrentlySaved = post.isSaved;

			// Optimistic update
			dispatch({
				type: "SAVE_POST_SUCCESS",
				payload: { postId, isSaved: !isCurrentlySaved },
			});

			await forumApi.savePost(postId);
		} catch {
			// Revert on error
			const post =
				state.posts.find((p) => p._id === postId) ||
				state.userPosts.find((p) => p._id === postId) ||
				state.savedPosts.find((p) => p._id === postId) ||
				state.currentPost;

			if (!post) {
				return;
			}

			dispatch({
				type: "SAVE_POST_SUCCESS",
				payload: { postId, isSaved: post.isSaved },
			});

			dispatch({ type: "FETCH_ERROR", payload: "Failed to save post" });
		}
	};

	const postComment = async (postId: string, content: string) => {
		try {
			await forumApi.addComment(postId, content);
			// In a real app, you'd get the new comment from the API response
			// For now, we'll simulate it
			const newComment = {
				_id: Date.now().toString(),
				authorId: user?.id || "",
				authorName: user?.name || "User",
				authorAvatar: user?.avatar,
				content,
				createdAt: new Date().toISOString(),
				replies: [],
			};

			dispatch({
				type: "ADD_COMMENT_SUCCESS",
				payload: { postId, comment: newComment },
			});
		} catch (error) {
			dispatch({ type: "FETCH_ERROR", payload: "Failed to post comment" });
			throw error;
		}
	};

	const postReply = async (
		postId: string,
		commentId: string,
		content: string
	) => {
		try {
			await forumApi.addReply(postId, commentId, content);
			// Simulate new reply
			const newReply = {
				_id: Date.now().toString(),
				authorId: user?.id || "",
				authorName: user?.name || "User",
				authorAvatar: user?.avatar,
				content,
				createdAt: new Date().toISOString(),
			};

			dispatch({
				type: "ADD_REPLY_SUCCESS",
				payload: { postId, commentId, reply: newReply },
			});
		} catch (error) {
			dispatch({ type: "FETCH_ERROR", payload: "Failed to post reply" });
			throw error;
		}
	};

	const searchForPosts = async (query: string): Promise<ForumPostType[]> => {
		try {
			return await forumApi.searchPosts(query);
		} catch (error) {
			dispatch({ type: "FETCH_ERROR", payload: "Failed to search posts" });
			throw error;
		}
	};

	const memoizedLoadPosts = useCallback(loadPosts, []);

	return (
		<ForumContext.Provider
			value={{
				...state,
				loadPosts: memoizedLoadPosts,
				loadUserPosts,
				loadSavedPosts,
				loadPost,
				createNewPost,
				updateExistingPost,
				deleteExistingPost,
				toggleLike,
				toggleSave,
				postComment,
				postReply,
				searchForPosts,
			}}
		>
			{children}
		</ForumContext.Provider>
	);
}

export function useForum() {
	const context = useContext(ForumContext);
	if (context === undefined) {
		throw new Error("useForum must be used within a ForumProvider");
	}
	return context;
}
