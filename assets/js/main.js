//Background music//
function playBackgroundMusic() {
        let bgMusic = new Audio('assets/audio/music.mp3');
            bgMusic.play();
            bgMusic.volume = 0.3;
            bgMusic.loop = true;
            
//Buttons 'off' and 'on' music//
        $('#on').click(function () {
            $(bgMusic).each(function () {
                $(bgMusic).prop('muted', false);
            });
            $('#off').removeClass("audio-status")
            $(this).addClass("audio-status")
        });
        $('#off').click(function () {
            $(bgMusic).each(function () {
                $(bgMusic).prop('muted', true);
            });
            $('#on').removeClass("audio-status")
            $(this).addClass("audio-status")
        });
    }


const cards = document.querySelectorAll('.game-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;
let matchCounter = 0;

//Matching cards//
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

//If cards match they will stay on board and not flip back//
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

//Match card will stay disabled//
function disableCards() {
   firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    
    resetBoard();
}

//Unmatch card will flip back//
function  unflipCards() {
    lockBoard = true;

setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
    }, 800); 

    addFlips();
}

//Reset board//
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//shuffle cards//
(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 24);
        card.style.order = randomPos;
    });  
})();

//Count time to zero//
const timer = document.querySelector("#time-remaining");
let Timer,
    totalSeconds = 100;

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

//Add moves on game board//
const moves = document.querySelector("#flips");
let flips = 0;
moves.innerHTML = 0;
function addFlips() {
    flips++;
    moves.innerHTML = flips;
}

let victorySound = new Audio('assets/audio/Victory1.wav');
let gameOverSound = new Audio('assets/audio/GameOver.wav');

function gameOver() {
    stopTimer();
    document.getElementById('game-over-text').classList.add('visible');
    gameOverSound.addEventListener(gameOverSound.play());
};

function victory() {
    stopTimer();
    document.getElementById('victory-text').classList.add('visible');
    victorySound.add(victorySound.play());
};

//Reset board after Win or Game Over//
$('#game-over-text, #victory-text').click(function () {
        location.reload();
    });
// Toggle How to Play on Home Page//
$(document).ready(function(){
  $(".instruction").click(function(){
    $("#instruction").add('visible').collapse('toggle');    
    });
});

//Flips cards on click//
cards.forEach(card => card.addEventListener('click', flipCard));

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    
//Start, Win and Game Over Overlay text//   
    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            startCountDown();
            playBackgroundMusic();
        });
    });
};

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}  