var letter = function(word, correctLetter){

    this.round = word;
    this.correct = correctLetter;
    this.display = '';

    this.win = false;

    //display the word the user
    this.WordDisplay = function(){


    var WordChars = '';
        if(this.correct === undefined){
        for(var i=0; i <this.round.length;i++)
          {
            WordChars += ' _ ';
          }
        }
        else
        {
            for(var x=0; x<this.round.length; x++)
            {
                var correctAnswer = false;

                for(var y=0; y< this.correct.length; y++)
                {
                    if(this.round[x] == this.correct[y]){
                    WordChars += this.correct[y];
                    correctAnswer = true;
                    }
                }
                if(!correctAnswer){
                    WordChars += ' _ ';
                }
            }

        }

    this.displayText = WordChars.trim();
    console.log(this.displayText);

    if(this.displayText == this.round){
        this.win = true;
    }

    }
};


module.exports = letter;
