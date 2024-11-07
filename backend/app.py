from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import json
import google.generativeai as gemini
import config

app = Flask(__name__)
CORS(app)

# Initialize Gemini API client
gemini.configure(api_key=config.GEMINI_API_KEY)

# Load superhero data from JSON file
with open("superheroes.json") as f:
    superhero_data = json.load(f)

# Endpoint to start a new round with a random superhero selection
@app.route("/start_round", methods=["POST"])
def start_round():
    superhero = random.choice(superhero_data["superheroes"])
    # Store the selected superhero's name and universe for the round
    app.config["current_superhero"] = superhero["name"]
    return jsonify({
        "superhero_length": len(superhero["name"]),
        "universe": superhero["universe"]
    })

# Endpoint to get a hint after incorrect guesses
@app.route("/get_hint", methods=["POST"])
def get_hint():
    data = request.get_json()
    attempt = data["attempt"]
    superhero_name = app.config.get("current_superhero")

    # Define prompt based on the attempt number to progressively reveal information
    if attempt == 1:
        prompt = f"Give a short, vague description of the powers of {superhero_name} without revealing the name."
    elif attempt == 2:
        prompt = f"Describe the appearance of {superhero_name} in one sentence, without mentioning the name."
    elif attempt == 3:
        prompt = f"What is the main team or group affiliation of {superhero_name}?"
    elif attempt == 4:
        prompt = f"Give a famous line or catchphrase associated with {superhero_name}, if they have one."
    elif attempt == 5:
        prompt = f"Reveal the first letter of the superhero's name {superhero_name}."

    # Generate the hint using the specific method for text generation
    try:
        response = gemini.generate_text(
            model="models/text-bison-001",  # Confirm model name in the API docs
            prompt=prompt,
            max_output_tokens=20  # Limit response length to save on tokens
        )
        hint = response.candidates[0]['output'] if response.candidates else "No hint available."
        return jsonify({"hint": hint})
    except AttributeError as e:
        return jsonify({"error": str(e)}), 500

# Endpoint to validate user guess
@app.route("/check_guess", methods=["POST"])
def check_guess():
    data = request.get_json()
    guess = data["guess"]
    superhero = app.config.get("current_superhero")

    # Check if the guessed name matches the current superhero
    is_correct = guess.strip().lower() == superhero.lower()
    return jsonify({"correct": is_correct})

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)