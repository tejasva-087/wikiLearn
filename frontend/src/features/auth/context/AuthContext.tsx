import {
	createContext,
	useContext,
	useState,
	useEffect,
	type ReactNode,
} from "react";
import { authService, type AuthResponse } from "../api/auth.api";

interface User {
	id: string;
	email: string;
	name: string;
	surname: string;
}

interface AuthContextType {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
	login: (email: string, password: string) => Promise<void>;
	signup: (
		name: string,
		surname: string,
		email: string,
		password: string
	) => Promise<void>;
	logout: () => void;
	googleAuth: () => void;
	forgotPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		// Check if user is already logged in
		const storedToken = localStorage.getItem("token");
		const storedUser = localStorage.getItem("user");

		if (storedToken && storedUser) {
			setToken(storedToken);
			setUser(JSON.parse(storedUser));
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
	};

	const login = async (email: string, password: string) => {
		try {
			setIsLoading(true);
			const response = await authService.login({ email, password });
			handleAuthResponse(response);
			// biome-ignore lint/suspicious/noExplicitAny:
		} catch (err: any) {
			setError(err.response?.data?.message || "Failed to login");
			throw err;
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
			const response = await authService.signup({
				name,
				surname,
				email,
				password,
			});
			handleAuthResponse(response);
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
	};

	const googleAuth = () => {
		authService.googleAuth();
	};

	const forgotPassword = async (email: string) => {
		try {
			setIsLoading(true);
			await authService.forgotPassword(email);
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

	return (
		<AuthContext.Provider
			value={{
				user,
				token,
				isAuthenticated: !!token,
				isLoading,
				error,
				login,
				signup,
				logout,
				googleAuth,
				forgotPassword,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
