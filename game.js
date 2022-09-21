var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = -1;
var hasStarted = 0;

$(document).click(function() {
	if (hasStarted == 0) {
		nextSequence();
		hasStarted = 1;
	}
});

$("#green").click(function() {
	userClickedPattern.push("green");
	animatePress("green");
	checkAnswer(userClickedPattern.length - 1);
	playSound("green");
});
$("#blue").click(function() {
	userClickedPattern.push("blue");
	animatePress("blue");
	checkAnswer(userClickedPattern.length - 1);
	playSound("blue");
});
$("#yellow").click(function() {
	userClickedPattern.push("yellow");
	animatePress("yellow");
	checkAnswer(userClickedPattern.length - 1);
	playSound("yellow");
});
$("#red").click(function() {
	userClickedPattern.push("red");
	animatePress("red");
	checkAnswer(userClickedPattern.length - 1);
	playSound("red");
});

function checkAnswer(currLevel) {
	// alert("The user has typed " + userClickedPattern[currLevel] + " but the game has " + gamePattern[currLevel]);
	if (userClickedPattern[currLevel] == gamePattern[currLevel]) {
		if (gamePattern.length == currLevel + 1) {
			userClickedPattern = [];
			setTimeout(function() {
				nextSequence();
			}, 500);
		}
	} else {
		var audio = new Audio("sounds/wrong.mp3");
		audio.play();
		$("body").addClass("game-over");
		$("h1").text("Game Over");
		setTimeout(function() {
			$("body").removeClass("game-over");
		}, 1000);
		startOver();
	}

}

function startOver() {
	level = -1;
	userClickedPattern = [];
	gamePattern = [];
	level = -1;
	hasStarted = 0;
	$("h1").text("Press any key to start");
}


function animatePress(chosenColor) {
	$("#" + chosenColor).addClass("pressed");
	setTimeout(function() {
		$("#" + chosenColor).removeClass("pressed");
	}, 180);
}

function playSound(chosenColor) {
	var audio = new Audio("sounds/" + chosenColor + ".mp3");
	audio.play();
}

function nextSequence() {
	var randomnumber = Math.floor(Math.random() * 4);
	var chosenColor = buttonColors[randomnumber];
	gamePattern.push(chosenColor);
	$("#" + chosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
	setTimeout(playSound(chosenColor), 1000);
	level += 1;
	$("h1").text("level " + level);
}
