import { motion } from "framer-motion";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function ForgotPasswordPage() {
	const { forgotPassword, error } = useAuth();
	const [email, setEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formError, setFormError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setFormError(null);
		setSuccess(false);

		try {
			await forgotPassword(email);
			setSuccess(true);
			// biome-ignore lint/suspicious/noExplicitAny:
		} catch (err: any) {
			setFormError(err.response?.data?.message || "Failed to process request");
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
							Forgot Password
						</h2>
						<p className="mb-8 text-gray-400">
							Enter your email address and we'll send you a link to reset your
							password.
						</p>

						{success ? (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="p-4 bg-green-900/30 border border-green-800 rounded-lg text-green-200 mb-6"
							>
								<p>Password reset link has been sent to your email address.</p>
								<p className="mt-2 text-sm">
									Please check your inbox and follow the instructions.
								</p>
							</motion.div>
						) : (
							<>
								{(formError || error) && (
									<div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-200 text-sm">
										{formError || error}
									</div>
								)}

								<form className="space-y-6" onSubmit={handleSubmit}>
									<div className="space-y-2">
										<motion.div whileFocus={{ scale: 1.01 }}>
											<Input
												className="border-[#333] bg-transparent py-5 text-white transition-all duration-200 placeholder:text-neutral-600 focus:border-[#555]"
												placeholder="Enter your email address"
												type="email"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												required
											/>
										</motion.div>
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
											{isSubmitting ? "Sending..." : "Send Reset Link"}
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
