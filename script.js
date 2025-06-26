// Force Safari to handle touch events better (fix iOS delay)
document.addEventListener('touchstart', function() {}, false);

// QUESTIONS (all 15 per difficulty level)
const questions = {
  facile: [
    { question: "Comment dit-on « cat » en français?", answers: ["chat", "chien", "oiseau"], correct: "chat" },
    { question: "Quel est le mot pour « school »?", answers: ["école", "maison", "parc"], correct: "école" },
    { question: "Quelle couleur est « rouge »?", answers: ["red", "blue", "green"], correct: "red" },
    { question: "Comment dit-on « to eat »?", answers: ["manger", "dormir", "parler"], correct: "manger" },
    { question: "Quel est le contraire de « grand »?", answers: ["petit", "gros", "haut"], correct: "petit" },
    { question: "Comment s’appelle la ville capitale du Québec?", answers: ["Québec", "Montréal", "Toronto"], correct: "Québec" },
    { question: "Quel fruit est jaune?", answers: ["banane", "pomme", "fraise"], correct: "banane" },
    { question: "Quel jour vient après lundi?", answers: ["mardi", "dimanche", "jeudi"], correct: "mardi" },
    { question: "Comment dit-on « winter »?", answers: ["hiver", "été", "printemps"], correct: "hiver" },
    { question: "Que portes-tu sur ta tête en hiver?", answers: ["une tuque", "un chapeau", "un manteau"], correct: "une tuque" },
    { question: "Comment s’appelle le professeur?", answers: ["Le professeur", "L’étudiant", "Le médecin"], correct: "Le professeur" },
    { question: "Quelle expression signifie « hello »?", answers: ["Bonjour", "Merci", "Au revoir"], correct: "Bonjour" },
    { question: "Quel animal fait « meuh »?", answers: ["une vache", "un cheval", "un chien"], correct: "une vache" },
    { question: "Comment dit-on « to speak »?", answers: ["parler", "manger", "courir"], correct: "parler" },
    { question: "Comment s’appelle la boisson québécoise à base de sirop d’érable?", answers: ["la tire", "le thé", "le café"], correct: "la tire" }
  ],

  moyen: [
    { question: "Complète : Je _______ une pomme.", answers: ["mange", "manges", "mangent"], correct: "mange" },
    { question: "Quelle phrase est correcte?", answers: ["J’ai faim", "Je suis faim", "Je avoir faim"], correct: "J’ai faim" },
    { question: "Quel est le pluriel de « chat »?", answers: ["chats", "chattes", "chateaux"], correct: "chats" },
    { question: "Comment conjugue-t-on « aller » au présent, il?", answers: ["il va", "il vais", "il alle"], correct: "il va" },
    { question: "Quel est le mot pour « homework »?", answers: ["les devoirs", "l’école", "la classe"], correct: "les devoirs" },
    { question: "Que signifie « Bonjour, comment ça va? »?", answers: ["Hello, how are you?", "Goodbye, see you later", "Thank you"], correct: "Hello, how are you?" },
    { question: "Complète : Nous _______ au parc.", answers: ["allons", "allez", "vont"], correct: "allons" },
    { question: "Quel est le féminin de « petit »?", answers: ["petite", "petites", "petitte"], correct: "petite" },
    { question: "Comment dit-on « I like hockey »?", answers: ["J’aime le hockey", "Je aime hockey", "Je suis hockey"], correct: "J’aime le hockey" },
    { question: "Quelle phrase signifie « I am cold »?", answers: ["J’ai froid", "Je suis froid", "Je fais froid"], correct: "J’ai froid" },
    { question: "Quel animal est un symbole du Québec?", answers: ["le castor", "le chien", "le chat"], correct: "le castor" },
    { question: "Que porte-t-on aux pieds en hiver?", answers: ["des bottes", "des sandales", "des chaussures"], correct: "des bottes" },
    { question: "Complète : Tu _______ français?", answers: ["parles", "parle", "parlez"], correct: "parles" },
    { question: "Quel est le mot pour « library »?", answers: ["bibliothèque", "librairie", "livre"], correct: "bibliothèque" },
    { question: "Quelle phrase veut dire « See you tomorrow »?", answers: ["À demain", "Au revoir", "Bonjour"], correct: "À demain" }
  ],

  difficile: [
    { question: "Conjugue 'aller' au futur (je).", answers: ["j’irai", "je vais", "j’allerai"], correct: "j’irai" },
    { question: "Complète : Si j’avais le temps, je ______ un gâteau.", answers: ["ferais", "fais", "fait"], correct: "ferais" },
    { question: "Quelle est la bonne forme du verbe 'avoir' au conditionnel (tu)?", answers: ["aurais", "as", "aura"], correct: "aurais" },
    { question: "Quelle phrase est correcte?", answers: ["Il faut que tu viennes", "Il faut que tu vient", "Il faut que tu venir"], correct: "Il faut que tu viennes" },
    { question: "Comment s’appelle le participe passé du verbe 'prendre'?", answers: ["pris", "prendre", "prend"], correct: "pris" },
    { question: "Quelle préposition utilise-t-on avec 'penser'?", answers: ["à", "de", "pour"], correct: "à" },
    { question: "Complète : Bien que tu ______ fatigué, tu continues.", answers: ["sois", "es", "est"], correct: "sois" },
    { question: "Comment forme-t-on le futur proche?", answers: ["aller + infinitif", "avoir + participe", "être + participe"], correct: "aller + infinitif" },
    { question: "Quelle est la traduction de « despite »?", answers: ["malgré", "parce que", "pendant"], correct: "malgré" },
    { question: "Complète : Si j’_______ riche, je voyagerais.", answers: ["étais", "suis", "serai"], correct: "étais" },
    { question: "Quelle est la différence entre 'depuis' et 'pendant'?", answers: ["Depuis = since, Pendant = for", "Depuis = for, Pendant = since", "Les deux signifient since"], correct: "Depuis = since, Pendant = for" },
    { question: "Quelle est la bonne traduction de « they were eating »?", answers: ["ils mangeaient", "ils ont mangé", "ils mange"], correct: "ils mangeaient" },
    { question: "Complète : Il faut que nous _______ à l’heure.", answers: ["soyons", "sommes", "sont"], correct: "soyons" },
    { question: "Que signifie l’expression québécoise « c’est le fun »?", answers: ["It’s fun", "It’s difficult", "It’s boring"], correct: "It’s fun" },
    { question: "Comment s’appelle la fête nationale du Québec?", answers: ["La Saint-Jean-Baptiste", "La fête du Canada", "Noël"], correct: "La Saint-Jean-Baptiste" }
  ]
};

