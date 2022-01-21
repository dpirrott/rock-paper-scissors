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

function gameOver() {

  choices.forEach(choice => {
    choice.removeEventListener('click', play);
  });

  
  endScore.innerText = playerScore + " - " + computerScore;
  endScore.id = "endScore";

  let scoreContainer = document.querySelector('#score-container');
  body.insertBefore(endScore, scoreContainer);

}


function updateScore() {
  playerDisplayedScore.innerText = 'Player: ' + playerScore;
  computerDisplayedScore.innerText = 'Computer: ' + computerScore;

  if (playerScore === 5 || computerScore === 5) {
    // Initiate transition
    messageContainer.replaceChild(blankNode, gameMessage);
    messageContainer.replaceChild(gameMessage, blankNode);

    if (playerScore > computerScore) {
      gameMessage.setAttribute('style', 'font-size: 32px; color: green;');
      gameMessage.innerText = "You won! :)";
      endScore.style.color = 'green';
    } else {
      gameMessage.setAttribute('style', 'font-size: 32px; color: red;');
      gameMessage.innerText = "You lost :(";
      endScore.style.color = 'red';
    }

    gameOver();
  }

}

function play(e) {
  let playerChoice = e.srcElement.id;
  let computerChoice = computerPlay();
  let roundResult = playRound(playerChoice, computerChoice);
  gameMessage.removeAttribute('id');
  gameMessage.id = "gameMessage";

  // Initiate transition
  messageContainer.replaceChild(blankNode, gameMessage);
  messageContainer.replaceChild(gameMessage, blankNode);

  if (roundResult === 'won') {
    playerScore++;
    gameMessage.style.color = 'green';
    gameMessage.innerText = 'You won this round! :)';
  } else if (roundResult === 'lost') {
    computerScore++;
    gameMessage.style.color = 'red';
    gameMessage.innerText = 'You lost this round! :(';
  } else {
    gameMessage.style.color = 'tan';
    gameMessage.innerText = 'You tied this round! :(';
  }

  updateScore();
  //
  //
}

function startGame() {
  console.log("let the games begin");

  // Initialize new/reset game
  playerScore = 0;
  computerScore = 0;
  endScore.innerText = '';
  playerDisplayedScore.innerText = 'Player: ' + playerScore;
  computerDisplayedScore.innerText = 'Computer: ' + computerScore;
  
  gameMessage.id = 'gameMessage';
  gameMessage.style.color = 'black';
  gameMessage.style.fontSize = '18px';
  gameMessage.innerText = 'Let the games begin!';

  messageContainer.appendChild(gameMessage);
  messageContainer.style.marginTop = "15px";

  console.log("Offset X: " + gameMessage.offsetLeft);
  console.log("Offset Y: " + gameMessage.offsetTop);
  
  choices.forEach(choice => {
    choice.addEventListener('click', play);
  });

}

let gameMessage = document.createElement('p');
let playerScore;
let computerScore;
let choices = document.querySelectorAll('.flex-item');
let body = document.querySelector('body');
let blankNode = document.createElement('p');
let messageContainer = document.querySelector('#messageContainer');
let playerDisplayedScore = document.querySelector('#playerScore');
let computerDisplayedScore = document.querySelector('#computerScore');
let endScore = document.createElement('h2');
let resetBtn = document.querySelector('#reset');
let test = document.querySelector('#start');

test.addEventListener('click', startGame, {
  once: true
});

resetBtn.addEventListener('click', startGame);



