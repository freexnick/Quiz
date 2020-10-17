import React from "react";
import { Button } from "@material-ui/core";

// Points, Questions, Restart()
const GameOver = (props) => {
  return (
    <div className="GameOver">
      <h1>Final Score</h1>
      <div className="score">
        {props.points} / {props.numQuestions}
      </div>
      <Button
        className="playAgain"
        variant="contained"
        color="default"
        disableElevation
        onClick={props.playAgain}
      >
        Play Again
      </Button>
    </div>
  );
};

export default GameOver;
