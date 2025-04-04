import Achievements from '../components/Achievements';
import Sidebar from '../components/Sidebar';

function HomePage() {
  return (
    <div>
      <div className="flex h-screen">
        {/* Side Bar */}
        <Sidebar></Sidebar>
        {/* Home Page main content */}
        <div className="max-w-4xl mx-auto mt-2">
          <div className="bg-blue-600 text-white rounded-lg p-6 mt-3 relative">
            <h2 className="text-xl font-semibold mb-2 ">
              Continue, Fundamental pillars of wikipedia course
            </h2>
            <p className="mb-4">
              Master the foundational principles that guide Wikipedia. This
              course explores the Five Pillars, essential for understanding and
              contributing effectively.
            </p>
            <button className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg">
              Continue
              <i className="fas fa-arrow-right ml-2"></i>
            </button>
            <img
              alt="Decorative background with star patterns"
              className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
              height="400"
              src="https://storage.googleapis.com/a1aa/image/EPBUZ1nuG8L0u9dRpDxYqB3OPEOmug8ylUc5fWzUacE.jpg"
              width="600"
            />
          </div>
          {/* Bages */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Badges</h3>
              <a className="text-blue-600 font-semibold" href="#">
                See all badges
                <i className="fas fa-arrow-right ml-1"></i>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Bagdge 1 */}
            <div className="bg-white rounded-xl p-4 text-center shadow-md border border-gray-300 border-[2px]">
              <img
                alt="Icon representing the first pillar of Wikipedia"
                className="mx-auto mb-2 rounded-full "
                height="100"
                src="https://storage.googleapis.com/a1aa/image/gzg3wUdjJ4vuXYaSqiPs9z6r2VrHYwuXrtGBpODAnhQ.jpg"
                width="100"
              />
              <p className="font-semibold">
                Master the first pillar of wikipedia
              </p>
              <p className="text-gray-500">12/08/2025</p>
            </div>
            {/* Bagdge 2 */}
            <div className="bg-white rounded-xl p-4 text-center shadow-md border border-gray-300 border-[2px]">
              <img
                alt="Icon representing the second pillar of Wikipedia"
                className="mx-auto mb-2 rounded-full"
                height="100"
                src="https://storage.googleapis.com/a1aa/image/0urXzMtxNIXfi_BucrWrtVvKDnXzlDsI54It6cI0gV0.jpg"
                width="100"
              />
              <p className="font-semibold">
                Master the second pillar of wikipedia
              </p>
              <p className="text-gray-500">12/08/2025</p>
            </div>
            {/* Badge 3 */}
            <div className="bg-white rounded-xl p-4 text-center shadow-md border border-gray-300 border-[2px]">
              <img
                alt="Icon representing the third pillar of Wikipedia"
                className="mx-auto mb-2 rounded-full"
                height="100"
                src="https://storage.googleapis.com/a1aa/image/7-w2jdO4GyDEtaas8ajdHb8CxTq8ldUvLHqM_kY-73Y.jpg"
                width="100"
              />
              <p className="font-semibold">
                Master the third pillar of wikipedia
              </p>
              <p className="text-gray-500">12/08/2025</p>
            </div>
            {/* Badge 4 */}
            <div className="bg-white rounded-xl p-4 text-center shadow-md border border-gray-300 border-[2px]">
              <img
                alt="Icon representing the fourth pillar of Wikipedia"
                className="mx-auto mb-2 rounded-full"
                height="100"
                src="https://storage.googleapis.com/a1aa/image/JvO2yzS570wUAQN-A2qcDctJbGk9ytjxY1rt3MFgPl4.jpg"
                width="100"
              />
              <p className="font-semibold">
                Master the fourth pillar of wikipedia
              </p>
              <p className="text-gray-500">12/08/2025</p>
            </div>
          </div>
        </div>

        {/* Achievement Bar */}
        <Achievements></Achievements>
      </div>
    </div>
  );
}

export default HomePage;
