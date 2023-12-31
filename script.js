const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endGameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

//List of words for game
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "warlike",
  "ambigious",
  "impeccable",
  "dependent",
  "fancy",
  "superficial",
  "drag",
  "feeble",
  "index",
  "soulmate",
  "eight",
  "quince",
  "royalty",
  "integeration",
  "inaguration",
  "computer",
  "calculator",
  "forest",
];

//Init word
let randomWord;

//Init score
let score = 0;

//Init time
let time = 10;

//Init difficulty and set it to value in ls or medium
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

//Set difficulty select value
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

//Focus on text from the start
text.focus();

//Start countdown
const timeInterval = setInterval(updateTime, 1000);

//Generate random word from the array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

//Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

addWordToDOM();

//Game over, show end screen
function gameOver() {
  endGameEl.innerHTML = `<h1>Time ran out</h1>
  <p>Your final score is ${score}</p>
  <button onClick='location.reload()'>Play again</button>`;

  endGameEl.style.display = "flex";
}

//Update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

//Update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    //End the game
    gameOver();
  }
}

//Event listeners

//Typing
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();
    //Clear the input
    e.target.value = "";

    if (difficulty === "easy") {
      time += 5;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 2;
    }
    updateTime();
  }
});

//Settings btn click
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

//Settings selection
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
