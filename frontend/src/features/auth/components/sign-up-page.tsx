import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function SignUpPage() {
	const { signup, googleAuth, error } = useAuth();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		surname: "",
		email: "",
		password: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formError, setFormError] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setFormError(null);

		try {
			await signup(
				formData.name,
				formData.surname,
				formData.email,
				formData.password
			);
			navigate("/dashboard");
			// biome-ignore lint/suspicious/noExplicitAny:
		} catch (err: any) {
			setFormError(err.response?.data?.message || "Failed to sign up");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="flex min-h-screen bg-black">
			<motion.div
				className="relative hidden w-1/2 p-8 lg:block"
				initial={{ x: -50, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				exit={{ x: -50, opacity: 0 }}
				transition={{ duration: 0.5 }}
			>
				{/* Left side content remains the same */}
				<div className="h-full w-full overflow-hidden rounded-[40px] relative">
					<div
						className="absolute inset-0 bg-cover bg-center rounded-[40px]"
						style={{
							backgroundImage: "url('/auth-bg-signin.jpg')",
							maskImage:
								"linear-gradient(to bottom, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0))",
							WebkitMaskImage:
								"linear-gradient(to bottom, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0))",
						}}
					/>

					<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black rounded-[40px]" />

					<div className="relative flex h-full flex-col items-center justify-end px-8 pb-12 text-center z-10">
						<div className="mb-6">
							<h1 className="text-6xl font-semibold text-gray-100 instrument-serif-regular">
								Wikilearn
							</h1>
						</div>
						<h2 className="mb-4 text-3xl font-bold text-gray-100 instrument-serif-regular-italic">
							Get Started with Us
						</h2>

						<div className="mx-auto w-full max-w-xs scale-90 origin-bottom-left space-y-3">
							<div className="rounded-lg bg-white/30 p-3 backdrop-blur-sm">
								<div className="flex items-center gap-4">
									<span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-800 text-white/40">
										1
									</span>
									<span className="text-md text-white/40">
										Sign up your account
									</span>
								</div>
							</div>
							<div className="rounded-lg bg-white/30 p-3 backdrop-blur-sm">
								<div className="flex items-center gap-4">
									<span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-600 text-white/40">
										2
									</span>
									<span className="text-md text-white/40">
										Get started with wiki learning
									</span>
								</div>
							</div>
							<div className="rounded-lg bg-white/30 p-3 backdrop-blur-sm">
								<div className="flex items-center gap-4">
									<span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-600 text-white/40">
										3
									</span>
									<span className="text-md text-white/40">
										Public forum if you are stuck
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</motion.div>

			<motion.div
				className="flex w-full items-center justify-center bg-black p-6 lg:w-1/2"
				initial={{ x: 50, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				exit={{ x: 50, opacity: 0 }}
				transition={{ duration: 0.5 }}
			>
				<div className="w-full max-w-md rounded-[40px] p-12">
					<div className="mx-auto max-w-sm">
						<h2 className="mb-2 text-3xl font-bold text-white instrument-serif-regular">
							Sign Up Account
						</h2>
						<p className="mb-8 text-gray-400">
							Enter your personal data to create your account.
						</p>

						<div className="mb-8 grid gap-4">
							<motion.div
								whileHover={{ scale: 1.01 }}
								whileTap={{ scale: 0.98 }}
							>
								<Button
									variant="outline"
									className="relative w-full justify-center border-[#333] bg-transparent py-5 text-white transition-colors duration-200 hover:bg-[#222] hover:text-white h-12"
									onClick={googleAuth}
								>
									<motion.div
										initial={{ rotate: 0 }}
										whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
										transition={{ duration: 0.5 }}
									>
										<FcGoogle className="mr-2 size-5" />
									</motion.div>
									Google
								</Button>
							</motion.div>
						</div>

						<div className="relative mb-8">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-[#333]" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="bg-black px-2 text-[#777]">Or</span>
							</div>
						</div>

						{(formError || error) && (
							<div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-200 text-sm">
								{formError || error}
							</div>
						)}

						<form className="space-y-6" onSubmit={handleSubmit}>
							<div className="grid gap-4 md:grid-cols-2">
								<div className="space-y-2">
									<motion.div whileFocus={{ scale: 1.01 }}>
										<Input
											className="border-[#333] bg-transparent py-5 text-white transition-all duration-200 placeholder:text-neutral-600 focus:border-[#555]"
											placeholder="Name"
											type="text"
											name="name"
											value={formData.name}
											onChange={handleChange}
											required
										/>
									</motion.div>
								</div>
								<div className="space-y-2">
									<motion.div whileFocus={{ scale: 1.01 }}>
										<Input
											className="border-[#333] bg-transparent py-5 text-white transition-all duration-200 placeholder:text-neutral-600 focus:border-[#555]"
											placeholder="Surname"
											type="text"
											name="surname"
											value={formData.surname}
											onChange={handleChange}
											required
										/>
									</motion.div>
								</div>
							</div>

							<div className="space-y-2">
								<motion.div whileFocus={{ scale: 1.01 }}>
									<Input
										className="border-[#333] bg-transparent py-5 text-white transition-all duration-200 placeholder:text-neutral-600 focus:border-[#555]"
										placeholder="cooluser@mail.com"
										type="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										required
									/>
								</motion.div>
							</div>

							<div className="space-y-2">
								<motion.div whileFocus={{ scale: 1.01 }}>
									<Input
										className="border-[#333] bg-transparent py-5 text-white transition-all duration-200 placeholder:text-neutral-600 focus:border-[#555]"
										placeholder="supersecurepass"
										type="password"
										name="password"
										value={formData.password}
										onChange={handleChange}
										required
										minLength={8}
									/>
								</motion.div>
								<div className="flex items-center gap-1 mt-2">
									<div
										className={`flex h-4 w-4 items-center justify-center rounded-full border ${
											formData.password.length >= 8
												? "border-green-500 bg-green-500/20"
												: "border-[#555]"
										}`}
									/>
									<p className="text-sm text-gray-400">
										Must be at least 8 characters.
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
									{isSubmitting ? "Signing Up..." : "Sign Up"}
								</Button>
							</motion.div>

							<div className="flex items-center justify-center gap-2 pt-4">
								<p className="text-[#777] text-sm">Already have an account?</p>
								<motion.div
									whileHover={{ scale: 1.05, x: 3 }}
									whileTap={{ scale: 0.95 }}
								>
									<Link
										to="/login"
										className="font-medium text-sm text-white transition-all duration-200 hover:underline"
									>
										Log in →
									</Link>
								</motion.div>
							</div>
						</form>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
