import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";

const Question = (props) => {
  const [userAnswer, setUserAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [checkDisabled, setCheckDisabled] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const shuffleAnswers = () => {
      return [
        props.question.correct_answer,
        ...props.question.incorrect_answers
      ].sort(() => Math.random() - 0.5);
    };

    console.log("inside useEffect");
    setAnswers(shuffleAnswers());
    setUserAnswer(null);
    setCheckDisabled(false);
    setResults(null);
  }, [props.question]);

  const selectAnswer = (e) => {
    if (userAnswer == null) {
      let attr = Number(e.target.getAttribute("data-id"));
      setUserAnswer(Number(e.target.getAttribute("data-id")));
      console.log(e.target.getAttribute("data-id"));

      let correct =
        answers[attr] === props.question.correct_answer ? true : false;
      console.log(`${answers[attr]} === ${props.question.correct_answer}`);

      setResults(correct);

      props.getResults(correct);
    }
    setCheckDisabled(true);
  };

  const nextQuestion = () => {
    props.nextQuestion();
  };

  const decode = (code) => {
    let txt = document.createElement("textarea");
    txt.innerHTML = code;
    return txt.value;
  };

  //Result
  let result = null;
  if (results !== null) {
    console.log(`Result: ${result} !== null`);
    result = results ? (
      <div className="result correct">Correct!</div>
    ) : (
      <div className="result incorrect">
        Incorrect! Answer was {decode(props.question.correct_answer)}
      </div>
    );
  }

  return (
    <div className="Question">
      <div className="questionBar">
        <div className="category">{props.question.category}</div>
        <div className="difficulty">
          Difficulty: {props.question.difficulty}
        </div>
      </div>
      <div className="question">{decode(props.question.question)}</div>
      <div className="answers">
        {answers.map((answer, index) => (
          <div
            className={userAnswer === index ? "answer answerActive" : "answer"}
            key={index}
            data-id={index}
            onClick={selectAnswer}
          >
            {decode(answer)}
          </div>
        ))}
      </div>
      <div className="results">{result}</div>
      {checkDisabled && (
        <Button
          variant="contained"
          color="default"
          disableElevation
          className="submitQuestion"
          onClick={nextQuestion}
        >
          Next Question
        </Button>
      )}
    </div>
  );
};

export default Question;
