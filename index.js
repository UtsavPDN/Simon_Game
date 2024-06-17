var sequenceArray = []; 
var clickArray = []; 
var color = ["red", "blue", "green", "yellow"];
var keyPressed = true;
var level = 1; 
var timeoutActive = true; 


start();

$(".btn").on("click", function(event){ 
    if (timeoutActive) {
        runErrorCode(event);
    } 
    else {
        var activeButton = $(event.target);
        var activeButtonId = $(event.target).attr('id'); 
        clickArray.push(activeButtonId); 
        console.log(clickArray); 
        console.log(sequenceArray); 

        // animation 
        activeButton.addClass("pressed"); 
    
        setTimeout(function() {
            activeButton.removeClass("pressed");
        }, 100);

        // audio 
        let audioFile = $(this).data('audio');
        var audio = new Audio(audioFile);
    
        if (!arraysEqual(clickArray, sequenceArray)) {
            $("#level-title").text("Game Over, Press Any Key to Restart");  
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 100);
            var audio = new Audio("./sounds/wrong.mp3");
            level = 1; 
            start();
        };

        audio.play();
    
        if (arraysEqual(sequenceArray, clickArray)) {
            timeoutActive = true; 
            setTimeout(function() {
                timeoutActive = false; 
                nxtLevel();
            }, 1000);
        };
    }
});

function start(){
    keyPressed = false; 
    $(document).on("keydown", function(event) {
        if (!keyPressed && !event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey && event.key !== "Escape") {
            keyPressed = true; // Set flag to true once key is pressed
            $("#level-title").text("Level " + level);
            emptyArray(clickArray);
            emptyArray(sequenceArray);
            addRandomColor();
            timeoutActive = false; 
        }
    });
}
    
function nxtLevel() { 
    level += 1; 
    $("#level-title").text("Level " + level);
    emptyArray(clickArray);
    addRandomColor();
}

function runErrorCode(event) {
    var activeButton = $(event.target);
    activeButton.addClass("pressed");
    $("body").addClass("game-over");
    setTimeout(function() {
        activeButton.removeClass("pressed");
        $("body").removeClass("game-over");
    }, 100);

    // audio
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
}

function emptyArray(arr) { 
    arr.length = 0; 
} 

function arraysEqual(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

function addRandomColor() {
    i = Math.floor(Math.random() * 4);
    sequenceArray.push(color[i]); 
    var activeButton = $("." + color[i]);
    activeButton.addClass("pressed"); 
    setTimeout(function() {
        activeButton.removeClass("pressed");
    }, 100);

    // audio 
    let audioFile = $("." + color[i]).data('audio');
    var audio = new Audio(audioFile);
    audio.play();    
}