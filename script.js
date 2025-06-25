// Force Safari to handle touch events better (fix iOS delay)
document.addEventListener('touchstart', function() {}, false);

// QUESTIONS (15 per difficulty)
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
    { question: "Que signifie « Bonjour, comment ça va? »?", answers: ["Hello, how are you?", "
