import {
  FaHome,
  FaBook,
  FaAward,
  FaCertificate,
  FaComments,
} from "react-icons/fa";

function Sidebar() {
  return (
    <div className="w-1/6 bg-white p-4 shadow-md">
      <nav className="space-y-4">
        <a
          className="flex items-center text-xl space-x-3 text-gray-700 hover:text-blue-500 hover:bg-gray-200 p-3 rounded-xl transition"
          href="/"
        >
          <FaHome />
          <span>Overview</span>
        </a>
        <a
          className="flex items-center text-xl space-x-3 text-gray-700 hover:text-blue-500 hover:bg-gray-200 p-3 rounded-xl transition"
          href="/courses"
        >
          <FaBook />
          <span>Courses</span>
        </a>
        <a
          className="flex items-center text-xl space-x-3 text-gray-700 hover:text-blue-500 hover:bg-gray-200 p-3 rounded-xl transition"
          href="/badges"
        >
          <FaAward />
          <span>Badges</span>
        </a>
        <a
          className="flex items-center text-xl space-x-3 text-gray-700 hover:text-blue-500 hover:bg-gray-200 p-3 rounded-xl transition"
          href="/certificates"
        >
          <FaCertificate />
          <span>Certificates</span>
        </a>
        <a
          className="flex items-center text-xl space-x-3 text-gray-700 hover:text-blue-500 hover:bg-gray-200 p-3 rounded-xl transition"
          href="/forum"
        >
          <FaComments />
          <span>Forum</span>
        </a>
      </nav>
    </div>
  );
}

export default Sidebar;
