let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let userChooseColorIndex = 0;
let gamestarted = false;

//menu 
$("#start-button").on("click",()=>{
    showGame();
    gameStart();
});

//show game
function showGame() {
    $('#level-title').text("Press A Key to Start");
    $(".game-container").slideDown();
    $(".menu-container").slideUp();
}
//show menue
function showMenu() {
    $(".game-container").slideUp();
    $(".menu-container").slideDown();
}
// back-button event
$('#back-btn').on("click",()=>{
    showMenu();
})

//start game
function gameStart() {
  if (gamestarted == false) {
    $(document).on("keydown", (event) => {
      nextSequence();
      $(document).off("keydown");
    });
    gamestarted = true;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
  }
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
  console.log("nextSequence called, " + buttonColor + " is chosen.");
}

//user clicked button
$(".btn").on("click", clickedHandler);

function clickedHandler(event) {
  //using event
  let userChooseColor = event.target.id;
  //using this
  // let userChooseColor = $(this).attr("id");
  playAudio(userChooseColor);
  userClickedPattern.push(userChooseColor);
  checkColor(userChooseColor);
}

function checkColor(userChooseColor) {
  if (gamePattern.length == 0) return;
  if (userChooseColor != gamePattern[userChooseColorIndex]) {
    gameOver();
    gamestarted = false;
    gameStart();
  } else {
    if (userChooseColorIndex == level - 1) {
      setTimeout(nextSequence, 1000);
    } else {
      userChooseColorIndex++;
    }
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

//add pressed event listener
for (let color of buttonColors) {
  let selectedButtonId = "#" + color;
  buttonPressedFunction(selectedButtonId);
}

function buttonPressedFunction(selectedButtonId) {
  $(selectedButtonId).on("mousedown", function () {
    $(this).addClass("pressed");
    $(document).on("mouseup", function () {
      $(selectedButtonId).removeClass("pressed");
      $(document).off("mouseup");
    });
  });
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
}

function playAudio(buttonColor) {
  let audioName = "sounds/" + buttonColor + ".mp3";
  let audio = new Audio(audioName);
  audio.play();
}
