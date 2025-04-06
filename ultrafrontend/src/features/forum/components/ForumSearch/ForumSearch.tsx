import { useState, useEffect } from "react";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { Search } from "lucide-react";
import { useForum } from "../../context/ForumContext";
import type { ForumPostType } from "../../types";
import { useDebounce } from "../../../../hooks/useDebounce";

interface ForumSearchProps {
	onSearchResults?: (results: ForumPostType[]) => void;
}

export function ForumSearch({ onSearchResults }: ForumSearchProps) {
	const [query, setQuery] = useState("");
	const [isSearching, setIsSearching] = useState(false);
	const debouncedQuery = useDebounce(query, 500);
	const { searchForPosts } = useForum();

	useEffect(() => {
		if (debouncedQuery) {
			const search = async () => {
				setIsSearching(true);
				try {
					const results = await searchForPosts(debouncedQuery);
					if (onSearchResults) {
						onSearchResults(results);
					}
				} catch (error) {
					console.error("Search failed:", error);
				} finally {
					setIsSearching(false);
				}
			};

			search();
		} else if (onSearchResults) {
			// Clear results when query is empty
			onSearchResults([]);
		}
	}, [debouncedQuery, searchForPosts, onSearchResults]);

	return (
		<div className="relative">
			<Input
				placeholder="Search for posts..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className="pr-10"
			/>
			<Button
				size="icon"
				variant="ghost"
				className="absolute right-0 top-0 h-full"
				disabled={isSearching}
			>
				<Search className="h-4 w-4" />
			</Button>
		</div>
	);
}
