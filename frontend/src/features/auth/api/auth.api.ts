import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Create axios instance with proper base URL
const authApi = axios.create({
	baseURL: API_URL,
	withCredentials: true,
});

// Add request/response interceptors for debugging
authApi.interceptors.request.use(
	(config) => {
		console.log(`Making request to: ${config.baseURL}${config.url}`);
		return config;
	},
	(error) => {
		console.error("Request error:", error);
		return Promise.reject(error);
	}
);

authApi.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error("Response error:", error.response || error.message);
		return Promise.reject(error);
	}
);

export interface SignupData {
	name: string;
	surname: string;
	email: string;
	password: string;
}

export interface LoginData {
	email: string;
	password: string;
}

export interface AuthResponse {
	token: string;
	user: {
		id: string;
		email: string;
		name: string;
		surname: string;
	};
}

export const authService = {
	signup: async (data: SignupData): Promise<AuthResponse> => {
		const response = await authApi.post("/auth/signup", data);
		return response.data;
	},

	login: async (data: LoginData): Promise<AuthResponse> => {
		const response = await authApi.post("/auth/signin", data);
		return response.data;
	},

	forgotPassword: async (email: string): Promise<{ message: string }> => {
		const response = await authApi.post("/users/forgotpassword", { email });
		return response.data;
	},

	resetPassword: async (
		token: string,
		password: string
	): Promise<{ message: string }> => {
		const response = await authApi.patch(`/users/resetpassword/${token}`, {
			password,
		});
		return response.data;
	},

	googleAuth: () => {
		window.location.href = `${API_URL}/auth/google`;
	},
};
