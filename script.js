let colors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userPattern = [];
let gameStarted = false;
let level = 0;
let flag = true;
let userClickedButton;

$(document).keypress(function() {
    if (!gameStarted) {
      gameSequence();
      gameStarted = true;
    }
  });
  
$(".btn").on("click", function(e) {
    userClickedButton= e.target.id;
    userPattern.push(userClickedButton);
    animatePress(userClickedButton);
    gameLogic(userPattern.length-1);
});

function gameLogic(currentLevel) {
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
          playSound(userClickedButton);
        if (userPattern.length === gamePattern.length){  
          setTimeout(function () {
            gameSequence();
          }, 750);
        }
      } else {
        flag = false
        playSound();
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        startOver();
      }
  }

function gameSequence() {
    userPattern = [];
    level++; 
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * colors.length);
    let randomColor = colors[randomNumber];
    gamePattern.push(randomColor);

    let randomBox = "#" + randomColor;
    $(randomBox).fadeOut(100).fadeIn(100);

    playSound(randomColor);
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

function playSound(color) {
   if(flag){
    let audio = new Audio("./sounds/" + color + ".mp3");
    audio.play();
   }else{
    let audio = new Audio("./sounds/wrong.mp3");
    audio.play();
   }
   
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted= false;
    flag=true
  }
