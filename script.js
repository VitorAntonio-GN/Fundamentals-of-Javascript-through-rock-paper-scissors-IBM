let winMsg = 'Victory';
let loseMsg = 'Crushing Defeat';
let tieMsg = 'Tie';

let moveList =['Rock','Paper','Scissors'];

let statusDisplay = document.querySelector('#status-head');
let moveDisplays = document.querySelectorAll('.move-display h2');
let buttons = document.querySelectorAll('button');

function startGame() {
    /*start display*/
    statusDisplay.textContent = 'Choose!';

    /*for each button, inserr an option*/
    for(let i = 0; i < buttons.length; i++) {
    buttons[i].textContent = moveList[i];
    buttons[i].style.display = "inline-block";
    buttons[i].addEventListener("click", endGame);
    }

    /*for each h2 display, hide display*/
    for(let i = 0; i < moveDisplays.length; i++)
    {
        moveDisplays.style.display = "none";
    }
}

function randomMove() {
    /*generates an random number between 0 and 2*/
    return Math.floor(Math.random() * 3);
}

function calcResult(move1, move2) {
    /* possible values: (player1 is move1)
    rock - scissor = 0 - 2 = (-2) + 3 = 1 -> "result + 3 == 1" (win)
    paper - rock = 1 - 0 = 1    -> "result == 1" (win)
    scissor - paper = 2 - 1 = 1 | */

    /*calculates the difference*/
    const result = move1 - move2;

    /*verifications of possibilities*/
    if(result == 1 || result + 3 == 1) {
        return winMsg;
    }
    else if (move1 == move2) {  /*this if isn't in the original code, it's an optimization*/
        return tieMsg;          /* original: else if (result == 2 || result + 3 == 2) */
    }
    else {
        return loseMsg;
    }
}

function endGame(event) {
    let playerMove = moveList.indexOf(event.target.textContent);
    let computerMove = randomMove();

    statusDisplay.textContent = calcResult(playerMove, computerMove);

    moveDisplays.forEach(
    (moveDisplay) => (moveDisplay.style.display = "inline-block")
    );

    moveDisplays[0].textContent = `You played ${moveList[playerMove]}`;
    moveDisplays[1].textContent = `Computer played ${moveList[computerMove]}`;

    buttons.forEach((button, index) => {
        if (index == 1) {
            button.textContent = "Play Again";
            button.removeEventListener("click", endGame);
            button.addEventListener("click", startGame);
        } else {
            button.style.display = "none";
        }
    });
}

startGame();