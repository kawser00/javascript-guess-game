(function () {
  let randomNumber = Math.floor(Math.random() * 100) + 1;
  const wrapperElem = document.querySelector("#wrapper");
  const inputField = document.querySelector("#guessField");
  const form = document.querySelector("form");
  const guessList = document.querySelector(".guesses");
  const guessRemaining = document.querySelector(".lastResult");
  const displayMsg = document.querySelector(".resultParas");

  let guessNum = 5;
  guessRemaining.textContent = guessNum;

  const checkGuess = (guess) => {
    if (guess === randomNumber) {
      displayMessage(`You guessed correctly!`);
    } else if (guess < randomNumber) {
      displayMessage(`Too low! Try again!`);
    } else if (guess > randomNumber) {
      displayMessage(`Too High! Try again!`); 
    }

    disappearMsg();
  };

  const displayMessage = (msg) => {
    if (!document.querySelector(".lowOrHi")) {
      displayMsg.insertAdjacentHTML(
        "beforeend",
        `<p class="lowOrHi fs-2 fw-bold"></p>`
      );
    }
    document.querySelector(".lowOrHi").textContent = `${msg}`;
  };

  const disappearMsg = () => {
    setTimeout(() => {
      if (document.querySelector(".lowOrHi")) {
        document.querySelector(".lowOrHi").remove();
      }
    }, 2000);
  };

  const displayGuess = (guess) => {
    guessList.textContent += guess + " ";
    inputField.value = "";
    let count = guessRemaining.textContent;
    guessRemaining.textContent = count - 1;

    displayGameOver(count);
  };

  const displayGameOver = (count) => {
    if (count == 1) {
      form.style.display = "none";
      displayMsg.style.display = "none";

      wrapperElem.insertAdjacentHTML(
        "beforeend",
        `<div class="startGame">
          <img src="images/game-over.gif" alt="game over" class="img-fluid w-100">
          <button 
            style="width: 300px; height: auto;" 
            class="btn btn-danger fs-2 btn-lg py-2 startBtn mt-3"
          >
            Start New Game
          </button>
        </div>`
      );

      document.querySelector(".startBtn").addEventListener("click", startGame);
    }
  };

  const startGame = () => {
    document.querySelector("form").style.display = "block";
    displayMsg.style.display = "block";
    guessRemaining.textContent = guessNum;
    guessList.textContent = " ";
    document.querySelector(".startGame").remove();
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let guess = +inputField.value;

    if (guess == "" || isNaN(guess) || guess > 100) {
      alert("Please enter a valid number");
    } else {
      checkGuess(guess);
      displayGuess(guess);
    }
  });
})();
