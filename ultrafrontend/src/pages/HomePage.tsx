import Achievements from "../components/Achievements";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import logo from "../assets/logo.gif";
import logo2 from "../assets/taking.gif";


function HomePage() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Hide the welcome message after 5 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Welcome Message Overlay */}
      {showWelcome && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md text-center">
            <img
              src={logo}
              alt="WikiLearn Mascot"
              className="mx-auto mb-4 w-32 h-32"
            />
            <h2 className="text-2xl font-bold text-blue-600 mb-2">
              Welcome to WikiLearn!
            </h2>

            <p className="mb-4">
              Hello there! I'm wikilearn, your wikimedia learning companion.
            </p>
            <button
              onClick={() => setShowWelcome(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Let's Get Started
            </button>
          </div>
        </div>
      )}

      <div className="flex h-screen">
        {/* Side Bar */}
        <Sidebar></Sidebar>
        {/* Home Page main content */}
        <div className="max-w-4xl mx-auto mt-2">
          <div className="bg-blue-600 text-white rounded-lg p-6 mt-3 relative">
            <h2 className="text-xl font-semibold mb-2">Welcome to WikiLearn !!</h2>
            <img
              src={logo2}
              alt="WikiLearn Mascot"
              className="mx-auto rounded-lg mb-4 w-32 h-32"
            />
            <p className="mb-4">
              Master the core principles that power Wikipedia. Dive into a fun,
              modular course packed with interactive lessons, quizzes, and
              instant feedback to boost your learning!
            </p>
            <a
              href="/course-map"
              className="inline-flex items-center bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Get Started
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
            <img
              alt="Decorative background with star patterns"
              className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
              height="400"
              src="https://storage.googleapis.com/a1aa/image/EPBUZ1nuG8L0u9dRpDxYqB3OPEOmug8ylUc5fWzUacE.jpg"
              width="600"
            />
          </div>
          {/* Badges */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Explore Courses</h3>
              <a className="text-blue-600 font-semibold" href="/courses">
                See all courses
                <i className="fas fa-arrow-right ml-1"></i>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Badge 1 */}
            <a href="/courses">
              <div className="bg-white rounded-xl p-4 text-center shadow-md border cursor-pointer border-gray-300 border-[2px]">
                <img
                  alt="Icon representing the first pillar of Wikipedia"
                  className="mx-auto mb-2 rounded-full"
                  height="100"
                  width="100"
                  src="https://storage.googleapis.com/a1aa/image/gzg3wUdjJ4vuXYaSqiPs9z6r2VrHYwuXrtGBpODAnhQ.jpg"
                />
                <p className="font-semibold">
                  What are five pillars of wikipedia
                </p>
              </div>
            </a>
            <a href="/courses">
              <div className="bg-white rounded-xl p-4 text-center shadow-md border cursor-pointer border-gray-300 border-[2px]">
                <img
                  alt="Icon representing the first pillar of Wikipedia"
                  className="mx-auto mb-2 rounded-full"
                  height="100"
                  width="100"
                  src="https://storage.googleapis.com/a1aa/image/0urXzMtxNIXfi_BucrWrtVvKDnXzlDsI54It6cI0gV0.jpg"
                />
                <p className="font-semibold">What wikipedia doesn't cover ?</p>
              </div>
            </a>
            <a href="/courses">
              <div className="bg-white rounded-xl p-4 text-center shadow-md border cursor-pointer border-gray-300 border-[2px]">
                <img
                  alt="Icon representing the first pillar of Wikipedia"
                  className="mx-auto mb-2 rounded-full"
                  height="100"
                  width="100"
                  src="https://storage.googleapis.com/a1aa/image/7-w2jdO4GyDEtaas8ajdHb8CxTq8ldUvLHqM_kY-73Y.jpg"
                />
                <p className="font-semibold">Wikipedia verifiability policy</p>
              </div>
            </a>
            <a href="/courses">
              <div className="bg-white rounded-xl p-4 text-center shadow-md border cursor-pointer border-gray-300 border-[2px]">
                <img
                  alt="Icon representing the first pillar of Wikipedia"
                  className="mx-auto mb-2 rounded-full"
                  height="100"
                  width="100"
                  src="https://storage.googleapis.com/a1aa/image/gzg3wUdjJ4vuXYaSqiPs9z6r2VrHYwuXrtGBpODAnhQ.jpg"
                />
                <p className="font-semibold">
                  Wikipedia's no original research policy
                </p>
              </div>
            </a>
            <a href="/courses">
              <div className="bg-white rounded-xl p-4 text-center shadow-md border cursor-pointer border-gray-300 border-[2px]">
                <img
                  alt="Icon representing the first pillar of Wikipedia"
                  className="mx-auto mb-2 rounded-full"
                  height="100"
                  width="100"
                  src="https://storage.googleapis.com/a1aa/image/JvO2yzS570wUAQN-A2qcDctJbGk9ytjxY1rt3MFgPl4.jpg"
                />
                <p className="font-semibold">
                  Wikipedia's neutral point of view
                </p>
              </div>
            </a>
            {/* Repeated badges removed for brevity */}
          </div>
        </div>

        {/* Achievement Bar */}
        <Achievements />
      </div>
    </div>
  );
}

export default HomePage;


