import {
	createContext,
	useContext,
	useState,
	useEffect,
	type ReactNode,
} from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

// Define types
interface User {
	id: string;
	name: string;
	email: string;
	// Add other user properties as needed
}

interface AuthResponse {
	token: string;
	user: User;
}

interface AuthContextType {
	user: User | null;
	token: string | null;
	login: (email: string, password: string) => Promise<boolean>;
	logout: () => void;
	signup: (
		name: string,
		surname: string,
		email: string,
		password: string
	) => Promise<void>;
	googleAuth: () => void;
	forgotPassword: (email: string) => Promise<void>;
	isAuthenticated: boolean;
	error: string | null;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | null>(null);

// Custom hook to use the auth context
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [_isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Set up axios auth header when token changes
	useEffect(() => {
		if (token) {
			axios.defaults.headers.common.Authorization = `Bearer ${token}`;
		} else {
			axios.defaults.headers.common.Authorization = undefined;
		}
	}, [token]);

	useEffect(() => {
		// Use a single token key for consistency
		const storedToken = localStorage.getItem("token");
		const storedUser = localStorage.getItem("user");

		if (storedToken) {
			setToken(storedToken);

			// Only try to parse the user if it exists
			if (storedUser) {
				try {
					setUser(JSON.parse(storedUser));
				} catch (error) {
					console.error("Failed to parse stored user:", error);
					// Clear invalid data
					localStorage.removeItem("user");
				}
			} else {
				// If we have a token but no user, try to fetch user data
				fetchUserData(storedToken);
			}
		}

		setIsLoading(false);
	}, []);

	const fetchUserData = async (authToken: string) => {
		try {
			const response = await axios.get("/auth/me", {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			});
			setUser(response.data);
			localStorage.setItem("user", JSON.stringify(response.data));
		} catch (error) {
			console.error("Failed to fetch user data:", error);
			// If we can't get the user data, the token might be invalid
			logout();
		}
	};

	const handleAuthResponse = (response: AuthResponse) => {
		const { token, user } = response;
		localStorage.setItem("token", token);
		localStorage.setItem("user", JSON.stringify(user));
		setToken(token);
		setUser(user);
		setError(null);
	};

	const login = async (email: string, password: string) => {
		try {
			const response = await axios.post("/auth/signin", {
				email,
				password,
			});
			handleAuthResponse(response.data);
			return true;
		} catch (error) {
			console.error("Login failed:", error);
			return false;
		}
	};

	const signup = async (
		name: string,
		surname: string,
		email: string,
		password: string
	) => {
		try {
			setIsLoading(true);
			const response = await axios.post("/auth/signup", {
				name,
				surname,
				email,
				password,
			});

			handleAuthResponse(response.data);
		} catch (err: any) {
			setError(err.response?.data?.message || "Failed to sign up");
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setToken(null);
		setUser(null);
	};

	const googleAuth = () => {
		window.location.href = "http://localhost:3000/auth/google";
	};

	const forgotPassword = async (email: string) => {
		try {
			setIsLoading(true);
			await axios.post("/users/forgotpassword", { email });
			setError(null);
		} catch (err: any) {
			setError(
				err.response?.data?.message ||
					"Failed to process forgot password request"
			);
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	const value = {
		user,
		token,
		login,
		logout,
		signup,
		googleAuth,
		forgotPassword,
		isAuthenticated: !!token,
		error,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
