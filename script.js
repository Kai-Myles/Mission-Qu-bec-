const questions = [
  {
    type: "choice",
    question: "Qu’est-ce que tu manges pour déjeuner?",
    answers: [
      { text: "Une poutine", correct: false, feedback: "Haha, la poutine, c’est plutôt pour le dîner ou souper!" },
      { text: "Des toasts avec du beurre d’arachide", correct: true, feedback: "Exact! Un bon déjeuner simple." },
      { text: "Un spaghetti", correct: false, feedback: "Spaghetti pour déjeuner? Pas très québécois!" }
    ]
  },
  {
    type: "matching",
    question: "Associe la bonne description : Tu mets ça sur ta tête.",
    answers: [
      { text: "une tuque", correct: true, feedback: "Oui, une tuque garde ta tête bien chaude l’hiver!" },
      { text: "des bottes", correct: false, feedback: "Les bottes, c’est pour les pieds." },
      { text: "un manteau", correct: false, feedback: "Le manteau, c’est pour le corps." }
    ]
  },
  {
    type: "matching",
    question: "Associe la bonne description : Tu mets ça pour marcher dans la neige.",
    answers: [
      { text: "une tuque", correct: false, feedback: "Non, la tuque c’est pour la tête." },
      { text: "des bottes", correct: true, feedback: "Exact! Des bottes bien chaudes." },
      { text: "un manteau", correct: false, feedback: "Le manteau garde le corps au chaud, mais pour marcher, c’est les bottes." }
    ]
  },
  {
    type: "matching",
    question: "Associe la bonne description : Tu mets ça pour avoir chaud.",
    answers: [
      { text: "une tuque", correct: false, feedback: "La tuque garde la tête chaude, mais ce n’est pas suffisant." },
      { text: "des bottes", correct: false, feedback: "Les bottes gardent les pieds au chaud." },
      { text: "un manteau", correct: true, feedback: "Bravo! Le manteau garde le corps au chaud." }
    ]
  },
  {
    type: "choice",
    question: "Je préfère __________ parce que j’aime les nombres.",
    answers: [
      { text: "le français", correct: false, feedback: "C’est une belle matière, mais pas la bonne réponse ici." },
      { text: "les mathématiques", correct: true, feedback: "Bravo, les mathématiques c’est parfait pour les nombres!" },
      { text: "l’histoire", correct: false, feedback: "L’histoire, c’est intéressant, mais pas pour les nombres." }
    ]
  },
  {
    type: "choice",
    question: "Quand quelqu’un dit quelque chose de bizarre, tu dis…",
    answers: [
      { text: "C’est cool.", correct: false, feedback: "Pas tout à fait ce qu’on dit au Québec." },
      { text: "Ben voyons donc!", correct: true, feedback: "Exactement, c’est très québécois comme expression!" },
      { text: "Mon dieu!", correct: false, feedback: "On peut le dire, mais c’est un peu dramatique." }
    ]
  },
  {
    type: "text",
    question: "Complète : Je m’appelle _________. J’ai _________ ans. J’habite à _________.",
    correctAnswers: ["nom", "âge", "ville"],
    feedback: "Super! C’est important de savoir se présenter en français."
  }
];

const questionContainer = document.getElementById("question-container");
const answersContainer = document.getElementById("answers-container");
const nextBtn = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const feedbackContainer = document.getElementById("feedback-container");
const timerContainer = document.getElementById("timer");
const textAnswerInput = document.getElementById("text-answer");
const submitTextBtn = document.getElementById("submit-text-btn");

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 20;
let answered = false;

function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerText = "Suivant";
  scoreContainer.innerText = "";
  feedbackContainer.innerText = "";
  nextBtn.disabled = true;
  textAnswerInput.style.display = "none";
  submitTextBtn.style.display = "none";
  showQuestion();
}

