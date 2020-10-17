import React, { useState } from "react";
import { Button } from "@material-ui/core";

const Startup = (props) => {
  const [numQuestions, setNumQuestions] = useState(10);
  const [category, setCategory] = useState("any");
  const [difficulty, setDifficulty] = useState("any");
  const [type, setType] = useState("any");

  const categories = [
    "Any",
    "General Knowledge",
    "Entertainment: Books",
    "Entertainment: Film",
    "Entertainment: Music",
    "Entertainment: Musicals & Theatres",
    "Entertainment: Television",
    "Entertainment: Video Games",
    "Entertainment: Board Games",
    "Science & Nature",
    "Science: Computers",
    "Science: Mathematics",
    "Mythology",
    "Sports",
    "Geography",
    "History",
    "Politics",
    "Art",
    "Celebrities",
    "Animals",
    "Vehicles",
    "Entertainment: Comics",
    "Science: Gadgets",
    "Entertainment: Japanese Anime & Manga",
    "Entertainment: Cartoon & Animations"
  ];
  const difficulties = ["Any", "Easy", "Medium", "Hard"];
  const gameTypes = ["Any", "Multiple Choice", "True / False"];

  const updateSettings = (e) => {
    console.log(e.target.value);
    // Number
    if (e.target.name === "numQuestions") {
      setNumQuestions(e.target.value);
    }
    // Categories
    else if (e.target.name === "categories") {
      setCategory(Number(e.target.value) + 8);
      if (category > 32 || category <= 7) {
      }
    }
    // Difficulty
    else if (e.target.name === "difficulties") {
      let diff = Number(e.target.value);
      switch (diff) {
        case 0:
          setDifficulty("any");
          break;
        case 1:
          setDifficulty("easy");
          console.log("easy mode?");
          break;
        case 2:
          setDifficulty("medium");
          break;
        case 3:
          setDifficulty("hard");
          break;
        default:
          setDifficulty("any");
      }
    }
    // Type
    else if (e.target.name === "gameTypes") {
      let cat = Number(e.target.value);
      switch (cat) {
        case 0:
          setType("any");
          break;
        case 1:
          setType("multiple");
          break;
        case 2:
          setType("boolean");
          break;
        default:
          setType("any");
      }
    }
  };

  // connection to API
  const makeURL = () => {
    let url = "https://opentdb.com/api.php?";
    url += `&amount=${numQuestions}`;
    url += category !== "any" && category !== 8 ? `&category=${category}` : "";
    url += difficulty !== "any" ? `&difficulty=${difficulty}` : "";
    url += type !== "any" ? `&type=${type}` : "";
    props.getQuestions(url);
  };

  return (
    <div className="Startup">
      <h1>Sweeft Digital</h1>
      <div className="inputs">
        <div className="inputArea">
          <label>Number of Questions: </label>
          <input
            type="text"
            onChange={updateSettings}
            name="numQuestions"
            value={numQuestions}
            maxLength="2"
          ></input>
        </div>

        <div className="inputArea">
          <label>Category: </label>
          <select
            onChange={updateSettings}
            name="categories"
            value={String(category - 8)}
          >
            {categories.map((cat, index) => (
              <option key={index} value={index}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="inputArea">
          <label>Difficulty: </label>
          <select onChange={updateSettings} name="difficulties">
            {difficulties.map((difficulty, index) => (
              <option key={index} value={index}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>

        <div className="inputArea">
          <label>Game types: </label>
          <select onChange={updateSettings} name="gameTypes">
            {gameTypes.map((type, index) => (
              <option key={index} value={index}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Button
        variant="contained"
        color="default"
        disableElevation
        className="startBtn"
        onClick={() => {
          makeURL();
        }}
      >
        Start
      </Button>
    </div>
  );
};

export default Startup;
