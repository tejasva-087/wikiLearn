import { useState, memo } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";

interface Reply {
  id: number;
  author: string;
  timestamp: string;
  content: string;
}

interface Comment {
  id: number;
  author: string;
  timestamp: string;
  content: string;
  replies: Reply[];
}

export interface Post {
  id: number;
  author: string;
  timestamp: string;
  time: string;
  title: string;
  content: string;
  likes: number;
  saved: boolean;
  comments: Comment[];
}

// Component for a single comment
interface CommentProps {
  comment: Comment;
  isReply?: boolean;
}

export const CommentComponent = memo(function Comment({
  comment,
  isReply = false,
}: CommentProps) {
  const [showReplyInput, setShowReplyInput] = useState(false);

  return (
    <div className="flex flex-col mb-4">
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src="/placeholder.svg" alt={comment.author} />
          <AvatarFallback>{comment.author[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">{comment.author}</span>
            <span className="text-xs text-gray-500">•</span>
            <span className="text-xs text-gray-500">{comment.timestamp}</span>
          </div>
          <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
          {!isReply && (
            <button
              className="text-xs text-gray-500 hover:text-gray-700 mt-1 self-start"
              onClick={() => setShowReplyInput(!showReplyInput)}
            >
              reply
            </button>
          )}

          {showReplyInput && (
            <div className="flex items-center gap-2 mt-2">
              <Avatar className="h-7 w-7 flex-shrink-0">
                <AvatarImage src="/placeholder.svg" alt="You" />
                <AvatarFallback>Y</AvatarFallback>
              </Avatar>
              <Input
                className="bg-white border-gray-300 text-sm h-8"
                placeholder="Write a reply..."
              />
            </div>
          )}
        </div>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-11 mt-3 border-l-2 border-gray-200 pl-4">
          {comment.replies.map((reply) => (
            <CommentComponent
              key={reply.id}
              comment={reply as Comment}
              isReply={true}
            />
          ))}
        </div>
      )}
    </div>
  );
});

// Component for a single post
interface PostProps {
  post: Post;
}

export const PostComponent = memo(function Post({ post }: PostProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showAllContent, setShowAllContent] = useState(false);

  const toggleLike = () => setLiked(!liked);
  const toggleSave = () => setSaved(!saved);
  const toggleComments = () => setShowComments(!showComments);

  return (
    <div className="bg-white rounded-lg p-5 mb-4 shadow-sm border border-gray-200">
      {/* Post header */}
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder.svg" alt={post.author} />
          <AvatarFallback>{post.author[0]}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium text-gray-900">{post.author}</div>
          <div className="text-xs text-gray-500">
            {post.timestamp} • {post.time}
          </div>
        </div>
      </div>

      {/* Post title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>

      {/* Post content */}
      <div className="text-gray-700 mb-4">
        {showAllContent ? post.content : `${post.content.substring(0, 150)}...`}
        <button
          className="text-blue-600 hover:text-blue-800 ml-1 text-sm"
          onClick={() => setShowAllContent(!showAllContent)}
        >
          {showAllContent ? "show less" : "read more"}
        </button>
      </div>

      {/* Post actions */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center gap-1 ${
            liked ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={toggleLike}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d={
                liked
                  ? "M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12Z"
                  : "M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM220,97l-12,96a8,8,0,0,1-8,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V72a8,8,0,0,0,8,8h64a8,8,0,0,1,8,8,8.1,8.1,0,0,1-.35,2.34Z"
              }
            />
          </svg>
          <span>Liked</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center gap-1 ${
            saved ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={toggleSave}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d={
                saved
                  ? "M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Z"
                  : "M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32ZM72,48H184a0,0,0,0,1,0,0v153.57l-51.77-32.35a8,8,0,0,0-8.48,0L72,201.57Z"
              }
            />
          </svg>
          <span>Saved</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 text-gray-500"
          onClick={toggleComments}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M216,48H40A16,16,0,0,0,24,64V224a8,8,0,0,0,13.38,5.88L80,193.37V208a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48ZM40,64H216V208H96V184a8,8,0,0,0-13.38-5.88L40,213.37Z"
            />
          </svg>
          <span>Comments</span>
        </Button>
      </div>

      {/* Post comments */}
      {showComments && post.comments.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          {post.comments.map((comment) => (
            <CommentComponent key={comment.id} comment={comment} />
          ))}

          {post.comments.length > 3 && (
            <button className="text-sm text-gray-500 hover:text-gray-700 mt-2">
              show more
            </button>
          )}
        </div>
      )}

      {/* Comment input */}
      {showComments && (
        <div className="mt-4 flex items-center gap-3">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src="/placeholder.svg" alt="You" />
            <AvatarFallback>Y</AvatarFallback>
          </Avatar>
          <Input
            className="bg-white border-gray-300 text-sm"
            placeholder="Write a comment..."
          />
        </div>
      )}
    </div>
  );
});