function showQuestion() {
  resetState();
  answered = false;
  timeLeft = 20;
  startTimer();

  let currentQuestion = questions[currentQuestionIndex];
  questionContainer.innerText = currentQuestion.question;

  if (currentQuestion.type === "choice" || currentQuestion.type === "matching") {
    textAnswerInput.style.display = "none";
    submitTextBtn.style.display = "none";

    currentQuestion.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.innerText = answer.text;
      button.classList.add("answer-btn");
      button.addEventListener("click", () => selectAnswer(button, answer.correct, answer.feedback));
      answersContainer.appendChild(button);
    });
  } else if (currentQuestion.type === "text") {
    answersContainer.innerHTML = "";
    textAnswerInput.value = "";
    textAnswerInput.style.display = "block";
    submitTextBtn.style.display = "inline-block";
    submitTextBtn.disabled = true;
    nextBtn.disabled = true;
    feedbackContainer.innerText = "";

    textAnswerInput.addEventListener("input", () => {
      submitTextBtn.disabled = textAnswerInput.value.trim() === "";
    });

    submitTextBtn.onclick = () => {
      checkTextAnswer(textAnswerInput.value.trim());
    };
  }
}

function resetState() {
  clearInterval(timer);
  timerContainer.innerText = timeLeft;
  nextBtn.disabled = true;
  feedbackContainer.innerText = "";
  while (answersContainer.firstChild) {
    answersContainer.removeChild(answersContainer.firstChild);
  }
  textAnswerInput.style.display = "none";
  submitTextBtn.style.display = "none";
}

function selectAnswer(button, correct, feedback) {
  if (answered) return;
  answered = true;
  clearInterval(timer);
  if (correct) {
    button.classList.add("selected", "correct");
    feedbackContainer.innerText = feedback;
    addScore(timeLeft);
  } else {
    button.classList.add("selected", "wrong");
    feedbackContainer.innerText = feedback;
    // Highlight correct answer
    [...answersContainer.children].forEach((btn) => {
      const btnText = btn.innerText;
      let correctAnswer = questions[currentQuestionIndex].answers.find((a) => a.text === btnText && a.correct);
      if (correctAnswer) {
        btn.classList.add("selected", "correct");
      }
    });
  }
  nextBtn.disabled = false;
}

function checkTextAnswer(answer) {
  if (answered) return;
  answered = true;
  clearInterval(timer);
  const currentQuestion = questions[currentQuestionIndex];
  // Accept any non-empty answer for the blanks, just check length here
  const isValid = answer.length > 1; // could be improved with more strict checks
  if (isValid) {
    feedbackContainer.innerText = currentQuestion.feedback;
    addScore(timeLeft);
  } else {
    feedbackContainer.innerText = "Essaie encore, ta réponse est trop courte.";
  }
  nextBtn.disabled = false;
  submitTextBtn.disabled = true;
  textAnswerInput.disabled = true;
}

function addScore(timeBonus) {
  // Score: 1 point + bonus selon le temps restant (max 3 points)
  const points = 1 + Math.floor(timeBonus / 7);
  score += points;
  scoreContainer.innerText = `Points: ${score}`;
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showFinalScore();
  }
});

function startTimer() {
  timerContainer.innerText = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerContainer.innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      if (!answered) {
        feedbackContainer.innerText = "Temps écoulé! Essaie de répondre plus vite.";
        nextBtn.disabled = false;
        answered = true;
      }
    }
  }, 1000);
}

function showFinalScore() {
  resetState();
  questionContainer.innerText = "Félicitations! Tu as fini la mission.";
  feedbackContainer.innerText = "";
  answersContainer.innerHTML = "";
  timerContainer.innerText = "";

  let message = "";

  if (score >= questions.length * 3) {
    message = "Incroyable! Tu es un vrai champion du français québécois! 🎉";
  } else if (score >= questions.length * 2) {
    message = "Super travail! Continue comme ça! 👍";
  } else {
    message = "Bravo d’avoir essayé! Pratique encore pour t'améliorer! 😊";
  }

  scoreContainer.innerText = `Ton score final est : ${score} points.\n${message}`;
  nextBtn.innerText = "Recommencer";
  nextBtn.disabled = false;
  nextBtn.onclick = () => {
    startGame();
    nextBtn.onclick = null;
  };
}

startGame();
