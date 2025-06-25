// Page navigation
function goToPage(pageId) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

// Game logic
let questions = {
  facile: [
    { question: "Comment dit-on 'apple' en français?", answers: ["pomme", "poire", "orange"], correct: "pomme" },
    { question: "Quelle est la capitale du Québec?", answers: ["Québec", "Montréal", "Toronto"], correct: "Québec" }
  ],
  moyen: [
    { question: "Complète : Je ______ une pomme.", answers: ["mange", "mangent", "manges"], correct: "mange" },
    { question: "Quelle phrase est correcte ?", answers: ["J’ai faim", "Je suis faim", "Je avoir faim"], correct: "J’ai faim" }
  ],
  difficile: [
    { question: "Conjugue 'aller' au futur (je)", answers: ["j’irai", "je vais", "j’allerai"], correct: "j’irai" },
    { question: "Complète : Si j’avais le temps, je ______ un gâteau.", answers: ["ferais", "fais", "fait"], correct: "ferais" }
  ]
};

let selectedQuestions = [];
let questionIndex = 0;
let questionCount = 5;
let score = 0;
let timer;
let timeLeft = 20;

function selectLevel(amount) {
  questionCount = amount;
  goToPage('difficulty-page');
}

function startGame(difficulty) {
  goToPage('game-page');
  selectedQuestions = [...questions[difficulty]];
  selectedQuestions = selectedQuestions.sort(() => Math.random() - 0.5).slice(0, questionCount);
  questionIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  clearInterval(timer);
  timeLeft = 20;
  updateTimer();

  const q = selectedQuestions[questionIndex];
  document.getElementById("question-container").innerText = q.question;

  const answersContainer = document.getElementById("answers-container");
  answersContainer.innerHTML = "";
  q.answers.forEach(ans => {
    const btn = document.createElement("button");
    btn.innerText = ans;
    btn.onclick = () => selectAnswer(btn, ans === q.correct);
    answersContainer.appendChild(btn);
  });

  document.getElementById("next-btn").disabled = true;
  document.getElementById("feedback-container").innerText = "";
  startTimer();
}

function selectAnswer(button, isCorrect) {
  clearInterval(timer);
  const buttons = document.querySelectorAll("#answers-container button");
  buttons.forEach(btn => btn.disabled = true);

  if (isCorrect) {
    button.style.backgroundColor = "#2ecc71";
    document.getElementById("feedback-container").innerText = "Bonne réponse!";
    score++;
  } else {
    button.style.backgroundColor = "#e74c3c";
    document.getElementById("feedback-container").innerText = "Oups! Mauvaise réponse.";
  }

  document.getElementById("next-btn").disabled = false;
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timer);
      document.getElementById("feedback-container").innerText = "Temps écoulé!";
      document.querySelectorAll("#answers-container button").forEach(btn => btn.disabled = true);
      document.getElementById("next-btn").disabled = false;
    }
  }, 1000);
}

function updateTimer() {
  const timerEl = document.getElementById("timer");
  timerEl.innerText = timeLeft;
  timerEl.className = "";

  if (timeLeft <= 5) {
    timerEl.classList.add("red");
  } else if (timeLeft <= 10) {
    timerEl.classList.add("yellow");
  } else {
    timerEl.classList.add("green");
  }
}

document.getElementById("next-btn").addEventListener("click", () => {
  questionIndex++;
  if (questionIndex < selectedQuestions.length) {
    showQuestion();
  } else {
    endGame();
  }
});

function endGame() {
  document.getElementById("question-container").innerHTML = `<h2>Bravo! 🎉</h2>`;
  document.getElementById("answers-container").innerHTML = `<p>Tu as eu ${score} sur ${selectedQuestions.length} bonnes réponses.</p>`;
  document.getElementById("next-btn").style.display = "none";
  document.getElementById("feedback-container").innerHTML = `<button class="btn" onclick="location.reload()">Rejouer</button>`;
}
