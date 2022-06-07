// player makes a selection via the dom
//  computer makes a selection after a delay
//  compute() figures out who the winner is
// score() updates the score after each round and displays it










let score = 0;
let options = document.getElementsByClassName('option');
let playerMove = document.getElementById('player-move');
let main = document.getElementsByTagName('main');
let move = document.getElementById('move');
let computerMove = document.getElementById('computer-move');
let resultDisplay = document.getElementById('result');
let winCount = document.getElementById('winCount');
let rulesButton = document.getElementById('rules');
let rulesDetails = document.getElementById('rulesDetails');
// winner object

const winsAgainst = {
    rock : ["lizard", "scissors"],
    paper : ["rock", "spock"],
    scissors : ["paper", "lizard"],
    lizard : ["spock", "paper"],
    spock : ["scissors", "rock"],
    }; 


// MAIN

let computerChoice;

for (let i = 0; i < options.length; i++) {
    options[i].addEventListener('click', () => {
        // assign playerSelection variable a value and declare computerChoice

        let playerSelection = options[i].classList[2];
        

        //  update image source in "#move"
        playerMove.setAttribute('src', `./images/icon-${playerSelection}.svg`);
        playerMove.parentElement.classList.add(`${playerSelection}`);

        // hide main and show rule
        main[0].style.display = 'none';
        move.style.display = "flex";

        // make computer play a move after some delay and update the img src in "right" accordingly
        setTimeout(() => {
           computerChoice =  computerPlay();
           computerMove.setAttribute('src', `./images/icon-${computerChoice}.svg`);
           computerMove.parentElement.classList.add(`${computerChoice}`);
           
        //    Evaluate winner  & unhide "winner"

            let result = evaluateWinner(playerSelection, computerChoice);
            resultDisplay.style.display = 'flex';
            
            switch (result) {
                case "won":
                    resultDisplay.children[0].innerText = "YOU WON";
                    score++;
                    break;
                
                case "lost":
                    resultDisplay.children[0].innerText = "YOU LOST";
                    break;
                
                case "tie":
                    resultDisplay.children[0].innerText = "ROUND TIED";    
                
            }

            // increase score
            winCount.innerText = score;


           
        }, 2000);


    })
}

// reset for the next round
resultDisplay.children[1].addEventListener('click', () => {
    main[0].style.display = 'flex';
    move.style.display = "none";
    resultDisplay.style.display = 'none';
    // reset computerChoice else it shows the previous choice during setTimeout
    computerMove.setAttribute('src', ``);
    computerMove.parentElement.classList.remove(`${computerChoice}`);
})


// hide and show rules

rulesButton.children[0].addEventListener('click', () => {
    rulesDetails.style.visibility = "visible";
})

rulesDetails.children[0].children[1].addEventListener('click', () => {
    rulesDetails.style.visibility = "hidden";
})


function computerPlay () {
    let random = Math.floor(Math.random()* (4 - 0 + 1) + 0);
    let computerSelection;
    
   switch (random) {
       case 0:
           computerSelection = "rock";
           break;

        case 1:
            computerSelection = "paper"
            break;
        case 2:
            computerSelection = "scissors"
            break;
        case 3:
            computerSelection = "spock"
            break;
        case 4:
            computerSelection = "lizard"
            break;                     
   }
    
   return computerSelection;
   
}

function evaluateWinner (player, computer) {

    let result;

    if ( player == computer) {
        result = "tie";
        return result;
    }

    else {
        for (let i = 0; i < 2; i++) {
            if (winsAgainst[`${player}`][i] == `${computer}`){
                result = "won";
                break;
            }
            else {
                result = "lost";      
            }
        }

        return result;
    }

   

}