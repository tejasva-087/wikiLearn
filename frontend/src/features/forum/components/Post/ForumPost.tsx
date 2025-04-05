import { useState } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "../../../../components/ui/avatar";
import { Separator } from "../../../../components/ui/separator";
import {
	ThumbsUp,
	MessageSquare,
	Bookmark,
	Share2,
	MoreHorizontal,
	Edit,
	Trash2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { ForumEditor } from "../Editor/ForumEditor";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../../../../components/ui/alert-dialog";
import { CommentSection } from "../Comments/CommentSection";
import type { ForumPostType } from "../../types";

interface ForumPostProps {
	post: ForumPostType;
	currentUserId: string;
	onLike: (postId: string) => Promise<void>;
	onSave: (postId: string) => Promise<void>;
	onEdit: (
		postId: string,
		data: { title: string; content: string }
	) => Promise<void>;
	onDelete: (postId: string) => Promise<void>;
	onShare?: (postId: string) => void;
}

export function ForumPost({
	post,
	currentUserId,
	onLike,
	onSave,
	onEdit,
	onDelete,
	onShare,
}: ForumPostProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [showComments, setShowComments] = useState(false);
	const isAuthor = post.authorId === currentUserId;

	const handleLike = async () => {
		try {
			await onLike(post._id);
		} catch (error) {
			console.error("Failed to like post:", error);
		}
	};

	const handleSave = async () => {
		try {
			await onSave(post._id);
		} catch (error) {
			console.error("Failed to save post:", error);
		}
	};

	const handleEdit = async (data: { title: string; content: string }) => {
		try {
			await onEdit(post._id, data);
			setIsEditing(false);
		} catch (error) {
			console.error("Failed to edit post:", error);
			throw error;
		}
	};

	const handleDelete = async () => {
		try {
			await onDelete(post._id);
		} catch (error) {
			console.error("Failed to delete post:", error);
		}
	};

	const handleShare = () => {
		if (onShare) {
			onShare(post._id);
		} else {
			// Default share behavior
			navigator.clipboard.writeText(
				`${window.location.origin}/forum/post/${post._id}`
			);
		}
	};

	const toggleComments = () => {
		setShowComments(!showComments);
	};

	if (isEditing) {
		return (
			<ForumEditor
				initialTitle={post.title}
				initialContent={post.content}
				onSubmit={handleEdit}
				onCancel={() => setIsEditing(false)}
				isEditing={true}
			/>
		);
	}

	return (
		<Card className="mb-4">
			<CardHeader className="pb-2">
				<div className="flex justify-between items-start">
					<div className="flex items-center gap-2">
						<Avatar>
							<AvatarImage src={post.authorAvatar} alt={post.authorName} />
							<AvatarFallback>{post.authorName.charAt(0)}</AvatarFallback>
						</Avatar>
						<div>
							<p className="font-medium">{post.authorName}</p>
							<p className="text-xs text-muted-foreground">
								{formatDistanceToNow(new Date(post.createdAt), {
									addSuffix: true,
								})}
							</p>
						</div>
					</div>

					{isAuthor && (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon">
									<MoreHorizontal className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem onClick={() => setIsEditing(true)}>
									<Edit className="h-4 w-4 mr-2" />
									Edit
								</DropdownMenuItem>
								<AlertDialog>
									<AlertDialogTrigger asChild>
										<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
											<Trash2 className="h-4 w-4 mr-2" />
											Delete
										</DropdownMenuItem>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>Are you sure?</AlertDialogTitle>
											<AlertDialogDescription>
												This action cannot be undone. This will permanently
												delete your post.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>Cancel</AlertDialogCancel>
											<AlertDialogAction onClick={handleDelete}>
												Delete
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</DropdownMenuContent>
						</DropdownMenu>
					)}
				</div>
				<CardTitle className="mt-2">{post.title}</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="whitespace-pre-line">{post.content}</p>
			</CardContent>
			<CardFooter className="flex justify-between pt-2">
				<div className="flex gap-4">
					<Button
						variant="ghost"
						size="sm"
						onClick={handleLike}
						className={post.isLiked ? "text-blue-500" : ""}
					>
						<ThumbsUp className="h-4 w-4 mr-1" />
						{post.likes > 0 && <span>{post.likes}</span>}
					</Button>
					<Button variant="ghost" size="sm" onClick={toggleComments}>
						<MessageSquare className="h-4 w-4 mr-1" />
						{post.comments.length > 0 && <span>{post.comments.length}</span>}
					</Button>
				</div>
				<div className="flex gap-2">
					<Button
						variant="ghost"
						size="sm"
						onClick={handleSave}
						className={post.isSaved ? "text-yellow-500" : ""}
					>
						<Bookmark className="h-4 w-4" />
					</Button>
					<Button variant="ghost" size="sm" onClick={handleShare}>
						<Share2 className="h-4 w-4" />
					</Button>
				</div>
			</CardFooter>

			{showComments && (
				<>
					<Separator />
					<CommentSection
						postId={post._id}
						comments={post.comments}
						currentUserId={currentUserId}
					/>
				</>
			)}
		</Card>
	);
}
