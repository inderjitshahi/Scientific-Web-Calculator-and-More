'use strict';
//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score0E2 = document.getElementById('score--1');
const current0El = document.getElementById('current--0'); //you used #, big mistake
const current0E2 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');

score0El.textContent = 0;
score0E2.textContent = 0;
diceEl.classList.add('hidden');

let score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active'); //toggle add the class if not present and removes if present.
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    //generating  random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //check for roll 1; if true ,turn playes
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active palyer score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    //2. check if player's score is>=100
    //Finish the game
    if (score[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //3. Swith to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  playing = true;
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score0E2.textContent = 0;
  diceEl.classList.add('hidden');
});
