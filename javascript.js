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

  let playerScore = 0;
  let computerScore = 0;

  for (let i = 0; i < 5; i++) {

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

function playerChoice(e) {
  console.log(e.srcElement.id);
}

function startGame() {
  console.log("let the games begin");

  let choices = document.querySelectorAll('.flex-item');

  choices.forEach(choice => {
    choice.addEventListener('click', playerChoice);
  });

}

const test = document.querySelector('#start');
console.log(test);

test.addEventListener('click', startGame);

