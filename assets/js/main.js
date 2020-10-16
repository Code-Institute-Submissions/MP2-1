const cards = document.querySelectorAll('.game-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;

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
    
    isMatch ? disableCards() : unflipCards();
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


//Flips the cards on click//
cards.forEach(card => card.addEventListener('click', flipCard));

class AudioController {
    constructor(){
        this.bgMusic = new Audio('assets/audio/music.mp3');
        this.clickSound = new Audio('assets/audio/Click1.mp3')
        this.bgMusic.volume = 0.3;
        this.bgMusic.loop = true;
        this.bgMusic.autoplay = false;
        this.victorySound = new Audio('assets/audio/Victory1.wav');
        this.gameOverSound = new Audio('assets/audio/GameOver.wav');
    }

    startMusic() {
        this.bgMusic.play();
    }

    stopMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }

    flip() {
        this.clickSound.play();
    }

    victory() {
        this.stopMusic();
        this.victorySound.play();
    }

    gameOver() {
        this.stopMusic();
        this.gameOverSound.play();
    }

    on() {
        document.getElementById('on').addEventListener('click', () => {
            this.bgMusic.play();
        }); 
    }

    off() {
        document.getElementById('off').addEventListener('click', () => {
            this.bgMusic.pause();
        });
    }
}

class Display {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('flips');
        this.audioController = new AudioController();
    }
    
    startGame() {
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.busy = true;
        setTimeout(() =>{
            this.audioController.startMusic();
            this.countDown = this.startCountDown();
            this.busy = false;
        }, 500);
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }

    flipCard() {
        this.audioController.flip();
        this.totalClicks++;
        this.ticker.innerText = this.totalClicks;
    }

    startCountDown() {
         return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }

    gameOver() {
        clearInterval(this.countDown);
        this.audioController.gameOver();
        document.getElementById('game-over-text').classList.add('visible');
    }

    victory() {
        clearInterval(this.countDown);
        this.audioController.victory();
        document.getElementById('victory-text').classList.add('visible');
    }
}

function ready(){
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let game = new Display(100, cards);
    let reload = document.getElementById('game-over-text', 'victory-text')

//Start, Win and Game Over Overlay text//   
    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });

//Add one move on click//
    cards.forEach(card =>{
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });

//Reset Board after Win or Game Over//
    reload.addEventListener('click', () => {
        location.reload();
    });
}

//Toggle game instructions//
$(document).ready(function(){
  $(".instruction").click(function(){
    $("#instruction").collapse('toggle');
    });
});


if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}