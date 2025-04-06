import { useState, useEffect, useRef, useCallback } from "react";
import { useForum } from "../../context/ForumContext";
import { useAuth } from "../../../auth/context/AuthContext";
import { Spinner } from "../../../../components/ui/spinner";
import { Alert, AlertDescription } from "../../../../components/ui/alert";
import { AlertCircle } from "lucide-react";
import { ForumPost } from "../Post/ForumPost";

interface ForumListProps {
	initialPosts?: boolean;
}

export function ForumList({ initialPosts = true }: ForumListProps) {
	const {
		posts,
		isLoading,
		error,
		loadPosts,
		toggleLike,
		toggleSave,
		updateExistingPost,
		deleteExistingPost,
	} = useForum();
	const { user } = useAuth();
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const observer = useRef<IntersectionObserver | null>(null);
	const previousPostsLength = useRef(posts.length);

	useEffect(() => {
		if (initialPosts) {
			loadPosts(1);
		}
	}, [initialPosts, loadPosts]);

	const handleEditPost = async (
		postId: string,
		data: { title: string; content: string }
	) => {
		await updateExistingPost(postId, data);
	};

	const handleDeletePost = async (postId: string) => {
		await deleteExistingPost(postId);
	};

	// Last element ref for infinite scrolling
	const lastPostElementRef = useCallback(
		(node: HTMLDivElement | null) => {
			if (isLoading) {
				return;
			}

			if (observer.current) {
				observer.current.disconnect();
			}

			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPage((prevPage) => prevPage + 1);
				}
			});

			if (node) {
				observer.current.observe(node);
			}
		},
		[isLoading, hasMore]
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies:
	useEffect(() => {
		if (page > 1) {
			const fetchMorePosts = async () => {
				try {
					const currentLength = previousPostsLength.current;
					await loadPosts(page);
					if (posts.length === currentLength) {
						setHasMore(false);
					} else {
						previousPostsLength.current = posts.length;
					}
				} catch (error) {
					console.error("Failed to load more posts:", error);
				}
			};

			fetchMorePosts();
		}
	}, [page, loadPosts]);

	if (error) {
		return (
			<Alert variant="destructive">
				<AlertCircle className="h-4 w-4" />
				<AlertDescription>{error}</AlertDescription>
			</Alert>
		);
	}

	return (
		<div className="space-y-4">
			{posts.map((post, index) => {
				if (posts.length === index + 1) {
					return (
						<div ref={lastPostElementRef} key={post._id}>
							<ForumPost
								post={post}
								currentUserId={user?.id || ""}
								onLike={toggleLike}
								onSave={toggleSave}
								onEdit={handleEditPost}
								onDelete={handleDeletePost}
							/>
						</div>
					);
				}
				return (
					<ForumPost
						key={post._id}
						post={post}
						currentUserId={user?.id || ""}
						onLike={toggleLike}
						onSave={toggleSave}
						onEdit={handleEditPost}
						onDelete={handleDeletePost}
					/>
				);
			})}

			{isLoading && (
				<div className="flex justify-center py-4">
					<Spinner />
				</div>
			)}

			{!isLoading && posts.length === 0 && (
				<div className="text-center py-8">
					<p className="text-muted-foreground">No posts found</p>
				</div>
			)}

			{!hasMore && posts.length > 0 && (
				<div className="text-center py-4">
					<p className="text-muted-foreground">You've reached the end</p>
				</div>
			)}
		</div>
	);
}
