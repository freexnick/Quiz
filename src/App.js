import React, { useState } from "react";
import axios from "axios";

import "./scss/styles.scss";
import Startup from "./Startup";
import Question from "./Question";
import Scoreboard from "./Scoreboard";
import GameOver from "./GameOver";

function App() {
  const [questions, setQuestions] = useState({});
  const [gameStatus, setGameStatus] = useState("setup");
  const [numQuestions, setNumQuestions] = useState(0);
  const [round, setRound] = useState(0);
  const [points, setPoints] = useState(0);

  const getQuestions = (url) => {
    axios
      .get(url)
      .then((res) => {
        const data = res.data;
        setQuestions(data.results);
        setGameStatus("playing");
        setNumQuestions(data.results.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const nextQuestion = () => {
    if (round + 1 === numQuestions) {
      setGameStatus("gameover");
    } else {
      setRound(round + 1);
    }
  };

  const getResults = (result) => {
    console.log(result);
    if (result) {
      setPoints(points + 1);
    }
  };

  const playAgain = () => {
    setNumQuestions(0);
    setRound(0);
    setPoints(0);
    setQuestions({});
    setGameStatus("setup");
  };

  return (
    <div className="App">
      {gameStatus === "setup" && <Startup getQuestions={getQuestions} />}
      {gameStatus === "playing" && (
        <React.Fragment>
          <Scoreboard
            round={round}
            points={points}
            numQuestions={numQuestions}
          />
          <Question
            question={questions[round]}
            nextQuestion={nextQuestion}
            getResults={getResults}
          />
        </React.Fragment>
      )}
      {gameStatus === "gameover" && (
        <GameOver
          points={points}
          numQuestions={numQuestions}
          playAgain={playAgain}
        />
      )}
    </div>
  );
}

export default App;