// Global vars
let selectedQuestions = [];
let questionIndex = 0;
let questionCount = 5;
let score = 0;
let timer;
let timeLeft = 20;

// ✅ Page navigation system
window.goToPage = function(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
};

// ✅ Level selection
window.selectLevel = function(amount) {
  questionCount = amount;
  goToPage('difficulty-page');
};

// ✅ Start game
window.startGame = function(difficulty) {
  goToPage('game-page');
  selectedQuestions = [...questions[difficulty]];
  selectedQuestions = shuffleArray(selectedQuestions).slice(0, questionCount);
  questionIndex = 0;
  score = 0;
  document.getElementById("next-btn").style.display = "inline-block";
  showQuestion();
};

// ✅ Show next question (shuffles answer button order)
function showQuestion() {
  clearInterval(timer);
  timeLeft = 20;
  updateTimer();

  const q = selectedQuestions[questionIndex];
  document.getElementById("question-container").innerText = q.question;

  const answersContainer = document.getElementById("answers-container");
  answersContainer.innerHTML = "";

  const shuffledAnswers = shuffleArray([...q.answers]); // ✅ Randomize answer button order

  shuffledAnswers.forEach(ans => {
    const btn = document.createElement("button");
    btn.innerText = ans;
    btn.onclick = () => selectAnswer(btn, ans === q.correct);
    answersContainer.appendChild(btn);
  });

  document.getElementById("next-btn").disabled = true;
  document.getElementById("feedback-container").innerText = "";
  startTimer();
}

// ✅ Answer click
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

// ✅ Timer countdown
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
  timerEl.className = "timer";

  if (timeLeft <= 5) {
    timerEl.classList.add("red");
  } else if (timeLeft <= 10) {
    timerEl.classList.add("yellow");
  } else {
    timerEl.classList.add("green");
  }
}

// ✅ Next button logic
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("next-btn").addEventListener("click", () => {
    questionIndex++;
    if (questionIndex < selectedQuestions.length) {
      showQuestion();
    } else {
      endGame();
    }
  });
});

// ✅ End game
function endGame() {
  document.getElementById("question-container").innerHTML = `<h2>Bravo! 🎉</h2>`;
  document.getElementById("answers-container").innerHTML = `<p>Tu as eu ${score} sur ${selectedQuestions.length} bonnes réponses.</p>`;
  document.getElementById("next-btn").style.display = "none";
  document.getElementById("feedback-container").innerHTML = `<button class="btn" onclick="location.reload()">Rejouer</button>`;
}

// ✅ Shuffle array helper
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}