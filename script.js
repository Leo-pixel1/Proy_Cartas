// Elementos del DOM
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const winScreen = document.getElementById("winScreen");
const loseScreen = document.getElementById("loseScreen");
const startBtn = document.getElementById("startBtn");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const continueBtn = document.getElementById("continueBtn");
const tryAgainBtn = document.getElementById("tryAgainBtn");
const backToStartBtn = document.getElementById("backToStartBtn");
const backToStartBtn2 = document.getElementById("backToStartBtn2");

// Variables del juego
let correctAnswer;

// Función para generar una suma aleatoria
function generateQuestion() {
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  correctAnswer = num1 + num2;

  // Mostrar la pregunta
  questionElement.textContent = `${num1} + ${num2} = ?`;

  // Generar opciones
  const options = [correctAnswer];
  while (options.length < 4) {
    const randomOption = Math.floor(Math.random() * 19); // Números hasta 18 (9+9)
    if (!options.includes(randomOption)) {
      options.push(randomOption);
    }
  }

  // Mezclar opciones
  options.sort(() => Math.random() - 0.5);

  // Mostrar opciones
  optionsElement.innerHTML = options
    .map(
      (option) =>
        `<button onclick="checkAnswer(${option})">${option}</button>`
    )
    .join("");
}

// Función para verificar la respuesta
function checkAnswer(selectedAnswer) {
  if (selectedAnswer === correctAnswer) {
    gameScreen.classList.add("hidden");
    winScreen.classList.remove("hidden");
  } else {
    gameScreen.classList.add("hidden");
    loseScreen.classList.remove("hidden");
  }
}

// Función para reiniciar el juego
function resetGame() {
  winScreen.classList.add("hidden");
  loseScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  generateQuestion();
}

// Eventos
startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  generateQuestion();
});

continueBtn.addEventListener("click", resetGame);
tryAgainBtn.addEventListener("click", resetGame);
backToStartBtn.addEventListener("click", () => {
  winScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
});
backToStartBtn2.addEventListener("click", () => {
  loseScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
});
