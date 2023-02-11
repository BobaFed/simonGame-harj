let buttonColours = ["red", "blue", "green", "yellow"]; // created colors
let gamePattern = []; //created empty list for patterns
let userClickedPattern = [];
var myLevel = 0;
var gameOn = false;


$(document).on("keydown", function() {
    if (!gameOn){
        $("#level-title").text("Level " + myLevel);
        nextSequence();
        gameOn = true;
    }
});


$(".btn").on("click", function() { // on mouse click we call sound and animation
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour); // add to list which we can compare later
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    userClickedPattern = [];
    // generates random number between 0 - 3
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColours[randomNumber]; // choose random color from list
    gamePattern.push(randomChosenColor); // add new random color in the empty list
    myLevel ++;
    
    $("#level-title").text("Level " + myLevel);
    $("#" + randomChosenColor).fadeToggle(50).fadeToggle(50);
    playSound(randomChosenColor);
};

function playSound(name) { // takes chosen color and plays sound
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

function animatePress(currentColor){ // we take current color ID and add animation
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    },100);
};

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("succes");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {nextSequence()}, 1000);
      }
    } else {
        let audio3 = new Audio("sounds/wrong.mp3");
        audio3.play();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },150);

        $("h1").text("Game Over, press any key to restart");
        startOver();
    }
};

function startOver() {
    gamePattern = [];
    myLevel = 0;
    gameOn = false;
}





