import { memo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";

export interface PopularPost {
  id: number;
  author: string;
  title: string;
}

interface PopularPostsProps {
  posts: PopularPost[];
  title?: string;
  maxHeight?: string;
}

export const PopularPostsComponent = memo(function PopularPosts({
  posts,
  title = "Popular Posts",
  maxHeight = "250px",
}: PopularPostsProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <div style={{ height: maxHeight }} className="overflow-hidden">
        <ScrollArea className="h-full w-full">
          <div className="pr-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:mb-0"
              >
                <p className="text-gray-700 text-sm mb-2">{post.title}</p>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg" alt={post.author} />
                    <AvatarFallback>{post.author[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-gray-500">{post.author}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
});
