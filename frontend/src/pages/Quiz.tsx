import { useState } from "react";
import Achievements from "../components/Achievements";
import Sidebar from "../components/Sidebar";

const questions = [
  {
    question: "What is the first pillar of Wikipedia?",
    options: [
      "A blog platform",
      "A newspaper",
      "An encyclopedia",
      "A social media site",
    ],
    answer: "An encyclopedia",
    feedback: "Correct! Wikipedia is an encyclopedia, not a blog or news site.",
  },
  {
    question: "Which pillar promotes unbiased content?",
    options: ["Free editing", "Neutral point of view", "Civility", "No rules"],
    answer: "Neutral point of view",
    feedback: "Yes! Articles must reflect a balanced and neutral tone.",
  },
  {
    question: "What does the third pillar emphasize?",
    options: [
      "Original opinions",
      "Paywall access",
      "Free content anyone can use",
      "Only admins can edit",
    ],
    answer: "Free content anyone can use",
    feedback: "That’s right! Everything on Wikipedia is free to use and remix.",
  },
  {
    question: "How should editors treat each other?",
    options: ["Ignore them", "Be rude", "Respect and civility", "Always argue"],
    answer: "Respect and civility",
    feedback: "Bingo! Respect and civility make the community thrive.",
  },
  {
    question: "What does the final pillar say?",
    options: [
      "Always follow strict rules",
      "Be bold and use common sense",
      "Do nothing",
      "Call support",
    ],
    answer: "Be bold and use common sense",
    feedback: "Perfect! Wikipedia grows because editors boldly improve it.",
  },
];

function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completed, setCompleted] = useState(false);

  const current = questions[currentQ];

  const handleOptionClick = (option) => {
    setSelected(option);
    setShowFeedback(true);

    if (option === current.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    setSelected("");
    setShowFeedback(false);
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setCompleted(true);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 overflow-y-auto p-6 ">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">
          Wikimedia Pillars Quiz
        </h1>

        {!completed ? (
          <div className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Q{currentQ + 1}: {current.question}
            </h2>

            <div className="space-y-2">
              {current.options.map((option, idx) => (
                <button
                  key={idx}
                  className={`w-full text-left px-4 py-2 rounded-md border transition ${
                    selected === option
                      ? option === current.answer
                        ? "bg-green-100 border-green-600 text-green-800"
                        : "bg-red-100 border-red-600 text-red-800"
                      : "hover:bg-gray-100 border-gray-300"
                  }`}
                  disabled={showFeedback}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>

            {showFeedback && (
              <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-800 rounded-md">
                <strong>Feedback:</strong> {current.feedback}
              </div>
            )}

            {showFeedback && (
              <button
                onClick={nextQuestion}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                {currentQ + 1 < questions.length
                  ? "Next Question ➡️"
                  : "Finish Quiz 🎉"}
              </button>
            )}
          </div>
        ) : (
          <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg text-center">
            <h2 className="text-2xl font-bold text-green-700 mb-2">
              🎉 Quiz Completed!
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              You got <strong>{score}</strong> out of{" "}
              <strong>{questions.length}</strong> correct!
            </p>
            <p className="text-sm text-gray-600">
              Great job learning the Five Pillars of Wikipedia! 🌟
            </p>

            <button
              onClick={() => {
                setCurrentQ(0);
                setScore(0);
                setSelected("");
                setShowFeedback(false);
                setCompleted(false);
              }}
              className="mt-6 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              🔄 Retake Quiz
            </button>
          </div>
        )}
      </div>

      <Achievements />
    </div>
  );
}

export default Quiz;
