import { useMemo, useState, useCallback } from "react";
import axios from "axios";
import type { ForumPostType } from "../types";
import { useAuth } from "../../auth/context/AuthContext";

const API_URL =
	import.meta.env.VITE_API_URL || "http://localhost:3000/api/forum";

export function useForumApi() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, _setError] = useState<string | null>(null);
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

	const setAuthToken = useCallback((newToken: string) => {
		axios.defaults.headers.common.Authorization = `Bearer ${newToken}`;
	}, []);

	const fetchPosts = useCallback(
		async (page = 1, limit = 10): Promise<ForumPostType[]> => {
			try {
				setIsLoading(true);
				const response = await api.get(`/posts?page=${page}&limit=${limit}`);
				return response.data;
			} catch (error) {
				console.error("Error fetching posts:", error);
				throw error;
			} finally {
				setIsLoading(false);
			}
		},
		[api]
	);

	const fetchUserPosts = useCallback(
		async (userId: string): Promise<ForumPostType[]> => {
			try {
				setIsLoading(true);
				const response = await api.get(`/posts/user/${userId}`);
				return response.data;
			} catch (error) {
				console.error("Error fetching user posts:", error);
				throw error;
			} finally {
				setIsLoading(false);
			}
		},
		[api]
	);

	const fetchSavedPosts = useCallback(async (): Promise<ForumPostType[]> => {
		try {
			setIsLoading(true);
			const response = await api.get("/posts/saved");
			return response.data;
		} catch (error) {
			console.error("Error fetching saved posts:", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	}, [api]);

	const fetchPostById = useCallback(
		async (postId: string): Promise<ForumPostType> => {
			try {
				setIsLoading(true);
				const response = await api.get(`/posts/${postId}`);
				return response.data;
			} catch (error) {
				console.error(`Error fetching post ${postId}:`, error);
				throw error;
			} finally {
				setIsLoading(false);
			}
		},
		[api]
	);

	const createPost = useCallback(
		async (
			title: string,
			content: string,
			tags?: string[]
		): Promise<ForumPostType> => {
			try {
				setIsLoading(true);
				const response = await api.post("/posts", {
					title,
					content,
					tags,
				});
				return response.data;
			} catch (error) {
				console.error("Error creating post:", error);
				throw error;
			} finally {
				setIsLoading(false);
			}
		},
		[api]
	);

	const updatePost = useCallback(
		async (
			postId: string,
			data: { title?: string; content?: string; tags?: string[] }
		): Promise<ForumPostType> => {
			try {
				setIsLoading(true);
				const response = await api.put(`/posts/${postId}`, data);
				return response.data;
			} catch (error) {
				console.error(`Error updating post ${postId}:`, error);
				throw error;
			} finally {
				setIsLoading(false);
			}
		},
		[api]
	);

	const deletePost = useCallback(
		async (postId: string): Promise<void> => {
			try {
				setIsLoading(true);
				await api.delete(`/posts/${postId}`);
			} catch (error) {
				console.error(`Error deleting post ${postId}:`, error);
				throw error;
			} finally {
				setIsLoading(false);
			}
		},
		[api]
	);

	const likePost = useCallback(
		// biome-ignore lint/suspicious/noExplicitAny:
		async (postId: string): Promise<any> => {
			try {
				const response = await api.post(`/posts/${postId}/like`);
				return response.data;
			} catch (error) {
				console.error(`Error liking post ${postId}:`, error);
				throw error;
			}
		},
		[api]
	);

	const savePost = useCallback(
		async (postId: string): Promise<void> => {
			try {
				await api.post(`/posts/${postId}/save`);
			} catch (error) {
				console.error(`Error saving post ${postId}:`, error);
				throw error;
			}
		},
		[api]
	);

	const addComment = useCallback(
		// biome-ignore lint/suspicious/noExplicitAny:
		async (postId: string, content: string): Promise<any> => {
			try {
				const response = await api.post(`/posts/${postId}/comments`, {
					content,
				});
				return response.data;
			} catch (error) {
				console.error(`Error adding comment to post ${postId}:`, error);
				throw error;
			}
		},
		[api]
	);

	const addReply = useCallback(
		async (
			postId: string,
			commentId: string,
			content: string
			// biome-ignore lint/suspicious/noExplicitAny:
		): Promise<any> => {
			try {
				const response = await api.post(
					`/posts/${postId}/comments/${commentId}/replies`,
					{ content }
				);
				return response.data;
			} catch (error) {
				console.error(`Error adding reply to comment ${commentId}:`, error);
				throw error;
			}
		},
		[api]
	);

	const searchPosts = useCallback(
		async (query: string): Promise<ForumPostType[]> => {
			try {
				setIsLoading(true);
				const response = await api.get(
					`/search?q=${encodeURIComponent(query)}`
				);
				return response.data;
			} catch (error) {
				console.error("Error searching posts:", error);
				throw error;
			} finally {
				setIsLoading(false);
			}
		},
		[api]
	);

	return useMemo(
		() => ({
			setAuthToken,
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
		}),
		[
			setAuthToken,
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
		]
	);
}
