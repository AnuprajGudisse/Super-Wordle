// frontend/src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000", // Flask backend URL
});

export const startRound = () => api.post("/start_round");
export const getHint = (attempt) => api.post("/get_hint", { attempt });
export const checkGuess = (guess) => api.post("/check_guess", { guess });
