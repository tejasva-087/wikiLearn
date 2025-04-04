import { CircleCheck, CircleX, ChevronRight } from "lucide-react";
import Achievements from "../components/Achievements";
import Sidebar from "../components/Sidebar";
import ProgressBar from "../components/ProgressBar"; // Assume you have this component

const steps = [
  {
    id: 1,
    title: "Wikipedia is an encyclopedia",
    description: "Learn what makes Wikipedia different from other websites",
    points: 4,
    completed: true,
  },
  {
    id: 2,
    title: "Wikipedia is written from a neutral point of view",
    description:
      "Understand the importance of neutrality in Wikipedia articles",
    points: 4,
    completed: false,
  },
  {
    id: 3,
    title:
      "Wikipedia is free content that anyone can use, edit, and distribute",
    description: "Explore Wikipedia's open editing model and licensing",
    points: 4,
    completed: false,
  },
  {
    id: 4,
    title:
      "Wikipedia editors should treat each other with respect and civility",
    description: "Learn about Wikipedia's community standards",
    points: 4,
    completed: false,
  },
  {
    id: 5,
    title: "Wikipedia has no firm rules",
    description: "Understand how Wikipedia's policies evolve",
    points: 4,
    completed: false,
  },
  {
    id: 6,
    title: "Final Quiz",
    description: "Test your knowledge of Wikipedia's fundamental pillars",
    points: 8,
    completed: false,
    isQuiz: true,
  },
];

export default function CourseMap() {
  const completedSteps = steps.filter((step) => step.completed).length;
  const totalSteps = steps.length;
  const progress = Math.round((completedSteps / totalSteps) * 100);
  const totalPoints = steps.reduce((sum, step) => sum + step.points, 0);
  const earnedPoints = steps.reduce(
    (sum, step) => (step.completed ? sum + step.points : sum),
    0
  );

  return (
    <div className="flex h-screen ">
      {/* Side Bar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Course Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Fundamental Pillars of Wikipedia
            </h1>
            <p className="text-gray-600 mb-4">
              Complete this course to understand the core principles that guide
              Wikipedia's content and community.
            </p>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Progress: {completedSteps}/{totalSteps} steps ({progress}%)
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {earnedPoints}/{totalPoints} points
                </span>
              </div>
              <ProgressBar value={progress} />
            </div>
          </div>

          {/* Course Steps */}
          <div className="bg-white  rounded-lg overflow-hidden">
            <div className="relative px-6 py-5">
              {/* Vertical Line */}
              <div className="absolute left-10 top-0 w-0.5 bg-gray-200 h-full"></div>

              {/* Steps */}
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`relative flex items-start pb-6 ${
                    index !== steps.length - 1 ? "border-b border-gray-100" : ""
                  } ${index !== 0 ? "pt-6" : ""}`}
                >
                  {/* Step Number */}
                  <div
                    className={`z-10 flex items-center justify-center w-8 h-8 ${
                      step.completed ? "bg-green-500" : "bg-blue-500"
                    } text-white font-bold rounded-full`}
                  >
                    {step.completed ? <CircleCheck size={16} /> : step.id}
                  </div>

                  {/* Step Content */}
                  <div className="ml-6 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3
                          className={`text-lg font-semibold ${
                            step.completed ? "text-green-600" : "text-gray-800"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {step.description}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`text-sm font-medium mr-3 ${
                            step.completed ? "text-green-600" : "text-gray-500"
                          }`}
                        >
                          {step.points} pts
                        </span>
                        <button
                          className={`p-1 rounded-full ${
                            step.completed
                              ? "text-green-500 bg-green-50"
                              : "text-blue-500 bg-blue-50"
                          }`}
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>

                    {step.isQuiz && (
                      <div className="mt-2">
                          <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                            Final Assessment
                          </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Bar */}
      <Achievements />
    </div>
  );
}
