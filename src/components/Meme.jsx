import React from "react";
import { useState } from "react";
import "../App.css";

const Meme = ({ meme, setMeme }) => {
  const [form, setForm] = useState({
    template_id: meme.id,
    username: "kkbenzama",
    password: "kkbenzama",
    boxes: [],
  });
  const generateMeme = () => {
    let url = `https://api.imgflip.com/caption_image?template_id=${form.template_id}&username=${form.username}&password=${form.password}`;
    form.boxes.map((box, index) => {
      url += `&boxes[${index}][text]=${box.text}`;
    });
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setMeme({ ...meme, url: data.data.url });
      });
  };
  return (
    <div className="meme">
      <img src={meme.url} alt="meme" />
      <div>
        {[...Array(meme.box_count)].map((_, index) => (
          <input
            type="text"
            key={index}
            placeholder={`Meme Caption: ${index + 1}`}
            onChange={(e) => {
              const newBoxes = form.boxes;
              newBoxes[index] = { text: e.target.value };
              setForm({ ...form, boxes: newBoxes });
            }}
          />
        ))}
      </div>
      <div>
        <button onClick={generateMeme}> Generate meme</button>
        <button onClick={() => setMeme(null)}>Choose Template</button>
      </div>
    </div>
  );
};

export default Meme;
