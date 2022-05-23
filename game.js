var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;

var level = 0;
var score = 0;
$("#level-title").text("Press Any Key To Start");
$("h2").text("Score: " + score);

$(document).keypress(function() {
    if (started === false) {
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
    }
})

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id"); 
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor, 0.25);
    animatePress(userChosenColor);

    // only check the answer if the game has been started
    if (started === true) {
        checkAnswer(userClickedPattern.length - 1);
    }
});

function nextSequence() {

    userClickedPattern = [];

    // random # between 0 and 3
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // update text
    level++;
    $("#level-title").text("Level " + level);

    // flash effect
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor, 0.25);
}

function playSound(name, volume) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.volume = volume;
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    // check if the answer (last item in the arrays) is correct
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        
        // update score
        score++;
        $("h2").text("Score: " + score);

        // check if player finished their sequence. If so, add another sound to the sequence
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);         
        }

    } else {  // lose
        playSound("wrong", 0.15);

        // change layout for a brief period of time
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver() {
    level = 0;
    score = 0;
    started = false;
    gamePattern = [];
}

