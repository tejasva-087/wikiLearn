import type React from "react";
import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "../../../../components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../../../../components/ui/alert";

interface ForumEditorProps {
	initialTitle?: string;
	initialContent?: string;
	onSubmit: (data: { title: string; content: string }) => Promise<void>;
	onCancel?: () => void;
	isEditing?: boolean;
}

export function ForumEditor({
	initialTitle = "",
	initialContent = "",
	onSubmit,
	onCancel,
	isEditing = false,
}: ForumEditorProps) {
	const [title, setTitle] = useState(initialTitle);
	const [content, setContent] = useState(initialContent);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!title.trim()) {
			setError("Title is required");
			return;
		}

		if (!content.trim()) {
			setError("Content is required");
			return;
		}

		setIsSubmitting(true);
		setError(null);

		try {
			await onSubmit({ title, content });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to submit post");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Card className="w-full">
			<form onSubmit={handleSubmit}>
				<CardHeader className="pb-3">
					<Input
						placeholder="Post title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="text-lg font-semibold"
					/>
				</CardHeader>
				<CardContent>
					{error && (
						<Alert variant="destructive" className="mb-4">
							<AlertCircle className="h-4 w-4" />
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}
					<Textarea
						placeholder="Write your post content here..."
						value={content}
						onChange={(e) => setContent(e.target.value)}
						className="min-h-[200px] resize-y"
					/>
				</CardContent>
				<CardFooter className="flex justify-between">
					{onCancel && (
						<Button variant="outline" onClick={onCancel} type="button">
							Cancel
						</Button>
					)}
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting
							? "Submitting..."
							: isEditing
							? "Update Post"
							: "Create Post"}
					</Button>
				</CardFooter>
			</form>
		</Card>
	);
}
