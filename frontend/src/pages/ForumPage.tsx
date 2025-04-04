import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
// biome-ignore lint/style/useImportType: <explanation>
import { PostComponent, Post } from "../components/Post";
import {
	PopularPostsComponent,
	type PopularPost,
} from "../components/PopularPost";
import { ScrollArea } from "../components/ui/scroll-area";

// Mock data for posts
const MOCK_POSTS: Post[] = [
	{
		id: 1,
		author: "Tejasva",
		timestamp: "24/11/24",
		time: "11:44 PM",
		title:
			"Lorem ipsum in hendrerit tellus adipiscing faucibus accumsan at in sit non.",
		content:
			"Lorem ipsum massa quis accumsan non cras massa vel feugiat et amet pharetra duis sit cursus dignissim facilisis massa vel bibendum aenean sed amet aliquam faucibus id sagittis nibh volutpat viverra faucibus lectus enim euismod imperdiet at diam pellentesque sagittis.",
		likes: 3,
		saved: false,
		comments: [
			{
				id: 1,
				author: "randomuser",
				timestamp: "58 minutes ago",
				content:
					"Lorem ipsum massa quis accumsan non cras massa vel feugiat et amet pharetra duis sit",
				replies: [
					{
						id: 1,
						author: "randomuser",
						timestamp: "34 minutes ago",
						content:
							"Lorem ipsum massa quis accumsan non cras massa vel feugiat et amet pharetra duis sit",
					},
					{
						id: 2,
						author: "randomuser",
						timestamp: "34 minutes ago",
						content:
							"Lorem ipsum massa quis accumsan non cras massa vel feugiat et amet pharetra duis sit",
					},
				],
			},
			{
				id: 2,
				author: "randomuser",
				timestamp: "58 minutes ago",
				content:
					"Lorem ipsum massa quis accumsan non cras massa vel feugiat et amet pharetra duis sit",
				replies: [],
			},
			{
				id: 3,
				author: "randomuser",
				timestamp: "58 minutes ago",
				content:
					"Lorem ipsum massa quis accumsan non cras massa vel feugiat et amet pharetra duis sit",
				replies: [],
			},
		],
	},
	{
		id: 2,
		author: "Tejasva",
		timestamp: "24/11/24",
		time: "11:44 PM",
		title:
			"Lorem ipsum in hendrerit tellus adipiscing faucibus accumsan at in sit non.",
		content:
			"Lorem ipsum massa quis accumsan non cras massa vel feugiat et amet pharetra duis sit cursus dignissim facilisis massa vel bibendum aenean sed amet aliquam faucibus id sagittis nibh volutpat viverra faucibus lectus enim euismod imperdiet at diam pellentesque sagittis.",
		likes: 0,
		saved: false,
		comments: [],
	},
	{
		id: 3,
		author: "Tejasva",
		timestamp: "24/11/24",
		time: "11:44 PM",
		title:
			"Lorem ipsum in hendrerit tellus adipiscing faucibus accumsan at in sit non.",
		content:
			"Lorem ipsum massa quis accumsan non cras massa vel feugiat et amet pharetra duis sit cursus dignissim facilisis massa vel bibendum aenean sed amet aliquam faucibus id sagittis nibh volutpat viverra faucibus lectus enim euismod imperdiet at diam pellentesque sagittis.",
		likes: 0,
		saved: false,
		comments: [],
	},
];

