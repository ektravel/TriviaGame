

var currentCountdownTime = 0;
var currentTimerId = 0;
var triviaSetsCurrentIndex = 0;
var currentTriviaAnswer = "";
var correctAnswers = 0;
var missedAnswers = 0;

var triviaSetArray= [
    "What is the current population of Russia (July 2017 est.)?;142 million; 187 million, 132 million, 201 million,142 million", 
    "Who was the president before Vladimir Putin?; Boris Yeltsin; Mikhail Gorbachev, Alexander Rutskoi, Gennady Zyuganov, Boris Yeltsin", 
    "What alphabet is used in Russia?; Cyrillic; Latin, Greek, Cyrillic, Hebrew", 
    "What is the current unemployment rate (2017 est.)?; 5.5%; 7%, 14%, 3.5%, 5.5%", 
    // "What is the current GDP per capita (2017 est.)?; $27,900; $32,600, $25,700, $27,900, $34,200", 
    "How many time zones does Russia have?; 9; 7, 5, 9, 4",
    "What is the most popular holiday in Russia?; New Year’s Day; Victory Day, International Women’s Day, New Year’s Day, FatherLand Defender’s Day"];

function startGame(){
    currentCountdownTime = 0;
    currentTimerId = 0;
    triviaSetsCurrentIndex =0
    correctAnswers = 0;
    missedAnswers = 0;

    showStartGame();

    currentCountdownTime = 5;
    $("#startScreenCountdownSpan").text(currentCountdownTime);
    currentTimerId = window.setInterval(countdownToStartGame,1000);
};

function countdownToStartGame(){
    if(currentCountdownTime <= 0){
        window.clearInterval(currentTimerId);
        beginTrivia();
    }
    else{
        currentCountdownTime--;
        $('#startScreenCountdownSpan').text(currentCountdownTime);
    }
};

function beginTrivia() {
    showQuestionsScreen();
    
    //triviaSetsCurrentIndex = 0;
    shownNextTrivia();
};

function shownNextTrivia()
{
    if (triviaSetsCurrentIndex >= triviaSetArray.length){
        //We have gone through the whole trivia-set. 
        //Stop the interval timer and finish the game.
        window.clearInterval(currentTimerId);

        goToGameOver();
    }
    else {
        showQuestionsScreen();
        
        //Get the current trivia from the triviaSet array and use it
        //to fill out the questionScreenContent    
        var currentTriviaAsString = triviaSetArray[triviaSetsCurrentIndex];
        showTriviaQuestion(currentTriviaAsString);
        triviaSetsCurrentIndex++;       
        //Reset countdown timer 
        currentCountdownTime = 30;
        $('#questionScreenCountdown').text(currentCountdownTime);

        //start countdown timer
        currentTimerId = window.setInterval(countdownToNextTrivia,1000);


    }
};

function showTriviaQuestion(triviaAsString){
    var triviaAsArray = triviaAsString.split(";");

    var question = triviaAsArray[0];
    currentTriviaAnswer = triviaAsArray[1];
    var optionsArray = triviaAsArray[2].split(",");

    //Update question text to new questions
    $("#questionScreenQuestion").text(question);

    //Remove any previous content the possibleAnswers
    // might have had
    $('#possibleAnswers').html("");

    for (i = 0; i < optionsArray.length; i++)
    {
        var possibleAnswerText = optionsArray[i];
        var buttonHtml = 
            "<button type='button' class='list-group-item list-group-item-action' onclick='checkTriviaAnswer(this.innerHTML)'>"
            + possibleAnswerText  
            + "</button>";
        //Add button to container
        $("#possibleAnswers").append(buttonHtml);
    }
};

function checkTriviaAnswer(selectedAnswer){
    //Stop countdown interval timer since the user selected an answer
    window.clearInterval(currentTimerId);

    if(selectedAnswer === currentTriviaAnswer){
        correctAnswers++;
        goToResults(true);
    }
    else{
        missedAnswers++;
        goToResults(false);
    }
};

function countdownToNextTrivia(){
    if(currentCountdownTime <= 0){
        window.clearInterval(currentTimerId);

        missedAnswers++;
        goToResults(false);
    }
    else{
        currentCountdownTime--;
        $('#questionScreenCountdown').text(currentCountdownTime);
    }
};

function goToResults(answerWasCorrect){
    showResultsScreen();

    if(answerWasCorrect === true){
        $('#resultsScreenCorrect').show();
        $('#resultsScreenWrong').hide();
    }
    else{
        $('#resultsScreenCorrect').hide();
        $('#resultsScreenWrong').show();
    }

    currentTimerId = window.setTimeout(shownNextTrivia, 1500);
};

function goToGameOver(){
    showGameOverScreen();

    $('#gameOverScreenCorrectAnswers').text(correctAnswers);
    $('#gameOverScreenMissedAnswers').text(missedAnswers);
    currentTimerId = window.setTimeout(startGame, 4000);

};
    
function showStartGame(){
    getStartGameRow().show();
    getQuestionsRow().hide();
    getResultsRow().hide();
    getGameOverRow().hide();   
};

function showQuestionsScreen(){
    getStartGameRow().hide();
    getQuestionsRow().show();
    getResultsRow().hide();
    getGameOverRow().hide();   
};

function showResultsScreen(){
    getStartGameRow().hide();
    getQuestionsRow().hide();
    getResultsRow().show();
    getGameOverRow().hide();   
};
function showGameOverScreen(){
    getStartGameRow().hide();
    getQuestionsRow().hide();
    getResultsRow().hide();
    getGameOverRow().show();   
};

function getStartGameRow(){
    return $("#startScreenRow");
};

function getQuestionsRow(){
    return $("#questionScreenRow");
};

function getResultsRow(){
    return $("#resultScreenRow");
};

function getGameOverRow(){
    return $("#gameOverScreenRow");
};

$(document).ready(function(){
    startGame();
});
