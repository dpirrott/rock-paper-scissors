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
  console.log(playerSelect.className);
  if (playerSelect.className !== "") playerSelect.remove();
  coordX = e.srcElement.getBoundingClientRect().x;
  coordY = e.srcElement.getBoundingClientRect().y;
  
  playerSelect.style.top = coordY;
  playerSelect.style.left = coordX
  //Determine which image will be duplicated to player side
  if (playerChoice === "rock") {
    playerSelect.src = rockImg.src;
    playerSelect.className = "rockPlay";    
  } else if (playerChoice === "scissors") {
    playerSelect.src = "images/scissors (copy).png";
    playerSelect.className = "scissorsPlay";
  }else{
    playerSelect.src = paperImg.src;
    playerSelect.className = "paperPlay";
  }
  e.srcElement.parentNode.appendChild(playerSelect);
  
  // Now computers choice img will be duplicated to its play area
  let computerChoice = computerPlay();
  let computerChoiceLower = computerChoice.toLowerCase();
  let choiceImg = document.getElementById(computerChoiceLower);
  coordX = choiceImg.getBoundingClientRect().x;
  coordX = choiceImg.getBoundingClientRect().y;

  if (computerSelect.className !== "") computerSelect.remove();
  computerSelect.style.left = coordX;
  computerSelect.style.top = coordY;
  computerSelect.className = "rockPlay";
  if (computerChoiceLower === "rock") {
    computerSelect.src = rockImg.src;
    computerSelect.style.animationName = "rockComputer";
  } else if (computerChoiceLower === "scissors") {
    computerSelect.src = scissorsImg.src;
    computerSelect.style.animationName = "scissorsComputer";
  } else {
    computerSelect.src = paperImg.src;
    computerSelect.style.animationName = "paperComputer";
  }
  choiceImg.parentNode.appendChild(computerSelect);

  let roundResult = playRound(playerChoice, computerChoice);
  gameMessage.removeAttribute('id');
  gameMessage.id = "gameMessage";
  gameMessage.style.animationDelay = "0s";

  playerChoice = playerChoice[0].toUpperCase() + playerChoice.slice(1, playerChoice.length);

  // Initiate transition
  messageContainer.replaceChild(blankNode, gameMessage);
  messageContainer.replaceChild(gameMessage, blankNode);

  if (roundResult === 'won') {

    playerScore++;
    gameMessage.style.color = 'green';
    gameMessage.innerText = 'You chose ' + playerChoice + ", computer chose " + computerChoice + ', You won this round! :)';

  } else if (roundResult === 'lost') {
    computerScore++;
    gameMessage.style.color = 'red';
    gameMessage.innerText = 'You lost this round! :(';
  } else {
    gameMessage.style.color = 'tan';
    gameMessage.innerText = 'You tied this round! :(';
  }

  updateScore();

}

function shake(e) {
  if (e.target.id !== ""){
    let choiceID = e.target.id;
    let choice = document.getElementById(choiceID);
    choice.classList = "shake";
  }
}

function freeze(e) {
  let choiceClass = e.target.childNodes[0].className;
  let choice = document.querySelector("." + choiceClass);
  choice.classList = "freeze";
}

function eventListenerSetup() { 
  choices.forEach(choice => {
    choice.addEventListener('click', play);
    choice.addEventListener('mouseover', shake);
    choice.addEventListener('mouseleave', freeze);
  });
  resetBtn.addEventListener('click', startGame);
}

function setupGameLayout() {

  // Transition bait element to top
  // bait.setAttribute('style', 'animation-name:baitBounceBack; animation-timing-function:ease-out; animation-duration: 2s; animation-delay: 0s;')
  
  // Create all the container elements for game interface
  let flexContainer = document.createElement('div');
  let flexBoxGame = document.createElement('div');
  let flexRock = document.createElement('div');
  let flexPaper = document.createElement('div');
  let flexScissors = document.createElement('div');
  

  // Create scoreboard
  scoreContainer = document.createElement('div');
  let scores = document.createElement('div');
  playerDisplayedScore = document.createElement('h4');
  computerDisplayedScore = document.createElement('h4');
  resetBtn = document.createElement('button');

  // Flex container setup
  flexContainer.id = "flex-container";
  body.insertBefore(flexContainer, messageContainer);

  // Flex-box-game setup
  flexBoxGame.id = "flex-box-game";
  flexContainer.appendChild(flexBoxGame);

  // Rock paper scissors setup
  flexRock.classList = "flex-item";
  flexPaper.classList = "flex-item";
  flexScissors.classList = "flex-item";
  flexBoxGame.appendChild(flexRock);
  flexBoxGame.appendChild(flexPaper);
  flexBoxGame.appendChild(flexScissors);
  rockImg.id = "rock";
  rockImg.classList = "rock";
  rockImg.src = "images/the_rock.jpg";
  paperImg.id = "paper";
  paperImg.classList = "paper";
  paperImg.src = "images/paper.jpg";
  scissorsImg.id = "scissors";  
  scissorsImg.classList = "scissors";
  scissorsImg.src = "images/scissors.png"
  flexRock.appendChild(rockImg);
  flexPaper.appendChild(paperImg);
  flexScissors.appendChild(scissorsImg);

  // Scoreboard setup
  scoreContainer.id = "score-container";
  body.appendChild(scoreContainer);
  scores.id = "scores";
  scoreContainer.appendChild(scores);
  resetBtn.id = 'reset';
  resetBtn.innerText = "Reset";
  scoreContainer.appendChild(resetBtn);
  playerDisplayedScore.id = "playerScore";
  playerDisplayedScore.innerText = "Player: 0";
  computerDisplayedScore.id = "computerScore";
  computerDisplayedScore.innerText = "Computer: 0";
  scores.appendChild(playerDisplayedScore);
  scores.appendChild(computerDisplayedScore);

}

