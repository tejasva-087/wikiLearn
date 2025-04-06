import Achievements from "../components/Achievements";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import logo2 from "../assets/question.gif";
import logocorrect from "../assets/correct.gif";
import logowrong from "../assets/wrong.gif";

function CourseContent() {
  const [selectedOption, setSelectedOption] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const correctAnswer =
    "Include both achievements and controversies, with reliable citations for all claims";

  const handleQuizSubmit = () => {
    if (selectedOption) {
      setIsSubmitted(true);
    }
  };

  const quizOptions = [
    "Write the article highlighting only the positive achievements to counter negative media coverage",
    "Include both achievements and controversies, with reliable citations for all claims",
    "Focus primarily on controversies since they're more interesting to readers",
    "Add your personal analysis of why the politician's policies are flawed",
  ];

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 overflow-y-auto p-6 ">
        <h1 className="text-4xl font-bold mb-6 ">Unreliable Sources</h1>
        <h2 className="font-semibold text-xl">Summary</h2>
        <img
          src={logo2}
          alt="WikiLearn Mascot"
          className="mx-auto mb-4 w-32 h-32"
        />
        <br></br>
        <span>
          Sources lacking editorial oversight, fact-checking, or with known
          biases are considered unreliable. These include tabloids, personal
          blogs, self-published sources, promotional materials, and sources with
          conflicts of interest. Unreliable sources generally shouldn't be used
          to support factual claims.Self-published material (with limited
          exceptions) Personal websites and blogs Social media posts Wikipedia
          itself or sites that mirror Wikipedia
        </span>

        {/* Quiz */}
        <div className="mt-10 bg-yellow-50 p-5 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-yellow-700">
            Quick Quiz!
          </h2>

          <p className="mb-3 text-gray-800">
            You're editing the biography of a controversial politician. What
            approach aligns with Wikipedia's principles?
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
            <div className="mt-3 flex items-center space-x-4">
              <img
                src={selectedOption === correctAnswer ? logocorrect : logowrong}
                alt={selectedOption === correctAnswer ? "Correct" : "Wrong"}
                className="w-16 h-16"
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
          )}
        </div>
        <br></br>
      </div>

      <Achievements />
    </div>
  );
}

export default CourseContent;
