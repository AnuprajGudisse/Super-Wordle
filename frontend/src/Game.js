// frontend/src/Game.js
import React, { useState, useEffect } from "react";
import { startRound } from "./services/api";
import Round from "./Round";

function Game({ score, setScore, onGameEnd }) {
  const [superheroLength, setSuperheroLength] = useState(0);
  const [universe, setUniverse] = useState("");
  const [round, setRound] = useState(1);
  const maxRounds = 5; // Define the maximum number of rounds

  const newRound = async () => {
    const response = await startRound();
    setSuperheroLength(response.data.superhero_length);
    setUniverse(response.data.universe);
  };

  useEffect(() => {
    if (round <= maxRounds) {
      newRound();
    } else {
      // End the game if max rounds reached
      onGameEnd();
    }
  }, [round]);

  return (
    <div>
      <h2>Round {round} / {maxRounds}</h2>
      <p>Universe: {universe}</p>
      {round <= maxRounds && (
        <Round 
          superheroLength={superheroLength} 
          round={round} 
          setRound={setRound} 
          score={score} 
          setScore={setScore} 
        />
      )}
    </div>
  );
}

export default Game;
