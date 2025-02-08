const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const vowelsBtn = document.getElementById('vowelsBtn');
const numbersBtn = document.getElementById('numbersBtn');
const gameBoard = document.getElementById('gameBoard');
const timerDisplay = document.getElementById('timer');
const resetBtn = document.getElementById('resetBtn');
const backToStartBtn = document.getElementById('backToStartBtn');
const vowels = ['A', 'E', 'I', 'O', 'U']; // Vocales
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']; // Números del 0 al 9
let cards = []; // Cartas en el tablero
let flippedCards = [];
let matchedCards = [];
let time = 0;
let timerInterval;
let mode = ''; // Modo actual (vocales o números)

// Función para barajar las cartas (Fisher-Yates shuffle)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Crear el tablero según el modo seleccionado
function createBoard(mode) {
  gameBoard.innerHTML = '';
  let selectedItems = mode === 'vocales' ? vowels : numbers;
  cards = [...selectedItems, ...selectedItems]; // Duplicar los elementos para formar pares
  shuffleArray(cards); // Barajar las cartas

  // Ajustar el tamaño del tablero según el modo
  const gridSize = mode === 'vocales' ? 4 : 5; // 4x4 para vocales, 5x4 para números
  gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 80px)`;

  cards.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.value = card;
    cardElement.dataset.index = index;

    // Crear el frente y el reverso de la carta
    const front = document.createElement('div');
    front.classList.add('front');
    front.textContent = card;

    const back = document.createElement('div');
    back.classList.add('back');

    cardElement.appendChild(front);
    cardElement.appendChild(back);

    cardElement.addEventListener('click', flipCard);
    gameBoard.appendChild(cardElement);
  });
}

// Voltear una carta
function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 500);
    }
  }
}

// Verificar si las cartas coinciden
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.value === card2.dataset.value) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards.push(card1, card2);

    if (matchedCards.length === cards.length) {
      clearInterval(timerInterval);
      resetBtn.classList.remove('hidden');
      backToStartBtn.classList.remove('hidden');
      alert(`¡Felicidades! Completaste el juego en ${formatTime(time)}.`);
    }
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
  }

  flippedCards = [];
}

// Reiniciar el juego
resetBtn.addEventListener('click', function () {
  resetGame();
});

// Volver al inicio
backToStartBtn.addEventListener('click', function () {
  resetGame();
  gameScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
});

function resetGame() {
  flippedCards = [];
  matchedCards = [];
  time = 0;
  timerDisplay.textContent = '00:00';
  resetBtn.classList.add('hidden');
  backToStartBtn.classList.add('hidden');
  clearInterval(timerInterval); // Detener el temporizador actual
  startTimer(); // Reiniciar el temporizador
  createBoard(mode); // Crear un nuevo tablero con el modo actual
}

// Formatear el tiempo (mm:ss)
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Iniciar el temporizador
function startTimer() {
  timerInterval = setInterval(() => {
    time++;
    timerDisplay.textContent = formatTime(time);
  }, 1000);
}

// Iniciar el juego según el modo seleccionado
vowelsBtn.addEventListener('click', function () {
  mode = 'vocales';
  startGame();
});

numbersBtn.addEventListener('click', function () {
  mode = 'números';
  startGame();
});

function startGame() {
  startScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  createBoard(mode);
  startTimer();
}