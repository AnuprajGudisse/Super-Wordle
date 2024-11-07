// frontend/src/App.js
import React, { useState } from "react";
import Game from "./Game";
import Leaderboard from "./components/Leaderboard";

function App() {
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);

  // Function to update leaderboard after game ends
  const updateLeaderboard = (newScore) => {
    const playerName = prompt("Enter your name for the leaderboard:");
    setLeaderboard((prevLeaderboard) => [
      ...prevLeaderboard,
      { name: playerName, points: newScore },
    ]);
  };

  // Reset score and update leaderboard after game ends
  const handleGameEnd = () => {
    updateLeaderboard(score);
    setScore(0); // Reset score for a new game if desired
  };

  return (
    <div className="App">
      <h1>Superhero Wordle Game</h1>
      <Game score={score} setScore={setScore} onGameEnd={handleGameEnd} />
      <Leaderboard scores={leaderboard} />
    </div>
  );
}

export default App;
