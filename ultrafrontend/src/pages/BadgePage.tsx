import Achievements from "../components/Achievements";
import Sidebar from "../components/Sidebar";

function BadgePage() {
  return (
    <div>
      <div className="flex h-screen">
        {/* Side Bar */}
        <Sidebar></Sidebar>
        {/* Badge Page main content */}
        <div className="max-w-4xl text-3xl mx-auto mt-4">
          <h1 className="text-center mt-3">Explore Badges</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mt-6 gap-6 ">
            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center bg-white rounded-xl p-4 text-center shadow-md border border-gray-300 border-[2px] hover:text-blue-500 hover:bg-gray-200 cursor-pointer">
              <img
                alt="Scales icon on green background"
                className="mb-4 rounded-full"
                height="50"
                src="https://storage.googleapis.com/a1aa/image/PAiqNlxCPglqZ-MKjWyZ59MN5RFZ1VhkoTSZIfOEL-w.jpg"
                width="50"
              />
              <p className="text-sm font-medium">Knowledge Seeker</p>
              <p className="text-sm font-medium">Bronze I</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center bg-white rounded-xl p-4 text-center shadow-md border border-gray-300 border-[2px] hover:text-blue-500 hover:bg-gray-200 cursor-pointer">
              <img
                alt="Light bulb icon on pink background"
                className="mb-4 rounded-full"
                height="50"
                src="https://storage.googleapis.com/a1aa/image/oH4N-hwzI5zjorkGgEUWHJ6nDwAk2pDUaWSnDlh-C8o.jpg"
                width="50"
              />
              <p className="text-sm font-medium">Learning Explorer</p>
              <p className="text-sm font-medium">Bronze II</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center bg-white rounded-xl p-4 text-center shadow-md border border-gray-300 border-[2px] hover:text-blue-500 hover:bg-gray-200 cursor-pointer">
              <img
                alt="Puzzle piece icon on yellow background"
                className="mb-4 rounded-full"
                height="50"
                src="https://storage.googleapis.com/a1aa/image/MNbtg8RsbzjHsuJMqsXp4TpqCo-1e6zFkLXLxmzFfc8.jpg"
                width="50"
              />
              <p className="text-sm font-medium">Course Pathfinder</p>
              <p className="text-sm font-medium">Bronze III</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center bg-white rounded-xl p-4 text-center shadow-md border border-gray-300 border-[2px] hover:text-blue-500 hover:bg-gray-200 cursor-pointer">
              <img
                alt="Globe icon on blue background"
                className="mb-4 rounded-full"
                height="50"
                src="https://storage.googleapis.com/a1aa/image/WFRRutJBd3ALzjkTuP-BUpQyMR7ilMPKM_lSR-sS88M.jpg"
                width="50"
              />
              <p className="text-sm font-medium">Content Crafter</p>
              <p className="text-sm font-medium">Bronze IV</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center bg-white rounded-xl p-4 text-center shadow-md border border-gray-300 border-[2px] hover:text-blue-500 hover:bg-gray-200 cursor-pointer">
              <img
                alt="Scales icon on green background"
                className="mb-4 rounded-full"
                height="50"
                src="https://storage.googleapis.com/a1aa/image/PAiqNlxCPglqZ-MKjWyZ59MN5RFZ1VhkoTSZIfOEL-w.jpg"
                width="50"
              />
              <p className="text-sm font-medium">Source Sleuth</p>
              <p className="text-sm font-medium">Silver I</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center bg-white rounded-xl p-4 text-center shadow-md border border-gray-300 border-[2px] hover:text-blue-500 hover:bg-gray-200 cursor-pointer">
              <img
                alt="Light bulb icon on pink background"
                className="mb-4 rounded-full"
                height="50"
                src="https://storage.googleapis.com/a1aa/image/oH4N-hwzI5zjorkGgEUWHJ6nDwAk2pDUaWSnDlh-C8o.jpg"
                width="50"
              />
              <p className="text-sm font-medium">Mentor in Motion</p>
              <p className="text-sm font-medium">Silver II</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center bg-white rounded-xl p-4 text-center shadow-md border border-gray-300 border-[2px] hover:text-blue-500 hover:bg-gray-200 cursor-pointer">
              <img
                alt="Scales icon on green background"
                className="mb-4 rounded-full"
                height="50"
                src="https://storage.googleapis.com/a1aa/image/PAiqNlxCPglqZ-MKjWyZ59MN5RFZ1VhkoTSZIfOEL-w.jpg"
                width="50"
              />
              <p className="text-sm font-medium">Knowledge Architect</p>
              <p className="text-sm font-medium">Silver III</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center bg-white rounded-xl p-4 text-center shadow-md border border-gray-300 border-[2px] hover:text-blue-500 hover:bg-gray-200 cursor-pointer">
              <img
                alt="Light bulb icon on pink background"
                className="mb-4 rounded-full"
                height="50"
                src="https://storage.googleapis.com/a1aa/image/oH4N-hwzI5zjorkGgEUWHJ6nDwAk2pDUaWSnDlh-C8o.jpg"
                width="50"
              />
              <p className="text-sm font-medium">Citation Commander</p>
              <p className="text-sm font-medium">Silver IV</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center bg-white rounded-xl p-4 text-center shadow-md border border-gray-300 border-[2px] hover:text-blue-500 hover:bg-gray-200 cursor-pointer">
              <img
                alt="Puzzle piece icon on yellow background"
                className="mb-4 rounded-full"
                height="50"
                src="https://storage.googleapis.com/a1aa/image/MNbtg8RsbzjHsuJMqsXp4TpqCo-1e6zFkLXLxmzFfc8.jpg"
                width="50"
              />
              <p className="text-sm font-medium">Knowledge Curator</p>
              <p className="text-sm font-medium">Gold I</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center bg-white rounded-xl p-4 text-center shadow-md border border-gray-300 border-[2px] hover:text-blue-500 hover:bg-gray-200 cursor-pointer">
              <img
                alt="Globe icon on blue background"
                className="mb-4 rounded-full"
                height="50"
                src="https://storage.googleapis.com/a1aa/image/WFRRutJBd3ALzjkTuP-BUpQyMR7ilMPKM_lSR-sS88M.jpg"
                width="50"
              />
              <p className="text-sm font-medium">Mentorship Champion</p>
              <p className="text-sm font-medium">Gold II</p>
            </div>
          </div>
        </div>

        {/* Achievement Bar */}
        <Achievements />
      </div>
    </div>
  );
}

export default BadgePage;
