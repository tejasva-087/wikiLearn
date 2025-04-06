import { motion } from "framer-motion";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { authService } from "../api/auth.api";

export default function ResetPasswordPage() {
	const { token } = useParams<{ token: string }>();
	const navigate = useNavigate();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		if (password.length < 8) {
			setError("Password must be at least 8 characters long");
			return;
		}

		setIsSubmitting(true);
		setError(null);

		try {
			if (!token) {
				throw new Error("Reset token is missing");
			}

			await authService.resetPassword(token, password);
			setSuccess(true);

			// Redirect to login after 3 seconds
			setTimeout(() => {
				navigate("/login");
			}, 3000);
			// biome-ignore lint/suspicious/noExplicitAny:
		} catch (err: any) {
			setError(err.response?.data?.message || "Failed to reset password");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="flex min-h-screen bg-black">
			<div className="flex w-full items-center justify-center bg-black p-6">
				<motion.div
					className="w-full max-w-md rounded-[40px] p-12"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<div className="mx-auto max-w-sm">
						<h2 className="mb-2 text-3xl font-bold text-white instrument-serif-regular">
							Reset Password
						</h2>
						<p className="mb-8 text-gray-400">Enter your new password below.</p>

						{success ? (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="p-4 bg-green-900/30 border border-green-800 rounded-lg text-green-200 mb-6"
							>
								<p>Your password has been reset successfully!</p>
								<p className="mt-2 text-sm">Redirecting to login page...</p>
							</motion.div>
						) : (
							<>
								{error && (
									<div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-200 text-sm">
										{error}
									</div>
								)}

								<form className="space-y-6" onSubmit={handleSubmit}>
									<div className="space-y-2">
										<motion.div whileFocus={{ scale: 1.01 }}>
											<Input
												className="border-[#333] bg-transparent py-5 text-white transition-all duration-200 placeholder:text-neutral-600 focus:border-[#555]"
												placeholder="New password"
												type="password"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												required
												minLength={8}
											/>
										</motion.div>
										<div className="flex items-center gap-1 mt-2">
											<div
												className={`flex h-4 w-4 items-center justify-center rounded-full border ${
													password.length >= 8
														? "border-green-500 bg-green-500/20"
														: "border-[#555]"
												}`}
											/>
											<p className="text-sm text-gray-400">
												Must be at least 8 characters.
											</p>
										</div>
									</div>

									<div className="space-y-2">
										<motion.div whileFocus={{ scale: 1.01 }}>
											<Input
												className="border-[#333] bg-transparent py-5 text-white transition-all duration-200 placeholder:text-neutral-600 focus:border-[#555]"
												placeholder="Confirm new password"
												type="password"
												value={confirmPassword}
												onChange={(e) => setConfirmPassword(e.target.value)}
												required
											/>
										</motion.div>
										<div className="flex items-center gap-1 mt-2">
											<div
												className={`flex h-4 w-4 items-center justify-center rounded-full border ${
													confirmPassword && password === confirmPassword
														? "border-green-500 bg-green-500/20"
														: "border-[#555]"
												}`}
											/>
											<p className="text-sm text-gray-400">
												Passwords must match.
											</p>
										</div>
									</div>

									<motion.div
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
									>
										<Button
											className="w-full bg-neutral-700 text-white transition-all duration-200 hover:bg-neutral-600"
											type="submit"
											disabled={isSubmitting}
										>
											{isSubmitting ? "Resetting..." : "Reset Password"}
										</Button>
									</motion.div>
								</form>
							</>
						)}

						<div className="flex items-center justify-center gap-2 pt-8 mt-4 border-t border-[#333]">
							<motion.div
								whileHover={{ scale: 1.05, x: -3 }}
								whileTap={{ scale: 0.95 }}
							>
								<Link
									to="/login"
									className="font-medium text-sm text-white transition-all duration-200 hover:underline"
								>
									← Back to Login
								</Link>
							</motion.div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
