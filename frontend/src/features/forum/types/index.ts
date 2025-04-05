export interface ReplyType {
  _id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CommentType {
  _id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  replies: ReplyType[];
}

export interface ForumPostType {
  _id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  title: string;
  content: string;
  likes: number;
  isLiked: boolean;
  isSaved: boolean;
  createdAt: string;
  updatedAt?: string;
  comments: CommentType[];
  tags?: string[];
}

export interface ForumState {
  posts: ForumPostType[];
  userPosts: ForumPostType[];
  savedPosts: ForumPostType[];
  currentPost: ForumPostType | null;
  isLoading: boolean;
  error: string | null;
}