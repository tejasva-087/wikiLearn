import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Textarea } from "../../../../components/ui/textarea";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "../../../../components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import type { CommentType } from "../../types";
import { useForumApi } from "../../hooks/useForumApi";

interface CommentSectionProps {
	postId: string;
	comments: CommentType[];
	currentUserId: string;
}

export function CommentSection({ postId, comments }: CommentSectionProps) {
	const [newComment, setNewComment] = useState("");
	const [replyingTo, setReplyingTo] = useState<string | null>(null);
	const [replyContent, setReplyContent] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { addComment, addReply } = useForumApi();

	const handleSubmitComment = async () => {
		if (!newComment.trim()) {
			return;
		}

		setIsSubmitting(true);
		try {
			await addComment(postId, newComment);
			setNewComment("");
		} catch (error) {
			console.error("Failed to add comment:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleSubmitReply = async (commentId: string) => {
		if (!replyContent.trim()) {
			return;
		}

		setIsSubmitting(true);
		try {
			await addReply(postId, commentId, replyContent);
			setReplyContent("");
			setReplyingTo(null);
		} catch (error) {
			console.error("Failed to add reply:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="p-4">
			<div className="mb-4">
				<div className="flex gap-2">
					<Avatar className="h-8 w-8">
						<AvatarFallback>U</AvatarFallback>
					</Avatar>
					<div className="flex-1">
						<Textarea
							placeholder="Write a comment..."
							value={newComment}
							onChange={(e) => setNewComment(e.target.value)}
							className="mb-2 resize-none"
						/>
						<Button
							onClick={handleSubmitComment}
							disabled={isSubmitting || !newComment.trim()}
							size="sm"
						>
							{isSubmitting ? "Posting..." : "Post Comment"}
						</Button>
					</div>
				</div>
			</div>

			<div className="space-y-4">
				{comments.map((comment) => (
					<div key={comment._id} className="border-l-2 pl-4 py-2">
						<div className="flex items-start gap-2">
							<Avatar className="h-6 w-6">
								<AvatarImage
									src={comment.authorAvatar}
									alt={comment.authorName}
								/>
								<AvatarFallback>{comment.authorName.charAt(0)}</AvatarFallback>
							</Avatar>
							<div className="flex-1">
								<div className="flex items-center gap-2">
									<span className="font-medium text-sm">
										{comment.authorName}
									</span>
									<span className="text-xs text-muted-foreground">
										{formatDistanceToNow(new Date(comment.createdAt), {
											addSuffix: true,
										})}
									</span>
								</div>
								<p className="text-sm mt-1">{comment.content}</p>
								<Button
									variant="link"
									size="sm"
									className="p-0 h-auto text-xs"
									onClick={() =>
										setReplyingTo(
											replyingTo === comment._id ? null : comment._id
										)
									}
								>
									Reply
								</Button>

								{replyingTo === comment._id && (
									<div className="mt-2">
										<Textarea
											placeholder="Write a reply..."
											value={replyContent}
											onChange={(e) => setReplyContent(e.target.value)}
											className="mb-2 resize-none text-sm"
										/>
										<div className="flex gap-2">
											<Button
												size="sm"
												onClick={() => handleSubmitReply(comment._id)}
												disabled={isSubmitting || !replyContent.trim()}
											>
												{isSubmitting ? "Posting..." : "Post Reply"}
											</Button>
											<Button
												variant="outline"
												size="sm"
												onClick={() => {
													setReplyingTo(null);
													setReplyContent("");
												}}
											>
												Cancel
											</Button>
										</div>
									</div>
								)}

								{comment.replies && comment.replies.length > 0 && (
									<div className="mt-2 space-y-3">
										{comment.replies.map((reply) => (
											<div key={reply._id} className="border-l-2 pl-3 py-1">
												<div className="flex items-start gap-2">
													<Avatar className="h-5 w-5">
														<AvatarImage
															src={reply.authorAvatar}
															alt={reply.authorName}
														/>
														<AvatarFallback>
															{reply.authorName.charAt(0)}
														</AvatarFallback>
													</Avatar>
													<div>
														<div className="flex items-center gap-2">
															<span className="font-medium text-xs">
																{reply.authorName}
															</span>
															<span className="text-xs text-muted-foreground">
																{formatDistanceToNow(
																	new Date(reply.createdAt),
																	{ addSuffix: true }
																)}
															</span>
														</div>
														<p className="text-xs mt-1">{reply.content}</p>
													</div>
												</div>
											</div>
										))}
									</div>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
