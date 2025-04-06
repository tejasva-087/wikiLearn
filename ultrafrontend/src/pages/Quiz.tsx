import { useState } from "react";
import Achievements from "../components/Achievements";
import Sidebar from "../components/Sidebar";
import logocorrect from "../assets/correct.gif";
import logowrong from "../assets/wrong.gif";
import logoquestion from "../assets/question.gif";

const questions = [
  {
    question:
      "The Edit Disagreement Another editor keeps reverting your changes to an article. What's your best course of action?",
    options: [
      "Keep changing it back until they give up",
      "Create multiple accounts to support your version",
      "Leave a harsh message on their talk page about their incompetence",
      "Discuss the changes on the article's talk page and seek consensus",
    ],
    answer: "Discuss the changes on the article's talk page and seek consensus",
    feedback:
      "Correct! This demonstrates respect and civility by discussing disagreements calmly and seeking consensus.",
  },
  {
    question:
      "The Innovative Approach You have an idea that might improve Wikipedia but doesn't strictly follow current guidelines. You should:",
    options: [
      "Abandon the idea since it doesn't follow the rules",
      "Implement it cautiously, explaining your reasoning on the talk page",
      "Start a petition to change the guidelines first",
      "Create a new Wikipedia site with your own rules",
    ],
    answer:
      "Implement it cautiously, explaining your reasoning on the talk page",
    feedback:
      "Yes! This embraces no firm rules by being bold while considering the spirit of Wikipedia's principles.",
  },
  {
    question:
      "The Article Decision You want to create a new Wikipedia article. Which topic would be appropriate?",
    options: [
      "Your personal blog with travel stories",
      "A collection of quotes from your favorite TV show",
      "A notable scientific theory with published research",
      "A directory of the best restaurants in your city",
    ],
    answer: "A notable scientific theory with published research",
    feedback:
      "Correct!This respects the Wikipedia is an encyclopedia pillar by focusing on notable topics with reliable sources.",
  },
  {
    question:
      "The Biography Battle You're editing the biography of a controversial politician. What approach aligns with Wikipedia's principles?",
    options: [
      "Write the article highlighting only the positive achievements to counter negative media coverage",
      "Include both achievements and controversies, with reliable citations for all claims",
      "Focus primarily on controversies since they're more interesting to readers",
      "Add your personal analysis of why the politician's policies are flawed",
    ],
    answer:
      "Include both achievements and controversies, with reliable citations for all claims",
    feedback:
      "Bingo! This follows the neutral point of view pillar by documenting major viewpoints impartially with reliable sources.",
  },
  {
    question: "Which on of the following is a wikipedia pillar?",
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
  const [selectedOption, setSelectedOption] = useState("");
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const current = questions[currentQ];

  const handleOptionClick = (option) => {
    setSelected(option);
    setSelectedOption(option);
    setCorrectAnswer(current.answer);
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

      <div className="flex-1 overflow-y-auto p-6">
        <h1 className="text-3xl text-center font-bold mb-6">
          Test your knowledge
        </h1>
        <div className="flex justify-center mb-4">
          <img src={logoquestion} className="w-28 h-28" alt="Question logo" />
        </div>

        {!completed ? (
          <div className="bg-white p-6 rounded-xl max-w-3xl mx-auto transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Q{currentQ + 1}: {current.question}
            </h2>

            <div className="space-y-4">
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
              <>
                <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-800 rounded-md">
                  <strong>Feedback:</strong> {current.feedback}
                </div>

                <div className="mt-3 flex items-center space-x-4">
                  <img
                    src={
                      selectedOption === correctAnswer ? logocorrect : logowrong
                    }
                    alt={selectedOption === correctAnswer ? "Correct" : "Wrong"}
                    className="w-28 h-28"
                  />
                  <p
                    className={`font-medium ${
                      selectedOption === correctAnswer
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {selectedOption === correctAnswer
                      ? "✅ Correct! Well done! This follows the neutral point of view pillar by documenting major viewpoints impartially with reliable sources."
                      : `❌ Nope! It was: "${correctAnswer}".`}
                  </p>
                </div>

                <button
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  onClick={nextQuestion}
                >
                  Next
                </button>
              </>
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