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

function resetGame() {
  //Reset scores (displayed and background)
  playerScore = 0;
  playerDisplayedScore.innerText = "Player: " + playerScore;
  computerScore = 0;
  computerDisplayedScore.innerText = "Computer: " + computerScore;
  
  //Remove the player and computer small images from play area
  if (playerSelect.className !== "") playerSelect.remove();
  if (computerSelect.className !== "") computerSelect.remove();

  //Remove gameMessage, well reset it to Fight!
  gameMessage.remove();
  gameMessage.removeAttribute('style', 'animation-delay: 250ms; color: black; text-decoration: underline; transform: translateY(-240px);');
  gameMessage.id = 'gameMessage';
  gameMessage.style.animationDelay = "1s";
  gameMessage.innerText = 'Fight!';
  messageContainer.appendChild(gameMessage);
  console.log(gameMessage.style.animationDelay);

  //Remove roundWinner
  roundWinner.remove();

  //Restart event listeners
  eventListenerSetup();
}

function gameOver() {
  choices.forEach(choice => {
    choice.removeEventListener('click', play);
    choice.removeEventListener('mouseover', shake);
    if (choice.childNodes[0].className === "shake") choice.childNodes[0].className = "freeze";
  });
}

function updateScore() {
  playerDisplayedScore.innerText = 'Player: ' + playerScore;
  computerDisplayedScore.innerText = 'Computer: ' + computerScore;

  if (playerScore >= 5 || computerScore >= 5) {
    gameOver();
    
    // Initiate transition
    messageContainer.replaceChild(blankNode, gameMessage);
    messageContainer.replaceChild(gameMessage, blankNode);

    roundWinner.remove();
    gameMessage.style.transform = "translateY(-240px)";
    if (playerScore > computerScore) {
      gameMessage.setAttribute('style', 'font-size: 32px; color: green; background-color: white; animation-delay: 1s; transform: translateY(-240px); display: inline-block; padding: 5px 10px; border-radius: 10px;');
      gameMessage.innerText = "You won! :)\n" + playerScore + " - " + computerScore;
      rockTheme.play();
    } else {
      gameMessage.removeAttribute('style')
      gameMessage.setAttribute('style', 'font-size: 32px; color: red; background-color: white; animation-delay: 1s; transform: translateY(-240px); border-radius: 10px; padding: 5px 10px; display: inline-block;');
      gameMessage.innerText = "You lost :(\n" + playerScore + " - " + computerScore;
      rockLose.play();
    }
    
  }
}

