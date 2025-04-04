import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import SignUpPage from "./features/auth/components/sign-up-page";
import LoginPage from "./features/auth/components/sign-in-page";
import ForgotPasswordPage from "./features/auth/components/forgot-password-page";
import ResetPasswordPage from "./features/auth/components/reset-password-page";
import { AuthProvider } from "./features/auth/context/AuthContext";
import Layout from "./Layouts/Layout";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";

function AnimatedRoutes() {
	const location = useLocation();

	return (
		<AnimatePresence mode="wait">
			<Routes location={location} key={location.pathname}>
				<Route path="/signup" element={<SignUpPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/forgot-password" element={<ForgotPasswordPage />} />
				<Route path="/reset-password/:token" element={<ResetPasswordPage />} />

				<Route
					path="/*"
					element={
						<ProtectedRoute>
							<Layout />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</AnimatePresence>
	);
}

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<AnimatedRoutes />
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
