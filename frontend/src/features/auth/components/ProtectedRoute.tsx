import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
	children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
	const { isAuthenticated, isLoading } = useAuth();
	console.log("ProtectedRoute - Auth State:", { isAuthenticated, isLoading });

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-black">
				<div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent" />
			</div>
		);
	}

	if (!isAuthenticated) {
		console.log("ProtectedRoute - Redirecting to login page");
		return <Navigate to="/login" replace />;
	}

	return <>{children}</>;
}