function play(e) {
  //Prevent double triggers of event listeners by disabling them temporarily
  choices.forEach(choice => {
    choice.removeEventListener('click', play);
  });

  let playerChoice = e.srcElement.id;
  console.log(playerSelect.className);
  if (playerSelect.className !== "") playerSelect.remove();
  coordX = e.srcElement.getBoundingClientRect().x;
  coordY = e.srcElement.getBoundingClientRect().y;
  
  playerSelect.style.top = coordY;
  playerSelect.style.left = coordX
  //Determine which image will be duplicated to player side
  if (playerChoice === "rock") {
    rockSound.play();
    playerSelect.src = rockImg.src;
    playerSelect.className = "rockPlay";    
  } else if (playerChoice === "scissors") {
    scissorsSound.play();
    playerSelect.src = "images/scissors (copy).png";
    playerSelect.className = "scissorsPlay";
  }else{
    paperSound.play();
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
    computerSelect.src = "images/scissors (copy).png";
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
  gameMessage.style.color = 'black'
  gameMessage.style.textDecoration = "underline";
  gameMessage.innerText = 'Round winner';
  roundWinner.id = "roundWinner";

  playerChoice = playerChoice[0].toUpperCase() + playerChoice.slice(1, playerChoice.length);

  // Initiate transition
  messageContainer.replaceChild(blankNode, gameMessage);
  messageContainer.replaceChild(gameMessage, blankNode);

  // Remove transition for game message if one iteration has passed
  // if (roundWinner.innerText !== "") roundWinner.remove();

  if (roundResult === 'won') {
    playerScore++;
    roundWinner.innerText = '<== Player';
    roundWinner.style.color = 'green';
  } else if (roundResult === 'lost') {
    computerScore++;
    roundWinner.innerText = 'Computer ==>';
    roundWinner.style.color = 'red';
  } else {
    roundWinner.style.color = "black";
    roundWinner.innerText = '<== Tied ==>';
  }
  messageContainer.appendChild(roundWinner);
  
  updateScore();
  
  if (playerScore < 5 && computerScore < 5) {
    //Reset the event listeners after transition completes
    setTimeout(() => {
      choices.forEach(choice => {
        choice.addEventListener('click', play);
      });
    }, 500);
  }
    
    
  
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
  resetBtn.addEventListener('click', resetGame);
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

  messageContainer.id = "messageContainer"
  body.appendChild(messageContainer);
  gameMessage.id = 'gameMessage';
  gameMessage.innerText = 'Fight!';
  messageContainer.appendChild(gameMessage);

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

  setTimeout(() => {
    rockTheme.play();
  }, 1250);

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

  

  //Acount for message heights
  messageContainer.id = "messageContainer"
  body.appendChild(messageContainer);
  gameMessage.id = 'gameMessage';
  gameMessage.innerText = 'Fight!\nFirst to 5 wins';
  messageContainer.appendChild(gameMessage);
  
}

function startGame() {
  
  setTimeout(setupGameLayout, 10000) // set back to 10000
  let temp = startBtn.cloneNode()
  bait.removeChild(startBtn);
  startBtn = temp;
  startBtn.style.animationDelay = "0s";
  startBtn.style.opacity = 1;
  startBtn.style.animationName = "startBtnFadeOut";
  startBtn.innerText = "Start";
  bait.appendChild(startBtn);
  baitPhrase.style.animationName = "baitBounceBack";

  setTimeout(() => { 
    baitPhrase.style.animationName = "bait";
    baitPhrase.innerText = "Thank you!";
    bait.removeChild(startBtn);
    console.log("Animation duration: " + baitPhrase.style.animationDuration);

    setTimeout(() => {
      baitPhrase.style.animationDelay = "0s";
      baitPhrase.style.animationDuration = "2s"; // set to 2s
      baitPhrase.style.opacity = "1";
      baitPhrase.style.animationName = "baitBounceBack";
      console.log("Animation duration: " + baitPhrase.style.animationDuration);

      epicStory.style.animationIterationCount = "1";
      epicStory.style.animationDuration = "2s"; //set to 2s
      epicStory.style.animationName = "storyStartAgain";

      setTimeout(() => {
        epicStory.style.animationDuration = "2s"; // set to 2s
        epicStory.style.animationName = "storyFinish";
        epicStory.innerText = "The worlds finest scientists have deemed\nthe following weapons our best hope.";

        setTimeout(() => {
          epicStory.style.animationDuration = "3s"; // set to 3s
          epicStory.style.animationName = "storyHide";

          setTimeout(() => {
            baitPhrase.style.animationDuration = "1s"; // set to 1s        
            baitPhrase.style.fontWeight = "900";
            baitPhrase.style.lineHeight = "42px";
            baitPhrase.style.fontSize = "42px"
            baitPhrase.style.animationName = "bait";
            baitPhrase.innerText = "The Rock, Paper, Scissors...";
            console.log("Animation duration: " + baitPhrase.style.animationDuration);

            setTimeout(() => {
              baitPhrase.style.animationDuration = "3s"; // set to 3s
              baitPhrase.style.animationDelay = "1.5s";
              baitPhrase.style.animationName = "fadeOut";
              baitPhrase.innerText = "Good luck!";

              console.log("Animation duration: " + baitPhrase.style.animationDuration);
              bait.style.animationName = "baitFadeOut";
              bait.style.animationDelay = "1.5s";
              console.log(bait.style.animationName);
              setTimeout(() => {
                baitPhrase.remove();
              }, 4500); // set to 3000
            }, 5000)//set to 5000
          }, 3000)// set 3000
        }, 2000)// set 2000
      }, 2000)// set to 2000
    }, 700)// set to 700
  }, 700);// set to 700
  
  
  // Initialize new/reset game
  playerScore = 0;
  computerScore = 0;
  endScore.innerText = '';  

  setTimeout(() => {   
    
    choices = document.querySelectorAll('.flex-item');

  }, 10500) // set to 10500
  
  setTimeout(eventListenerSetup, 15000);// set to 15000
  
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
let messageContainer = document.createElement('div');
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
let roundWinner = document.createElement('p');
const rockTheme = new Audio('sounds/theRockTheme.mp3');
const paperSound = new Audio('sounds/paperSound.mp3');
const scissorsSound = new Audio('sounds/scissorsSound.mp3');
const rockSound = new Audio('sounds/rockSound.mp3');
const rockLose = new Audio('sounds/rockLose.mp3');

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
        setTimeout(() => {
          baitPhrase.id = "baitPhrase";        
          baitPhrase.innerText = "Will you save us?";
          bait.appendChild(baitPhrase);
          startBtn.id = "start";
          startBtn.innerText = "Start";
          bait.appendChild(startBtn);
          startBtn.addEventListener('click', startGame, {
            once: true
          });
        }, 1000);  
          
      }, 4000)
    }, 4000)
  }, 4000)
}, 4000)// These were all 4000









