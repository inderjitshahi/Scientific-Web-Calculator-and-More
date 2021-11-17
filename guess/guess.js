"use strict";

// console.log(document.querySelector('.message').textContent);
// document.querySelector('.message').textContent='correct Number';

let secretNumber = Math.ceil(Math.random() * 30); //genrtating random numbers between 1-20;

let score = 30; //not accessing from DOM as data generally made part of code;
let highScore = 0;
// document.querySelector(".number").textContent = secretNumber;

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess, typeof guess);
  if (!guess) {
    document.querySelector(".message").textContent = "No Number Entered!";
  }
  //player wins
  else if (guess === secretNumber) {
    if (score > 0) {
      document.querySelector(".message").textContent = "🎉 Correct Number";
      //manupulating CSS with Js
      document.querySelector("body").style.backgroundColor = "rgb(42, 250, 42)";
      document.querySelector(".number").style.width = "30rem";
      document.querySelector(".number").textContent = secretNumber;
      if (score > highScore) {
        highScore = score;
        document.querySelector(".highscore").textContent = highScore;
      }
    } else {
      document.querySelector(".message").textContent = "😥 You Loose the game";
    }
  }
  //code refractoring
  //guess is diffrent from secret number
  else if (guess !== secretNumber) {
    if (score > 0) {
      document.querySelector(".message").textContent =
        guess > secretNumber ? "Too High" : "Too Low";
      score -= 1;
      document.querySelector(".score").textContent = score;
    } else {
      document.querySelector(".message").textContent = "😥 You Loose the game";
    }
  }

 
});

//Resetting values

document.querySelector(".again").addEventListener("click", function () {
  secretNumber = Math.ceil(Math.random() * 30);
  document.querySelector(".message").textContent = "Start guessing...";
  score = 30;
  document.querySelector(".score").textContent = score;
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
});