// Popular posts for right sidebar
const YOUR_POSTS: PopularPost[] = [
	{
		id: 1,
		author: "Tejasva",
		title:
			"Lorem ipsum in hendrerit tellus adipiscing faucibus accumsan at in sit non.",
	},
	{
		id: 2,
		author: "Tejasva",
		title:
			"Lorem ipsum in hendrerit tellus adipiscing faucibus accumsan at in sit non.",
	},
	{
		id: 3,
		author: "Tejasva",
		title:
			"Lorem ipsum in hendrerit tellus adipiscing faucibus accumsan at in sit non.",
	},
	{
		id: 4,
		author: "Tejasva",
		title:
			"Lorem ipsum in hendrerit tellus adipiscing faucibus accumsan at in sit non.",
	},
	{
		id: 5,
		author: "Tejasva",
		title:
			"Lorem ipsum in hendrerit tellus adipiscing faucibus accumsan at in sit non.",
	},
	{
		id: 6,
		author: "Tejasva",
		title:
			"Lorem ipsum in hendrerit tellus adipiscing faucibus accumsan at in sit non.",
	},
];

// Saved posts for right sidebar
const SAVED_POSTS: PopularPost[] = [
	{
		id: 1,
		author: "Tejasva",
		title:
			"Lorem ipsum in hendrerit tellus adipiscing faucibus accumsan at in sit non.",
	},
	{
		id: 2,
		author: "Tejasva",
		title:
			"Lorem ipsum in hendrerit tellus adipiscing faucibus accumsan at in sit non.",
	},
	{
		id: 3,
		author: "Tejasva",
		title:
			"Lorem ipsum in hendrerit tellus adipiscing faucibus accumsan at in sit non.",
	},
	{
		id: 4,
		author: "Tejasva",
		title:
			"Lorem ipsum in hendrerit tellus adipiscing faucibus accumsan at in sit non.",
	},
	{
		id: 5,
		author: "Tejasva",
		title:
			"Lorem ipsum in hendrerit tellus adipiscing faucibus accumsan at in sit non.",
	},
	{
		id: 6,
		author: "Tejasva",
		title:
			"Lorem ipsum in hendrerit tellus adipiscing faucibus accumsan at in sit non.",
	},
	{
		id: 7,
		author: "Tejasva",
		title:
			"Lorem ipsum in hendrerit tellus adipiscing faucibus accumsan at in sit non.",
	},
	{
		id: 8,
		author: "Tejasva",
		title:
			"Lorem ipsum in hendrerit tellus adipiscing faucibus accumsan at in sit non.",
	},
];

function ForumPage() {
	useEffect(() => {
		console.log("Forum component rendered");
	}, []);

	return (
		<div className="bg-white text-gray-800 min-h-screen">
			<div className="flex">
				{/* Side Bar */}
				<Sidebar />

				{/* Main content */}
				<div className="flex-1 px-4 py-6">
					<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
						{/* Posts column */}
						<div className="lg:col-span-2">
							{/* Search bar */}
							<div className="flex items-center mb-6 relative">
								<Input
									className="bg-white border-gray-300 text-gray-800 pr-10 rounded-full"
									placeholder="Search for posts"
								/>
								<Button
									size="icon"
									className="absolute right-0 rounded-full bg-blue-600 hover:bg-blue-700 h-8 w-8 flex items-center justify-center"
								>
									{/* biome-ignore lint/a11y/noSvgWithoutTitle:  */}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 256 256"
									>
										<path
											fill="currentColor"
											d="M224 128a8 8 0 0 1-8 8h-80v80a8 8 0 0 1-16 0v-80H40a8 8 0 0 1 0-16h80V40a8 8 0 0 1 16 0v80h80a8 8 0 0 1 8 8Z"
										/>
									</svg>
								</Button>
							</div>

							{/* Posts list */}
							<ScrollArea className="h-[calc(100vh-150px)] pr-2">
								<div className="pr-3">
									{MOCK_POSTS.map((post) => (
										<PostComponent key={post.id} post={post} />
									))}
								</div>
							</ScrollArea>
						</div>

						{/* Right sidebar */}
						<div className="space-y-4">
							<PopularPostsComponent
								posts={YOUR_POSTS}
								title="Your Posts"
								maxHeight="200px"
							/>
							<PopularPostsComponent
								posts={SAVED_POSTS}
								title="Saved Posts"
								maxHeight="300px"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ForumPage;
