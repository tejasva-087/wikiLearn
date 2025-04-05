import {
	createContext,
	useContext,
	useState,
	useEffect,
	type ReactNode,
} from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

interface User {
	id: string;
	name: string;
	email: string;
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

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			try {
				return JSON.parse(storedUser);
			} catch (error) {
				console.error("Failed to parse stored user:", error);
				localStorage.removeItem("user");
				return null;
			}
		}
		return null;
	});

	const [token, setToken] = useState<string | null>(() => {
		return localStorage.getItem("token") || null;
	});

	const [_isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (token) {
			axios.defaults.headers.common.Authorization = `Bearer ${token}`;
		} else {
			axios.defaults.headers.common.Authorization = undefined;
		}
	}, [token]);

	useEffect(() => {
		const queryParams = new URLSearchParams(window.location.search);
		const urlToken = queryParams.get("token");
		const urlUser = queryParams.get("user");

		if (urlToken) {
			localStorage.setItem("token", urlToken);
			setToken(urlToken);

			if (urlUser) {
				try {
					const userData = JSON.parse(decodeURIComponent(urlUser));
					localStorage.setItem("user", JSON.stringify(userData));
					setUser(userData);
				} catch (error) {
					console.error("Failed to parse user data from URL:", error);
				}
			}

			window.history.replaceState({}, document.title, window.location.pathname);
		}

		setIsLoading(false);
	}, []);

	const handleAuthResponse = (response: AuthResponse) => {
		const { token, user } = response;
		localStorage.setItem("token", token);
		localStorage.setItem("user", JSON.stringify(user));

		setToken(token);
		setUser(user);
		setError(null);

		axios.defaults.headers.common.Authorization = `Bearer ${token}`;
	};

	const login = async (email: string, password: string) => {
		try {
			setIsLoading(true);
			const response = await axios.post("/auth/signin", {
				email,
				password,
			});

			handleAuthResponse(response.data);
			return true;
		} catch (error) {
			console.error("Login failed:", error);
			setError("Invalid email or password");
			return false;
		} finally {
			setIsLoading(false);
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
				name: `${name} ${surname}`,
				email,
				password,
			});

			handleAuthResponse(response.data);
			// biome-ignore lint/suspicious/noExplicitAny:
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
		axios.defaults.headers.common.Authorization = undefined;
	};

	const googleAuth = () => {
		window.location.href = "http://localhost:3000/auth/google";
	};

	const forgotPassword = async (email: string) => {
		try {
			setIsLoading(true);
			await axios.post("/users/forgotpassword", { email });
			setError(null);
			// biome-ignore lint/suspicious/noExplicitAny:
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
		isAuthenticated: !!token && !!user,
		error,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
