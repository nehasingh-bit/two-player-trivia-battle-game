
Two-Player Trivia Battle Game

## Requirements
- Two players with unique names
- Category-based trivia rounds
- 6 questions per round (2 Easy, 2 Medium, 2 Hard)
- Turn-based gameplay
- Difficulty-based scoring system
- Final winner or draw declaration

---

## Technologies Used
- HTML
- CSS (basic styling)
- JavaScript (Vanilla JS)
- The Trivia API

---

## About the API
This project uses **The Trivia API** to fetch trivia questions dynamically based on the selected category and difficulty level.

API Documentation:  
https://the-trivia-api.com/docs/v2/

---

## Features Implemented
- Two-player setup with name validation
- Category selection with used-category restriction
- Dynamic question fetching from API
- Shuffled multiple-choice options
- Immediate score update after each answer
- Round summary and final result screen

---

## Application Flow
1. Players enter their names
2. A category is selected for the round
3. Questions are fetched from the API
4. Players answer questions alternately
5. Scores are updated based on difficulty
6. Players continue to the next round or end the game
7. Final scores and winner are displayed



## Notes
- UI is intentionally simple
- Focus is on JavaScript logic and game flow
- Game state is maintained without page reloads



## Possible Enhancements
- Add timer-based questions
- Improve UI/UX design
- Add sound effects and animations
- Store high scores using local storage
- Add single-player mode



