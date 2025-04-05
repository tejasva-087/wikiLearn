import Achievements from "../components/Achievements";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

function CourseContent() {
  const [selectedOption, setSelectedOption] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const correctAnswer = "Neutral point of view";

  const handleQuizSubmit = () => {
    if (selectedOption) {
      setIsSubmitted(true);
    }
  };


  const quizOptions = [
    "Wikipedia is an encyclopedia",
    "Neutral point of view",
    "No firm rules",
    "Respect and civility",
  ];

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 overflow-y-auto p-6 ">
        <h1 className="text-4xl font-bold mb-6 text-purple-700 animate-pulse">
        Wikimedia Five Pillars
        </h1>

        {/* Pillars */}
        <div className="space-y-6">
          {[
            {
              title: "📘 Pillar 1: Wikipedia is an Encyclopedia",
              desc: "Not a blog or newspaper. Just pure, clean, reliable knowledge.",
            },
            {
              title: "⚖️ Pillar 2: Neutral Point of View",
              desc: "Stay unbiased. Present facts from all sides—like a peaceful referee.",
            },
            {
              title: "🔓 Pillar 3: Free Content for All",
              desc: "Use it, remix it, edit it! Just cite your sources like a boss.",
            },
            {
              title: "🤝 Pillar 4: Respect and Civility",
              desc: "Edit like a gentleman/lady/legend. No fights, only facts.",
            },
            {
              title: "🚀 Pillar 5: No Firm Rules",
              desc: "Be bold. Use common sense. Wikipedia evolves with you!",
            },
          ].map((pillar, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow hover:scale-[1.01] transition"
            >
              <h2 className="text-xl font-semibold text-indigo-600">
                {pillar.title}
              </h2>
              <p className="text-gray-700 mt-1">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Quiz */}
        <div className="mt-10 bg-yellow-50 p-5 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-yellow-700">
          Quick Quiz!
          </h2>
          <p className="mb-3 text-gray-800">
            Which pillar promotes fairness and avoids bias?
          </p>

          <div className="space-y-2">
            {quizOptions.map((option, i) => (
              <div key={i}>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => {
                      setSelectedOption(option);
                      setIsSubmitted(false);
                    }}
                    className="form-radio text-indigo-600"
                  />
                  <span className="ml-2 text-gray-800">{option}</span>
                </label>
              </div>
            ))}
          </div>

          <button
            onClick={handleQuizSubmit}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Submit Answer
          </button>

          {isSubmitted && (
            <p
              className={`mt-3 font-medium ${
                selectedOption === correctAnswer
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {selectedOption === correctAnswer
                ? "✅ Correct! Well done!"
                : `❌ Nope! It was: "${correctAnswer}".`}
            </p>
          )}
        </div>

      </div>

      <Achievements />
    </div>
  );
}

export default CourseContent;