function startGame() {
  
  setTimeout(setupGameLayout, 1000) // set back to 10000
  let temp = startBtn.cloneNode()
  bait.removeChild(startBtn);
  startBtn = temp;
  startBtn.style.animationDelay = "0s";
  startBtn.style.opacity = 1;
  startBtn.style.animationName = "startBtnFadeOut";
  startBtn.innerText = "Start";
  bait.appendChild(startBtn);

  setTimeout(() => { 
    baitPhrase.innerText = "Thank you!";
    bait.removeChild(startBtn);
    setTimeout(() => {
      baitPhrase.style.animationDelay = "0s";
      baitPhrase.style.animationDuration = "2s";
      baitPhrase.style.opacity = "1";
      baitPhrase.style.animationName = "baitBounceBack";

      epicStory.style.animationIterationCount = "1";
      epicStory.style.animationDuration = "2s";
      epicStory.style.animationName = "storyStartAgain";

      setTimeout(() => {
        epicStory.innerText = "The worlds finest scientists have deemed\nthe following weapons our best hope.";
        epicStory.style.animationDuration = "2s";
        epicStory.style.animationName = "storyFinish";
        setTimeout(() => {
          epicStory.style.animationDuration = "3s";
          epicStory.style.animationName = "storyHide";
          setTimeout(() => {
            baitPhrase.style.animationName = "bait";
            baitPhrase.style.animationDuration = "1.5s";
            baitPhrase.style.fontWeight = "900";
            baitPhrase.style.lineHeight = "42px";
            baitPhrase.style.fontSize = "42px"
            baitPhrase.innerText = "The Rock, Paper, Scissors...";

          }, 400)// set 3000
        }, 400) // set 2000
      }, 400)// set to 2000
    }, 700)
  }, 300);
  
  
  // Initialize new/reset game
  playerScore = 0;
  computerScore = 0;
  endScore.innerText = '';  

  setTimeout(() => {
    gameMessage.id = 'gameMessage';
    gameMessage.innerText = 'Fight!';
    messageContainer.appendChild(gameMessage);
    messageContainer.style.marginTop = "15px";
    choices = document.querySelectorAll('.flex-item');
  }, 1500)
  
  setTimeout(eventListenerSetup, 2000);
  
}

let gameMessage = document.createElement('p');
let playerScore;
let computerScore;
let choices;
let coordX;
let coordY;
let rockImg = document.createElement('img');
let paperImg = document.createElement('img');
let scissorsImg = document.createElement('img');
let body = document.querySelector('body');
let blankNode = document.createElement('p');
let messageContainer = document.querySelector('#messageContainer');
let playerDisplayedScore;
let computerDisplayedScore;
let scoreContainer;
let resetBtn;
let endScore = document.createElement('h2');
let startBtn = document.createElement('button');
let bait = document.getElementById('bait');
let baitPhrase = document.createElement('p');
let epicStory = document.querySelector('.epicStory');
let playerSelect = document.createElement('img');
let computerSelect = document.createElement('img');

setTimeout(() => {
  epicStory.style.animationDelay = 0;
  epicStory.innerText = "Will Smith showed us...";
  setTimeout(() => {
    epicStory.innerText = "It has finally happened...";
    setTimeout(() => {
      epicStory.innerText = "Powerful AI robots have taken control of the world";
      setTimeout(() => {
        epicStory.style.animationName = "storyFinish";
        epicStory.style.animationDuration = "2s";
        epicStory.style.animationIterationCount = 1;
        epicStory.innerText = "We need a hero now";
        baitPhrase.id = "baitPhrase";        
        baitPhrase.innerText = "Will you save us?";
        bait.appendChild(baitPhrase);
        startBtn.id = "start";
        startBtn.innerText = "Start";
        bait.appendChild(startBtn);

        startBtn.addEventListener('click', startGame, {
          once: true
        });
      }, 100)
    }, 100)
  }, 100)
}, 100)// These were all 4000









