import Achievements from "../components/Achievements";
import Sidebar from "../components/Sidebar";

function Certificate() {
	return (
		<div>
			<div className="flex h-screen">
				{/* Side Bar */}
				<Sidebar />
				{/* Home Page main content */}
				<div className="max-w-4xl text-3xl mx-auto mt-2">Certificate Page</div>

				{/* Achievement Bar */}
				<Achievements />
			</div>
		</div>
	);
}

export default Certificate;
