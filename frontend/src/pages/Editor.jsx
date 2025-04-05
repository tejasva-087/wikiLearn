import Navigation from "../components/Navigation";
import MainMenu from "../components/MainMenu";
import SideMenu from "../components/SideMenu";
import Button from "../components/ui/Button";

import { useEffect, useState } from "react";

function Editor() {
  const [text, setText] = useState("");
  const [score, setScore] = useState(0);
  const [suggestions, setSuggestions] = useState([]);

  const handleAnalyze = async () => {
    setScore(0);
    setSuggestions([]);
    try {
      const response = await fetch(
        "http://127.0.0.1:3000/api/editor/checkarticle",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            article: text,
          }),
        }
      );

      const result = await response.json();
      setScore(result.data.answer.score);
      setSuggestions(result.data.answer.suggestions);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="layout">
      <Navigation />
      <MainMenu activeEl="Editor" />
      <div className="scrollable width-full ">
        <div className="editor">
          <textarea
            className="editor-text-area"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <div className="editor-buttons">
            <Button className="btn--primary" onClick={handleAnalyze}>
              Analyze
            </Button>
          </div>
        </div>

        <div className="editor-output flex-column">
          <div className="">
            <h3 className="heading-tertiary">Score: </h3>
            <p className="text-primary">{score}</p>
          </div>
          <div className=" flex-column">
            <h3 className="heading-tertiary">Suggestions: </h3>
            <ul className="editor-list">
              {suggestions.map((suggestions, index) => (
                <li key={index}>{suggestions.suggestion}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <SideMenu />
    </div>
  );
}

export default Editor;
