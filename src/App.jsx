import { useState, useEffect } from "react";

import Templates from "./components/Templates.jsx";
import Meme from "./components/Meme.jsx";
import "./App.css";

function App() {
  const [templates, setTemplates] = useState([]);
  const [meme, setMeme] = useState(null);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((data) => {
        setTemplates(data.data.memes);
      });
  }, []);

  return (
    <div className="App">
      {meme === null ? (
        <Templates templates={templates} setMeme={setMeme} />
      ) : (
        <Meme meme={meme} setMeme={setMeme} />
      )}
    </div>
  );
}

export default App;
