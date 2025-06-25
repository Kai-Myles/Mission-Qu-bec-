let allQuestions = {
  facile: [
    {
      question: "Quelle est la capitale du Québec?",
      answers: ["Montréal", "Québec", "Ottawa"],
      correct: "Québec"
    },
    {
      question: "Comment dit-on 'dog' en français?",
      answers: ["chat", "chien", "oiseau"],
      correct: "chien"
    }
  ],
  moyen: [
    {
      question: "Complète : Je _______ une pomme.",
      answers: ["mange", "manges", "mangent"],
      correct: "mange"
    },
    {
      question: "Quelle phrase est correcte?",
      answers: ["Je suis faim", "J'ai faim", "Je faim"],
      correct: "J'ai faim"
    }
  ],
  difficile: [
    {
      question: "Quelle est la bonne conjugaison du verbe 'aller' au futur (je)?",
      answers: ["je vais", "j'irai", "j'allerai"],
      correct: "j'irai"
    },
    {
      question: "Complète : Si j'avais le temps, je _______ un gâteau.",
      answers: ["ferais", "fais", "fait"],
      correct: "ferais"
    }
  ]
};

let selectedQuestions = [];
let questionIndex = 0;
let score = 0;
let timer;
let timeLeft = 20;

function startGameSetup() {
  document.getElementById("home-screen").classList.add("hidden");
  document.getElementById("level-screen").classList.remove("hidden");
}

let questionCount = 5;

function selectLevelAmount(amount) {
  questionCount = amount;
  document.getElementById("level-screen").classList.add("hidden");
  document.getElementById("difficulty-screen").classList.remove("hidden");
}

function startGame(difficulty) {
  // Mix and take X questions from the selected difficulty
  selectedQuestions = [...allQuestions[difficulty]];
  selectedQuestions = selectedQuestions.sort(() => Math.random() - 0.5).slice(0, questionCount);
  document.getElementById("difficulty-screen").classList.add("hidden");
  document.getElementById("game-container").classList.remove("hidden");
  questionIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  clearInterval(timer);
  timeLeft = 20;
  updateTimerDisplay();

  let q = selectedQuestions[questionIndex];
  document.getElementById("question-container").innerText = q.question;

  const answersContainer = document.getElementById("answers-container");
  answersContainer.innerHTML = "";

  q.answers.forEach((answer) => {
    let btn = document.createElement("button");
    btn.innerText = answer;
    btn.classList.add("answer-btn");
    btn.onclick = () => selectAnswer(btn, answer === q.correct);
    answersContainer.appendChild(btn);
  });

  document.getElementById("next-btn").disabled = true;
  document.getElementById("feedback-container").innerText = "";
  startTimer();
}

function selectAnswer(button, correct) {
  clearInterval(timer);
  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach(btn => btn.disabled = true);

  if (correct) {
    button.style.backgroundColor = "#2ecc71";
    document.getElementById("feedback-container").innerText = "Bonne réponse! 🎉";
    score++;
  } else {
    button.style.backgroundColor = "#e74c3c";
    document.getElementById("feedback-container").innerText = "Oups! Mauvaise réponse.";
  }

  document.getElementById("next-btn").disabled = false;
}

function startTimer() {
  updateTimerDisplay();
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timer);
      document.getElementById("feedback-container").innerText = "Temps écoulé!";
      document.querySelectorAll(".answer-btn").forEach(btn => btn.disabled = true);
      document.getElementById("next-btn").disabled = false;
    }
  }, 1000);
}

function updateTimerDisplay() {
  const timerEl = document.getElementById("timer");
  timerEl.innerText = timeLeft;
  timerEl.className = ""; // reset

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
    showFinalScore();
  }
});

function showFinalScore() {
  document.getElementById("game-container").innerHTML = `
    <h2>Mission terminée! 🎉</h2>
    <p>Tu as eu <strong>${score}</strong> sur <strong>${selectedQuestions.length}</strong> bonnes réponses.</p>
    <button class="btn" onclick="location.reload()">Rejouer</button>
  `;
}
