let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let userChooseColorIndex = 0;

//event listener

//menu event
$("#start-button").on("click", () => {
  showGame();
  gameStart();
});

//back-button event
$("#back-btn").on("click", () => {
  showMenu();
});

function clickedHandler(event) {
  //using event
  let userChooseColor = event.target.id;
  //using this
  // let userChooseColor = $(this).attr("id");
  playAudio(userChooseColor);
  userClickedPattern.push(userChooseColor);
  userChooseColorIndex++;
  checkColor(userChooseColor);
}
//user clicked button event
$(".btn").off("click");
$(".btn").on("click", clickedHandler);

//add pressed animation event
for (let color of buttonColors) {
  let selectedButtonId = "#" + color;
  buttonPressedFunction(selectedButtonId);
}

function buttonPressedFunction(selectedButtonId) {
  //for mouse
  $(selectedButtonId).off("mousedown");
  $(selectedButtonId).on("mousedown", function () {
    //function(){} can use this
    $(this).addClass("pressed");
    $(document).one("mouseup", () => {
      $(selectedButtonId).removeClass("pressed");
    });
  });
  //for device
  $(selectedButtonId).off("touchstart");
  $(selectedButtonId).on("touchstart", function () {
    $(this).addClass("pressed");
    $(document).one("touchend", () => {
      $(selectedButtonId).removeClass("pressed");
    });
  });
}

//show game
function showGame() {
  $("#level-title").text("Press A Key to Start");
  $(".game-container").slideDown();
  $(".menu-container").slideUp();
  $("#back-btn").show();
}
//show menue
function showMenu() {
  $(".game-container").slideUp();
  $(".menu-container").slideDown();
  $("#back-btn").hide();
}

//start game
function gameStart() {
  //for desktop press key to start game
  $(document).off("keydown");
  $(document).one("keydown", () => {
    nextSequence();
  });
  //for device touch screen to start game
  $(document).off("touchend");
  $(document).one("touchend", () => {
    nextSequence();
  });
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

//auto choose button
function nextSequence() {
  userClickedPattern = [];
  let randomNumber = Math.floor(Math.random() * 4);
  let buttonColor = buttonColors[randomNumber];
  gamePattern.push(buttonColor);
  buttonClickAnimation(buttonColor);
  level++;
  updateLevel();
  userChooseColorIndex = 0;
  // console.log("nextSequence called, " + buttonColor + " is chosen.");
}

//check whether the color is right or not
function checkColor(userChooseColor) {
  if (gamePattern.length == 0) return;
  if (
    userChooseColorIndex > level ||
    userChooseColor != gamePattern[userChooseColorIndex - 1]
  ) {
    gameOver();
    gamestarted = false;
    gameStart();
  } else if (userChooseColorIndex == level) {
    setTimeout(function () {
      if (userChooseColorIndex == level) {
        nextSequence(); //double check
      }
    }, 1000);
  }
}

//game over
function gameOver() {
  let audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("#level-title").text("Game over, press any key to restart");
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
}

function updateLevel() {
  $("#level-title").text("Level " + level);
}

//animation, audio
function buttonClickAnimation(buttonColor) {
  flashButton(buttonColor);
  playAudio(buttonColor);
}

function flashButton(buttonColor) {
  let selectedButtonId = "#" + buttonColor;
  $(selectedButtonId).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  // $(selectedButtonId).animate({ opacity: 0 }).animate({ opacity: 100 });
}

function playAudio(buttonColor) {
  let audioName = "sounds/" + buttonColor + ".mp3";
  let audio = new Audio(audioName);
  audio.play();
}


//Todo:
//mobile touch will trigger a bug if touch the button when first enter the game page.