'use strict';

// selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
// OR can use getElementById('score--1)
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// Initial conditions
let currentScore, scores, currentPlayer, gameRunning;
const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  currentScore = 0;
  currentPlayer = 0;
  scores = [0, 0];
  gameRunning = true;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  if (!gameRunning) gameRunning = true;
  current0El.textContent = 0;
  current1El.textContent = 0;
};

init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${currentPlayer}`).textContent =
    currentScore;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//  Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (gameRunning) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Displaying the dice
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    // 3.Check for rolled 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (gameRunning) {
    // 1. Keep track of score and update on screen
    scores[currentPlayer] += currentScore;
    document.getElementById(`score--${currentPlayer}`).textContent =
      scores[currentPlayer];
    diceEl.classList.add('hidden');

    // 2. Check if score >=100
    if (scores[currentPlayer] >= 100) {
      gameRunning = false;
      document.getElementById(`score--${currentPlayer}`).textContent =
        scores[currentPlayer];
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
