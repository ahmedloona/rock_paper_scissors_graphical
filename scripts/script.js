setupGame();

function setupGame() {
  round = 0;
  playerScore = 0;
  computerScore = 0;
  gameWinner = "";
  weapons = "";
  toggleResume("hidden");
  startListening();
}

function startListening(){
  weapons = document.querySelectorAll('.weapon');
  for(let i = 0; i < weapons.length; i++) {
    weapons[i].addEventListener('click', play);
    weapons[i].addEventListener('transitionend', removeAnimation);
  }
}

function stopListening() {
  for(let i = 0; i < weapons.length; i++) {
    weapons[i].removeEventListener('click', play);
  }
}

function startListeningForNextGame() {
  const button = document.getElementsByTagName('button')[0];
  button.addEventListener('click', setupGame);
}

function toggleResume(setting) {
  let resume = document.getElementById('continue');
  console.log(resume);
  resume.style.visibility = setting;
}

function updateDisplay(player, comp, winner) {
  let playerScreen = document.getElementById('player');
  playerScreen.textContent = player;
  let compScreen = document.getElementById('computer');
  compScreen.textContent = comp;
  let winnerScreen = document.getElementById('winner');
  winnerScreen.textContent = winner;
  let gameScreen = document.getElementById('gameWinner');
  gameScreen.textContent = `player: ${playerScore} comp: ${computerScore}`;
}

function play(e) {
   //Add animation first
   const weapon = document.getElementsByClassName(e.srcElement.className);
   const audio = document.getElementById(e.srcElement.className);
   weapon[0].classList.add('playing');
   audio.currentTime = 0;
   audio.play();

   //find user selection and computer selection
   const selection = weapon[0].className.split(" ")[1];
   const compSelection = computerPlay();
   //find roundWinner
   let winner = roundWinner(selection, compSelection);
   updateScore(winner);
   updateDisplay(selection, compSelection, winner);
   console.log(`Round: ${round}
                You selected: ${selection}
                Computer selected: ${compSelection}
                ${winner} Score: You ${playerScore} Comp ${computerScore}`);

   if ((computerScore == 5) || (playerScore == 5)) {
      stopListening();
      toggleResume('visible');
      let message = document.getElementById("message");
      if(computerScore == 5) {
        message.textContent = "You Lost!";
      } else {
        message.textContent = "You Won!";
      }
      startListeningForNextGame();
   }
}

function removeAnimation(e) {
   if (e.propertyName !== "transform") {
     return;
   }
   this.classList.remove('playing');
}

function roundWinner(playerSelection, computerSelection) {
    let result = "";
    selections = `${playerSelection} ${computerSelection}`
    switch(selections) {
      case "rock rock":
        result = "Tie! Both selected Rock!";
      break;
      case "rock paper":
        result = "You Lose! Paper beats Rock!";
      break;
      case "rock scissors":
        result = "You Win! Rock beats Scissors!";
      break;
      case "paper rock":
        result = "You Win! Paper beats Rock!";
      break;
      case "paper paper":
        result = "Tie! Both selected paper!";
      break;
      case "paper scissors":
        result = "You Lose! Scissors beats Paper!";
      break;
      case "scissors rock":
        result = "You Lose! Rock beats Scissors!";
      break;
      case "scissors paper":
        result = "You Win! Scissors beats Paper!";
      break;
      case "scissors scissors":
        result = "Tie! Both selected Scissors!";
      break;
    }
    return result;
  }

  function updateScore(result){
    round += 1;
    switch(true) {
      case result.includes("You Win"):
        playerScore++;
      break;
      case result.includes("You Lose"):
        computerScore++;
      break;
    }
  }

  function computerPlay() {
    const moves = ['rock', 'paper', 'scissors'];
    let randomNum = Math.floor(Math.random() * moves.length);
    return moves[randomNum];
  }
