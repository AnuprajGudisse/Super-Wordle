// frontend/src/components/Leaderboard.js
import React from "react";

function Leaderboard({ scores }) {
  return (
    <div>
      <h3>Leaderboard</h3>
      <ul>
        {scores.length === 0 ? (
          <li>No scores yet</li>
        ) : (
          scores
            .sort((a, b) => b.points - a.points) // Sort by score, highest first
            .map((score, index) => (
              <li key={index}>
                {score.name}: {score.points} points
              </li>
            ))
        )}
      </ul>
    </div>
  );
}

export default Leaderboard;
