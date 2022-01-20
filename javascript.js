function computerPlay() {
  let choice = Math.floor(Math.random() * 3);

  switch(choice){
    
    case 0:
      return "Rock";

    case 1:
      return "Paper";

    case 2:
      return "Scissors";

    default:
      return "You fucked up"
  }
}

function playRound(playerSelection, computerSelection) {

  if (playerSelection.toLowerCase() === "rock" && computerSelection === "Paper") {
    playerSelection = playerSelection[0].toUpperCase() + playerSelection.slice(1, playerSelection.length);
    return "lost";
  } else if (playerSelection.toLowerCase() === "rock" && computerSelection === "Scissors") {
    playerSelection = playerSelection[0].toUpperCase() + playerSelection.slice(1, playerSelection.length);
    return "won";
  } else if (playerSelection.toLowerCase() === "rock" && computerSelection === "Rock") {
    playerSelection = playerSelection[0].toUpperCase() + playerSelection.slice(1, playerSelection.length);
    return "tied";
  } else if (playerSelection.toLowerCase() === "scissors" && computerSelection === "Paper") {
    playerSelection = playerSelection[0].toUpperCase() + playerSelection.slice(1, playerSelection.length);
    return "won";
  } else if (playerSelection.toLowerCase() === "scissors" && computerSelection === "Scissors") {
    playerSelection = playerSelection[0].toUpperCase() + playerSelection.slice(1, playerSelection.length);
    return "tied";
  } else if (playerSelection.toLowerCase() === "scissors" && computerSelection === "Rock") {
    playerSelection = playerSelection[0].toUpperCase() + playerSelection.slice(1, playerSelection.length);
    return "lost";
  } else if (playerSelection.toLowerCase() === "paper" && computerSelection === "Rock") {
    playerSelection = playerSelection[0].toUpperCase() + playerSelection.slice(1, playerSelection.length);
    return "won";
  } else if (playerSelection.toLowerCase() === "paper" && computerSelection === "Paper") {
    playerSelection = playerSelection[0].toUpperCase() + playerSelection.slice(1, playerSelection.length);
    return "tied";
  } else if (playerSelection.toLowerCase() === "paper" && computerSelection === "Scissors") {
    playerSelection = playerSelection[0].toUpperCase() + playerSelection.slice(1, playerSelection.length);
    return "lost";
  }

}

function game() {

  while (playerScore < 5 && computerScore < 5) {

    let playerSelection = prompt("Type Rock, Paper or Scissors: ");
    let computerSelection = computerPlay();

    let result = playRound(playerSelection, computerSelection);
    if (result === "won") {
      playerScore++;
    } else if (result === "lost") {
      computerScore++;
    }

    console.log("You " + result + " this round.");
  }

  if (playerScore > computerScore) {
    console.log("You are the winner! Score " + playerScore + " - " + computerScore);
  } else if (playerScore === computerScore) {
    console.log("You tied the computer! Score " + playerScore + " - " + computerScore);
  } else {
    console.log("The computer wins... Score " + playerScore + " - " + computerScore);
  }

}


//game();

function updateScore() {
  const playerDisplayedScore = document.querySelector('#playerScore');
  const computerDisplayedScore = document.querySelector('#computerScore');
  playerDisplayedScore.innerText = 'Player: ' + playerScore;
  computerDisplayedScore.innerText = 'Computer: ' + computerScore;
}

function play(e) {
  let playerChoice = e.srcElement.id;
  let computerChoice = computerPlay();
  let roundResult = playRound(playerChoice, computerChoice);
  console.log(roundResult);
  if (roundResult === 'won') {
    playerScore++;
    gameMessage.style.color = 'green';
    gameMessage.innerText = 'You won this round! :)';
  } else if (roundResult === 'lost') {
    computerScore++;
    gameMessage.style.color = 'red';
    gameMessage.innerText = 'You lost this round! :(';
    // Add message saying you lost this round
  } else {
    //Add message saying you tied
    gameMessage.style.color = 'tan';
    gameMessage.innerText = 'You lost this round! :(';
  }

  updateScore();
  //
  //
}

function startGame() {
  console.log("let the games begin");

  // Initialize new game
  playerScore = 0;
  computerScore = 0;
  gameMessage = document.createElement('p');
  let gameMessageSibling = document.querySelector('#score-container');
  let body = document.querySelector('body');
  gameMessage.innerText = 'Let the games begin!';
  gameMessage.style.color = 'white';
  gameMessage.id = 'gameMessage';
  
  body.insertBefore(gameMessage, gameMessageSibling);

  let choices = document.querySelectorAll('.flex-item');

  choices.forEach(choice => {
    choice.addEventListener('click', play);
  });



}

let gameMessage;
let playerScore;
let computerScore;

const test = document.querySelector('#start');

test.addEventListener('click', startGame);

