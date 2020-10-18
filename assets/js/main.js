const cards = document.querySelectorAll('.game-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;
let matchCounter = 0;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');

    if(!hasFlippedCard) {
    //First click
    hasFlippedCard = true;
    firstCard = this;

    return;
}
    //Second click
    secondCard = this;
    
    checkForMatch();
}

function checkForMatch(){
let isMatch = firstCard.dataset.card === secondCard.dataset.card;
    
    if(isMatch){
    matchCounter += 1;
   disableCards();
     if(matchCounter==(cards.length/2)){
          victory();
      }
   }
   else {unflipCards(); }

}

function disableCards() {
   firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    
    resetBoard();
}

function  unflipCards() {
    lockBoard = true;

setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
    }, 800); 

    addFlips();
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 24);
        card.style.order = randomPos;
    });  
})();

const timer = document.querySelector("#time-remaining");
let Timer,
    totalSeconds = 5;

function startCountDown() {
    Timer = setInterval(() => {
        totalSeconds--;
        timer.innerHTML = totalSeconds;
        if(totalSeconds === 0)
        gameOver();
    }, 1000);
};

function stopTimer() {
    clearInterval(Timer);
}

const moves = document.querySelector("#flips");
let flips = 0;
moves.innerHTML = 0;
function addFlips() {
    flips++;
    moves.innerHTML = flips;
}

function gameOver() {
    stopTimer();
    document.getElementById('game-over-text').classList.add('visible');
};

function victory() {
    stopTimer();
    document.getElementById('victory-text').classList.add('visible');
};

//Flips cards on click//
cards.forEach(card => card.addEventListener('click', flipCard));

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));

//Start, Win and Game Over Overlay text//   
    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            startCountDown();
        });
    });
};

//Toggle game instructions//
$(document).ready(function() {
  $(".instruction").click(function() {
    $("#instruction").collapse('toggle');
    });
});


if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}  