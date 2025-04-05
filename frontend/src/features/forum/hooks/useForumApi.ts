import { useMemo, useState } from "react";
import axios from "axios";
import type { ForumPostType } from "../types";
import { useAuth } from "../../auth/context/AuthContext";

const API_URL =
	import.meta.env.VITE_API_URL || "http://localhost:3000/api/forum";

export function useForumApi() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { token } = useAuth();

	const api = useMemo(() => {
		return axios.create({
			baseURL: API_URL,
			headers: {
				"Content-Type": "application/json",
				Authorization: token ? `Bearer ${token}` : "",
			},
		});
	}, [token]);

	const fetchPosts = async (page = 1, limit = 10): Promise<ForumPostType[]> => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await api.get("/posts", {
				params: { page, limit },
			});
			return response.data.posts;
		} catch (err) {
			setError("Failed to fetch posts");
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	const fetchUserPosts = async (userId: string): Promise<ForumPostType[]> => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await api.get(`/posts/user/${userId}`);
			return response.data.posts;
		} catch (err) {
			setError("Failed to fetch user posts");
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	const fetchSavedPosts = async (): Promise<ForumPostType[]> => {
		setIsLoading(true);
		setError(null);

		try {
			// Use api instance instead of axios directly
			const response = await api.get("/posts/saved");
			return response.data.posts;
		} catch (err) {
			setError("Failed to fetch saved posts");
			throw err;
		} finally {
			setIsLoading(false);
		}
	};
	const fetchPostById = async (postId: string): Promise<ForumPostType> => {
		setIsLoading(true);
		setError(null);

		try {
			// Use api instance instead of axios directly
			const response = await api.get(`/posts/${postId}`);
			return response.data.post;
		} catch (err) {
			setError("Failed to fetch post");
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	const createPost = async (
		title: string,
		content: string,
		tags?: string[]
	): Promise<ForumPostType> => {
		setIsLoading(true);
		setError(null);

		try {
			// Use the api instance instead of axios directly
			const response = await api.post("/posts", {
				title,
				content,
				tags,
			});
			return response.data.post;
		} catch (err) {
			setError("Failed to create post");
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	const updatePost = async (
		postId: string,
		data: { title?: string; content?: string; tags?: string[] }
	): Promise<ForumPostType> => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await api.put(`/posts/${postId}`, data);
			return response.data.post;
		} catch (err) {
			setError("Failed to update post");
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	const deletePost = async (postId: string): Promise<void> => {
		setIsLoading(true);
		setError(null);

		try {
			await api.delete(`/posts/${postId}`);
		} catch (err) {
			setError("Failed to delete post");
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	const likePost = async (postId: string): Promise<void> => {
		setError(null);

		try {
			await api.post(`/posts/${postId}/like`);
		} catch (err) {
			setError("Failed to like post");
			throw err;
		}
	};

	const savePost = async (postId: string): Promise<void> => {
		setError(null);

		try {
			await api.post(`/posts/${postId}/save`);
		} catch (err) {
			setError("Failed to save post");
			throw err;
		}
	};

	const addComment = async (postId: string, content: string): Promise<void> => {
		setError(null);

		try {
			await api.post(`/posts/${postId}/comments`, { content });
		} catch (err) {
			setError("Failed to add comment");
			throw err;
		}
	};

	const addReply = async (
		postId: string,
		commentId: string,
		content: string
	): Promise<void> => {
		setError(null);

		try {
			await api.post(`/posts/${postId}/comments/${commentId}/replies`, {
				content,
			});
		} catch (err) {
			setError("Failed to add reply");
			throw err;
		}
	};

	const searchPosts = async (query: string): Promise<ForumPostType[]> => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await api.get("/search", {
				params: { q: query },
			});
			return response.data.posts;
		} catch (err) {
			setError("Failed to search posts");
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	return {
		isLoading,
		error,
		fetchPosts,
		fetchUserPosts,
		fetchSavedPosts,
		fetchPostById,
		createPost,
		updatePost,
		deletePost,
		likePost,
		savePost,
		addComment,
		addReply,
		searchPosts,
	};
}
