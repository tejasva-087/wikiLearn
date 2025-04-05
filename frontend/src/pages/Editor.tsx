import React, { useState, useEffect } from "react";
import Achievements from "../components/Achievements";
import Sidebar from "../components/Sidebar";

function Editor() {
<<<<<<< HEAD
  const [text, setText] = useState("");
  const [title, setTitle] = useState("Untitled Document");
  const [isSaved, setIsSaved] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [summary, setSummary] = useState("");
  const [feedback, setFeedback] = useState({});
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [overallScore, setOverallScore] = useState(0);

  // Handle text changes
  const handleTextChange = (e) => {
    setText(e.target.value);
    setIsSaved(false);

    // Add to history for undo/redo
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(e.target.value);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Handle title changes
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setIsSaved(false);
  };

  // Save document function
  const saveDocument = () => {
    // In a real app, this would save to a database or file
    console.log("Saving document:", { title, text });
    setIsSaved(true);
    // Here you might trigger an achievement for saving
  };

  // Undo function
  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setText(history[historyIndex - 1]);
    }
  };

  // Redo function
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setText(history[historyIndex + 1]);
    }
  };

  // Font size handlers
  const increaseFontSize = () => setFontSize((prev) => prev + 1);
  const decreaseFontSize = () => setFontSize((prev) => Math.max(8, prev - 1));

  // Analyze the article and generate feedback
  const analyzeArticle = () => {
    // In a real app, this might use NLP or AI services
    // For now, we'll use some basic heuristics

    // Generate summary (simplified version)
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const summaryText =
      sentences.length > 3
        ? sentences.slice(0, 3).join(". ") + "..."
        : sentences.join(". ");

    setSummary(summaryText);

    // Calculate metrics
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    const sentenceCount = sentences.length;
    const avgWordsPerSentence =
      sentenceCount > 0 ? (wordCount / sentenceCount).toFixed(1) : 0;
    const paragraphs = text.split(/\n\n+/).filter((p) => p.trim().length > 0);

    // Check for common issues
    const repeatedWords = findRepeatedWords(text);
    const passiveVoice = estimatePassiveVoice(text);
    const readability = calculateReadabilityScore(text);

    // Compute scores
    const lengthScore = Math.min(10, wordCount / 100);
    const structureScore = calculateStructureScore(text);
    const readabilityScore = readability;
    const uniquenessScore = 10 - Math.min(10, repeatedWords.length);

    // Overall score (out of 100)
    const calculatedScore = Math.round(
      (lengthScore + structureScore + readabilityScore + uniquenessScore) * 2.5
    );
    setOverallScore(calculatedScore);

    // Set feedback
    setFeedback({
      metrics: {
        wordCount,
        sentenceCount,
        paragraphCount: paragraphs.length,
        avgWordsPerSentence,
      },
      suggestions: [
        wordCount < 300
          ? "Consider adding more content for a comprehensive article."
          : "Good article length.",
        avgWordsPerSentence > 25
          ? "Try shortening some sentences for better readability."
          : "Sentence length is good.",
        repeatedWords.length > 5
          ? `Watch for overused words: ${repeatedWords.slice(0, 5).join(", ")}`
          : "Good vocabulary variation.",
        passiveVoice > 30
          ? "Consider reducing passive voice for more engaging content."
          : "Active voice usage is good.",
        readability < 60
          ? "The text might be difficult to read. Try simplifying."
          : "Readability is good.",
      ],
      scores: {
        length: lengthScore,
        structure: structureScore,
        readability: readabilityScore,
        uniqueness: uniquenessScore,
      },
    });

    setShowAnalysis(true);
  };

  // Helper functions for analysis
  const findRepeatedWords = (text) => {
    const words = text.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
    const wordCount = {};
    words.forEach((word) => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });
    return Object.entries(wordCount)
      .filter(([_, count]) => count > 3)
      .map(([word]) => word);
  };

  const estimatePassiveVoice = (text) => {
    // Simple heuristic: count phrases like "was [verb]ed" or "were [verb]ed"
    const passivePatterns = /\b(is|are|was|were|be|been|being)\s+(\w+ed)\b/gi;
    const matches = (text.match(passivePatterns) || []).length;
    const sentences = text.split(/[.!?]+/).filter(Boolean).length;
    return sentences > 0 ? Math.round((matches / sentences) * 100) : 0;
  };

  const calculateReadabilityScore = (text) => {
    // Simple approximation of readability
    const words = text.split(/\s+/).filter(Boolean).length;
    const sentences = text.split(/[.!?]+/).filter(Boolean).length;
    const characters = text.replace(/\s+/g, "").length;

    if (sentences === 0 || words === 0) return 50; // Default mid-range score

    // Approximate Flesch-Kincaid formula
    const avgSentenceLength = words / sentences;
    const avgWordLength = characters / words;

    // Convert to 0-10 scale
    return Math.max(
      0,
      Math.min(10, 10 - (avgSentenceLength * 0.1 + avgWordLength * 0.5))
    );
  };

  const calculateStructureScore = (text) => {
    // Check for structural elements like paragraphs, headings, etc.
    const paragraphs = text.split(/\n\n+/).filter((p) => p.trim().length > 0);
    const potentialHeadings = paragraphs.filter(
      (p) =>
        (p.length < 100 && p.trim().endsWith(":")) ||
        p.split("\n")[0].toUpperCase() === p.split("\n")[0]
    );

    // Score based on paragraph count and potential headings
    return Math.min(10, paragraphs.length * 0.5 + potentialHeadings.length);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "s":
            e.preventDefault();
            saveDocument();
            break;
          case "z":
            e.preventDefault();
            handleUndo();
            break;
          case "y":
            e.preventDefault();
            handleRedo();
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [historyIndex, history]);

  // Auto-save feature
  useEffect(() => {
    if (!isSaved) {
      const timer = setTimeout(() => {
        saveDocument();
      }, 30000); // Auto-save after 30 seconds of inactivity
      return () => clearTimeout(timer);
    }
  }, [text, isSaved]);

  // Warn before closing if unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!isSaved) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isSaved]);

  return (
    <div>
      <div className="flex h-screen">
        {/* Side Bar */}
        <Sidebar />

        {/* Edit Page main content */}
        <div className="flex-1 flex flex-col p-4 overflow-auto">
          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="text-2xl font-bold border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
              placeholder="Document Title"
            />

            <div className="flex space-x-2">
              <button
                onClick={saveDocument}
                className={`px-4 py-2 rounded ${
                  isSaved ? "bg-gray-300" : "bg-blue-500 text-white"
                }`}
                disabled={isSaved}
              >
                {isSaved ? "Saved" : "Save"}
              </button>

              <button
                onClick={handleUndo}
                disabled={historyIndex <= 0}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                Undo
              </button>

              <button
                onClick={handleRedo}
                disabled={historyIndex >= history.length - 1}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                Redo
              </button>
            </div>
          </div>

          <div className="mb-4 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm">Font:</label>
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="border rounded p-1"
              >
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
                <option value="Georgia">Georgia</option>
                <option value="Verdana">Verdana</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm">Size:</label>
              <button
                onClick={decreaseFontSize}
                className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded"
              >
                -
              </button>
              <span>{fontSize}px</span>
              <button
                onClick={increaseFontSize}
                className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded"
              >
                +
              </button>
            </div>

            <div className="flex space-x-2">
              <button className="px-2 py-1 bg-gray-200 rounded font-bold">
                B
              </button>
              <button className="px-2 py-1 bg-gray-200 rounded italic">
                I
              </button>
              <button className="px-2 py-1 bg-gray-200 rounded underline">
                U
              </button>
            </div>

            <button
              onClick={analyzeArticle}
              className="ml-auto px-4 py-1 bg-green-500 text-white rounded"
            >
              Analyze Article
            </button>
          </div>

          <div className="flex flex-1">
            <textarea
              value={text}
              onChange={handleTextChange}
              style={{
                fontFamily,
                fontSize: `${fontSize}px`,
                height: "100%",
              }}
              className="flex-1 p-4 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Start typing your document here..."
            />

            {showAnalysis && (
              <div className="w-80 ml-4 border rounded p-4 overflow-y-auto">
                <h3 className="text-xl font-bold mb-4">Article Analysis</h3>

                <div className="mb-6">
                  <h4 className="font-bold mb-2">Summary</h4>
                  <p className="text-sm">
                    {summary ||
                      "Unable to generate summary. Please add more content."}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold mb-2">Overall Score</h4>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-green-600 bg-green-200">
                          {overallScore}/100
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block">
                          {overallScore < 50
                            ? "Needs Improvement"
                            : overallScore < 70
                            ? "Good"
                            : overallScore < 90
                            ? "Very Good"
                            : "Excellent"}
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: `${overallScore}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold mb-2">Metrics</h4>
                  <ul className="text-sm">
                    <li>Words: {feedback.metrics?.wordCount || 0}</li>
                    <li>Sentences: {feedback.metrics?.sentenceCount || 0}</li>
                    <li>Paragraphs: {feedback.metrics?.paragraphCount || 0}</li>
                    <li>
                      Avg. words per sentence:{" "}
                      {feedback.metrics?.avgWordsPerSentence || 0}
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold mb-2">Score Breakdown</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Length</span>
                        <span>{feedback.scores?.length || 0}/10</span>
                      </div>
                      <div className="overflow-hidden h-1.5 text-xs flex rounded bg-gray-200">
                        <div
                          style={{
                            width: `${(feedback.scores?.length || 0) * 10}%`,
                          }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Structure</span>
                        <span>{feedback.scores?.structure || 0}/10</span>
                      </div>
                      <div className="overflow-hidden h-1.5 text-xs flex rounded bg-gray-200">
                        <div
                          style={{
                            width: `${(feedback.scores?.structure || 0) * 10}%`,
                          }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Readability</span>
                        <span>{feedback.scores?.readability || 0}/10</span>
                      </div>
                      <div className="overflow-hidden h-1.5 text-xs flex rounded bg-gray-200">
                        <div
                          style={{
                            width: `${
                              (feedback.scores?.readability || 0) * 10
                            }%`,
                          }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Uniqueness</span>
                        <span>{feedback.scores?.uniqueness || 0}/10</span>
                      </div>
                      <div className="overflow-hidden h-1.5 text-xs flex rounded bg-gray-200">
                        <div
                          style={{
                            width: `${
                              (feedback.scores?.uniqueness || 0) * 10
                            }%`,
                          }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-bold mb-2">Suggestions</h4>
                  <ul className="text-sm list-disc pl-5 space-y-1">
                    {feedback.suggestions?.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setShowAnalysis(false)}
                  className="w-full px-4 py-2 bg-gray-200 rounded"
                >
                  Close Analysis
                </button>
              </div>
            )}
          </div>

          <div className="mt-2 text-sm text-gray-500">
            {text.split(/\s+/).filter(Boolean).length} words | {text.length}{" "}
            characters
          </div>
        </div>

        {/* Achievement Bar */}
        <Achievements />
      </div>
    </div>
  );
=======
	return (
		<div>
			<div className="flex h-screen">
				{/* Side Bar */}
				<Sidebar />
				{/* Home Page main content */}
				<div className="max-w-4xl mx-auto text-3xl mt-2">Editor</div>
				{/* Achievement Bar */}
				<Achievements />
			</div>
		</div>
	);
>>>>>>> 7458965608a53c9b62ea0828332af33184fe2265
}

export default Editor;
