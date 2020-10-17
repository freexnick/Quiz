import React from 'react';

const Scoreboard = (props) => {

    return (
        <div className="Scoreboard">
            <div className="round">Round: {props.round + 1}/{props.numQuestions}</div>
            <div className="points">Points: {props.points}</div>
        </div>
    )
}

export default Scoreboard