import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Button } from "../components/ui/button";
import { ScrollArea } from "../components/ui/scroll-area";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../components/ui/tabs";
import { ForumProvider } from "../features/forum/context/ForumContext";
import { ForumList } from "../features/forum/components/ForumList/ForumList";
import { ForumSearch } from "../features/forum/components/ForumSearch/ForumSearch";
import { ForumEditor } from "../features/forum/components/Editor/ForumEditor";
import { useForum } from "../features/forum/context/ForumContext";
import type { ForumPostType } from "../features/forum/types";
import { Plus } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../components/ui/dialog";
import { ForumPost } from "../features/forum/components/Post/ForumPost";
import { useAuth } from "../features/auth/context/AuthContext";
import { useNavigate } from "react-router-dom";

function ForumPageContent() {
	const { user } = useAuth();
	const [isCreatingPost, setIsCreatingPost] = useState(false);
	const [searchResults, setSearchResults] = useState<ForumPostType[]>([]);
	const [isSearching, setIsSearching] = useState(false);
	const {
		createNewPost,
		loadUserPosts,
		loadSavedPosts,
		userPosts,
		savedPosts,
		toggleLike,
		toggleSave,
		updateExistingPost,
		deleteExistingPost,
	} = useForum();

	const handleCreatePost = async (data: {
		title: string;
		content: string;
	}): Promise<void> => {
		try {
			await createNewPost(data.title, data.content);
			setIsCreatingPost(false);
		} catch (error) {
			console.error("Failed to create post:", error);
			throw error;
		}
	};

	const handleEditPost = async (
		postId: string,
		data: { title: string; content: string }
	): Promise<void> => {
		try {
			await updateExistingPost(postId, data);
		} catch (error) {
			console.error("Failed to edit post:", error);
			throw error;
		}
	};

	const handleDeletePost = async (postId: string): Promise<void> => {
		try {
			await deleteExistingPost(postId);
		} catch (error) {
			console.error("Failed to delete post:", error);
			throw error;
		}
	};

	const handleSearchResults = (results: ForumPostType[]) => {
		setSearchResults(results);
		setIsSearching(results.length > 0);
	};

	return (
		<div className="bg-white text-gray-800 min-h-screen">
			<div className="flex">
				<Sidebar />

				<div className="flex-1 px-4 py-6">
					<div className="flex items-center justify-between mb-6">
						<ForumSearch onSearchResults={handleSearchResults} />

						<Dialog open={isCreatingPost} onOpenChange={setIsCreatingPost}>
							<DialogTrigger asChild>
								<Button className="bg-blue-600 hover:bg-blue-700">
									<Plus className="h-4 w-4 mr-2" />
									New Post
								</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[600px]">
								<DialogHeader>
									<DialogTitle>Create a new post</DialogTitle>
								</DialogHeader>
								<ForumEditor
									onSubmit={handleCreatePost}
									onCancel={() => setIsCreatingPost(false)}
								/>
							</DialogContent>
						</Dialog>
					</div>

					<Tabs defaultValue="all" className="w-full">
						<TabsList className="mb-4">
							<TabsTrigger value="all">All Posts</TabsTrigger>
							<TabsTrigger value="my-posts" onClick={() => loadUserPosts()}>
								My Posts
							</TabsTrigger>
							<TabsTrigger value="saved" onClick={() => loadSavedPosts()}>
								Saved
							</TabsTrigger>
						</TabsList>

						<ScrollArea className="h-[calc(100vh-200px)]">
							{isSearching ? (
								<div className="space-y-4">
									<h3 className="text-lg font-medium">Search Results</h3>
									{searchResults.map((post) => (
										<ForumPost
											key={post._id}
											post={post}
											currentUserId={user?.id || ""}
											onLike={toggleLike}
											onSave={toggleSave}
											onEdit={handleEditPost}
											onDelete={handleDeletePost}
										/>
									))}
								</div>
							) : (
								<>
									<TabsContent value="all" className="mt-0">
										<ForumList />
									</TabsContent>

									<TabsContent value="my-posts" className="mt-0">
										<div className="space-y-4">
											{userPosts.map((post) => (
												<ForumPost
													key={post._id}
													post={post}
													currentUserId={user?.id || ""}
													onLike={toggleLike}
													onSave={toggleSave}
													onEdit={handleEditPost}
													onDelete={handleDeletePost}
												/>
											))}

											{userPosts.length === 0 && (
												<div className="text-center py-8">
													<p className="text-muted-foreground">
														You haven't created any posts yet
													</p>
													<Button
														className="mt-4"
														onClick={() => setIsCreatingPost(true)}
													>
														Create your first post
													</Button>
												</div>
											)}
										</div>
									</TabsContent>

									<TabsContent value="saved" className="mt-0">
										<div className="space-y-4">
											{savedPosts.map((post) => (
												<ForumPost
													key={post._id}
													post={post}
													currentUserId={user?.id || ""}
													onLike={toggleLike}
													onSave={toggleSave}
													onEdit={handleEditPost}
													onDelete={handleDeletePost}
												/>
											))}

											{savedPosts.length === 0 && (
												<div className="text-center py-8">
													<p className="text-muted-foreground">
														You haven't saved any posts yet
													</p>
												</div>
											)}
										</div>
									</TabsContent>
								</>
							)}
						</ScrollArea>
					</Tabs>
				</div>
			</div>
		</div>
	);
}

function ForumPage() {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/login", { state: { from: "/forum" } });
		}
	}, [isAuthenticated, navigate]);

	return (
		<ForumProvider>
			<ForumPageContent />
		</ForumProvider>
	);
}

export default ForumPage;
