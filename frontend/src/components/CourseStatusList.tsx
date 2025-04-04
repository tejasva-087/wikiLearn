import React from "react";

interface Course {
  name: string;
  completed: boolean;
}

interface CourseStatusListProps {
  courses: Course[];
}

export const CourseStatusList: React.FC<CourseStatusListProps> = ({
  courses,
}) => {
  return (
    <div className="relative ml-2">
      {/* Vertical line connecting the circles */}
      <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-300"></div>

      {/* Course items */}
      <div className="space-y-10">
        {courses.map((course, index) => (
          <div key={index} className="flex items-center relative">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center z-10 border-2 ${
                course.completed
                  ? "bg-blue-600 border-blue-700"
                  : "bg-gray-300 border-gray-400"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span className="ml-4 text-gray-800">{course.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseStatusList;
