// dependency for inquirer npm package
var inquirer = require("inquirer");

var bank = require('./choices.js');
var checker = require('./word.js');
var DisplayGuesses = require('./letter.js');

//variables for game
var alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

var lettersGuessed = [];

var lettersCorrect = [];

var displayGame;


var game = {
    wordBank: bank,
    guessesLeft: 5,
    currentWord: null,


startGame : function()
    {
        this.guessesLeft = 5;
        var random = Math.floor(Math.random() * this.wordBank.length);
        this.currentWord = this.wordBank[random];



        displayGame = new DisplayGuesses(this.currentWord);
        displayGame.WordDisplay();
        console.log("Guesses Left:" + game.guessesLeft);
        PromptRefresh();
   }
};

//function to show the scores for guesses
function Counters()
{
    console.log("Guesses Left: " + game.guessesLeft);
    console.log("Letters Guessed: " + game.lettersGuessed);
    PromptRefresh();
}

//runs questions again
function PromptRefresh(){
    console.log("");

    if(game.guessesLeft > 0)
    {
        inquirer.prompt([
            {
                type: "value",
                name: "letter",
                message: "Guess a Letter: "
            }
        ]).then(function(userInput){

            var inputLetter = userInput.letter.toLowerCase();

            if(alpha.indexOf(inputLetter) == -1)
            {
                console.log("Cannot run.");
                Counters();
            }
            else if(alpha.indexOf(inputLetter) != -1 && lettersGuessed.indexOf(inputLetter) != -1)
            {
                console.log("Guess again.");
                Counters();
            }
            else
            {
                lettersGuessed.push(inputLetter);

                var letterPresent = checker(inputLetter, game.currentWord);

                if(letterPresent)
                {
                    lettersCorrect.push(inputLetter);

                    displayGame = new DisplayGuesses(game.currentWord, lettersCorrect);
                    displayGame.WordDisplay();

                    if(displayGame.win)
                    {
                        console.log("CORRECT!");
                        console.log(game.currentWord.toUpperCase());
                        return;
                    }
                    else
                    {
                       Counters();
                    }
                }
                else
                {
                    game.guessesLeft--;
                    displayGame.WordDisplay();
                    Counters();
                }
            }
        });
    }
    else
    {
        console.log("Sorry you guesed the wrong color");
        console.log("The color choice was" + game.currentWord.toUpperCase() + ".");
    }
}

game.startGame();
