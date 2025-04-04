import { CircleCheck, CircleX } from "lucide-react";
import Achievements from "../components/Achievements";
import Sidebar from "../components/Sidebar";

const steps = [
  {
    id: 1,
    title: "Wikipedia is an encyclopedia",
    points: 4,
    completed: true,
  },
  {
    id: 2,
    title: "Wikipedia is written from a neutral point of view",
    points: 4,
    completed: false,
  },
  {
    id: 3,
    title:
      "Wikipedia is free content that anyone can use, edit, and distribute",
    points: 4,
    completed: false,
  },
  {
    id: 4,
    title:
      "Wikipedia editors should treat each other with respect and civility",
    points: 4,
    completed: false,
  },
  {
    id: 5,
    title:
      "Wikipedia editors should treat each other with respect and civility",
    points: 4,
    completed: false,
  },
  {
    id: 6,
    title: "Quiz",
    points: 4,
    completed: false,
  },
];

export default function CourseMap() {
    return (
      <div>
        <div className="flex h-screen">
          {/* Side Bar */}
          <Sidebar></Sidebar>
          {/* Home Page main content */}
          <div className="max-w-4xl mx-auto mt-2">
            <div className="max-w-lg mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Fundamental pillars of Wikipedia course
              </h2>
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-5 top-0 w-1 bg-gray-300 h-full"></div>

                {/* Steps */}
                {steps.map((step, index) => (
                  <div key={step.id} className="relative flex items-start mb-6">
                    {/* Step Number */}
                    <div className="z-10 flex items-center justify-center w-8 h-8 bg-blue-500 text-white font-bold rounded-full">
                      {step.id}
                    </div>

                    {/* Step Content */}
                    <div className="ml-6 bg-gray-100 p-4 rounded-lg w-full shadow">
                      <div className="flex justify-between items-center">
                        <p className="text-gray-700 font-semibold">
                          {step.title}
                        </p>
                        {step.completed ? (
                          <CircleCheck className="text-green-500" />
                        ) : (
                          <CircleX className="text-red-500" />
                        )}
                      </div>
                      <p className="text-gray-500 text-sm">
                        {step.points} points
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>{" "}
          </div>

          {/* Achievement Bar */}
          <Achievements></Achievements>
        </div>
      </div>
    );
}

