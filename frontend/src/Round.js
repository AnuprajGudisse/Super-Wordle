// frontend/src/Round.js
import React, { useState } from "react";
import { getHint, checkGuess } from "./services/api";

function Round({ superheroLength, round, setRound, score, setScore }) {
  const [attempts, setAttempts] = useState(5);
  const [guess, setGuess] = useState("");
  const [hints, setHints] = useState([]);
  const [message, setMessage] = useState("");

  const handleGuess = async () => {
    if (attempts > 0) {
      const response = await checkGuess(guess);
      if (response.data.correct) {
        setMessage("Correct!");
        setScore(score + attempts);  // Award points based on attempts left
        setRound(round + 1);         // Proceed to next round
      } else {
        setAttempts(attempts - 1);
        const hintResponse = await getHint(5 - attempts);
        setHints([...hints, hintResponse.data.hint]);
        setMessage("Incorrect. Try again!");
      }
    } else {
      setMessage(`Out of attempts! Moving to the next round.`);
      setRound(round + 1);
    }
  };

  return (
    <div>
      <p>{`Guess the superhero: ${"_ ".repeat(superheroLength)}`}</p>
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Enter your guess"
      />
      <button onClick={handleGuess}>Submit Guess</button>
      <p>{message}</p>
      <ul>
        {hints.map((hint, index) => (
          <li key={index}>{`Hint ${index + 1}: ${hint}`}</li>
        ))}
      </ul>
      <p>Attempts left: {attempts}</p>
      <p>Score: {score}</p>
    </div>
  );
}

export default Round;
