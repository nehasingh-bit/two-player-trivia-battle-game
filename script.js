const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");
const error = document.getElementById("error");

const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const screen3 = document.getElementById("screen3");
const screen4 = document.getElementById("screen4");
const screen5 = document.getElementById("screen5");

const roundText = document.getElementById("roundText");
const category = document.getElementById("category");
const catErr = document.getElementById("catErr");

const info = document.getElementById("info");
const score = document.getElementById("score");
const question = document.getElementById("question");

const result = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");
const nextRoundBtn = document.getElementById("nextRoundBtn");

const finalScore = document.getElementById("finalScore");
const winner = document.getElementById("winner");

let player1 = "", player2 = "";
let score1 = 0, score2 = 0;
let round = 1;
let questions = [];
let qIndex = 0;

// ================= START GAME =================
function startGame() {
  player1 = p1.value.trim();
  player2 = p2.value.trim();
  error.innerText = "";

  if (!player1 || !player2) {
    error.innerText = "Both player names are required";
    return;
  }
  if (player1 === player2) {
    error.innerText = "Player names must be different";
    return;
  }

  screen1.classList.add("hidden");    
  screen2.classList.remove("hidden");
  roundText.innerText = `Round ${round}`;
}

// ================= START ROUND =================
async function startRound() {
  const cat = category.value;
  catErr.innerText = "";

  if (!cat) {
    catErr.innerText = "Please select a category";
    return;
  }

  screen2.classList.add("hidden");
  screen3.classList.remove("hidden");

  try {
    await fetchQuestions(cat);
    removeCategory(cat);
    qIndex = 0;
    showQuestion();
  } catch {
    catErr.innerText = "Failed to load questions. Try again.";
    screen3.classList.add("hidden");
    screen2.classList.remove("hidden");
  }
}

// ================= FETCH QUESTIONS =================
async function fetchQuestions(cat) {
  const [easy, medium, hard] = await Promise.all([
    fetch(`https://the-trivia-api.com/v2/questions?categories=${cat}&difficulties=easy&limit=2`),
    fetch(`https://the-trivia-api.com/v2/questions?categories=${cat}&difficulties=medium&limit=2`),
    fetch(`https://the-trivia-api.com/v2/questions?categories=${cat}&difficulties=hard&limit=2`)
  ]);

  const easyQ = await easy.json();
  const medQ = await medium.json();
  const hardQ = await hard.json();
  console.log(easyQ)
  console.log(medQ)
  console.log(hardQ)

  if (easyQ.length < 2 || medQ.length < 2 || hardQ.length < 2) {
    throw new Error(" unble to fetch questions try another category");
  }

  questions = [
    easyQ[0], easyQ[1],
    medQ[0], medQ[1],
    hardQ[0], hardQ[1]
  ];
  console.log(questions)
}

// ================= SHOW QUESTION =================
function showQuestion() {
  const q = questions[qIndex];
  const turn = qIndex % 2 === 0 ? player1 : player2;
  

  info.innerText = `Round ${round} | ${q.category} | ${q.difficulty} | ${turn}'s turn`;
  score.innerText = `${player1}: ${score1} | ${player2}: ${score2}`;
  question.innerText = q.question.text;

  const options = [q.correctAnswer, ...q.incorrectAnswers]
    .sort(() => Math.random() - 0.5);

  options.forEach((opt, i) => {
    document.getElementById(`opt${i}`).innerText = opt;
  });

  clearRadio();
  result.innerText = "";
  nextBtn.disabled = true;
}

// ================= HANDLE ANSWER SELECTION =================
function handleAnswerSelection() {
  const selected = document.querySelector("input[name='answer']:checked");
  if (!selected) return;

  const q = questions[qIndex];
  const selectedText = document.getElementById(`opt${selected.value}`).innerText;

  if (selectedText === q.correctAnswer) {
    const points =
      q.difficulty === "easy" ? 10 :
      q.difficulty === "medium" ? 15 : 20;

    qIndex % 2 === 0 ? score1 += points : score2 += points;
    result.innerText = `Correct Answer`;
    result.className = "correct";
  } else {
    result.innerText = `Wrong Answer`;
    result.className = "wrong";
  }

  disableRadio();
  nextBtn.disabled = false;
}

// ================= NEXT QUESTION =================
function nextQ() {
  qIndex++;

  if (qIndex < 6) {
    showQuestion();
  } else {
    screen3.classList.add("hidden");
    screen4.classList.remove("hidden");

    if (category.options.length <= 1) {
      nextRoundBtn.disabled = true;
    }
  }
}

// ================= NEXT ROUND =================
function nextRound() {
  round++;
  screen4.classList.add("hidden");
  screen2.classList.remove("hidden");
  roundText.innerText = `Round ${round}`;
}

// ================= END GAME =================
function endGame() {
  screen4.classList.add("hidden");
  screen5.classList.remove("hidden");

  finalScore.innerText = `${player1}: ${score1} | ${player2}: ${score2}`;
  winner.innerText =
    score1 > score2 ? `${player1} Wins`
    : score2 > score1 ? `${player2} Wins`
    : "Match Draw";
}

// ================= HELPERS =================
function clearRadio() {
  document.querySelectorAll("input[name='answer']").forEach(r => {
    r.checked = false;
    r.disabled = false;
  });
}

function disableRadio() {
  document.querySelectorAll("input[name='answer']").forEach(r => r.disabled = true);
}

function removeCategory(cat) {
  for (let opt of category.options) {
    if (opt.value === cat) {
      opt.remove();
      break;
    }
  }
}

// ================= RADIO EVENTS =================
document.querySelectorAll("input[name='answer']").forEach(radio => {
  radio.addEventListener("change", handleAnswerSelection);
});
