const prompt = require('prompt-sync')();
const chalk = require('chalk');
//const clear = require('clear-screen');

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field){
        this._field = field;    
    }

    start() {
        console.log(chalk.yellow('Welcome to the "Find Your Hat Game"'));
        console.log(chalk.yellow('You are (the player) are identified as a * symbol'));
        console.log(chalk.yellow('Reach the hat ^ symbol without falling in the holes "O" or falling off the map.'));
        // Ask user how many Rows they want Number must be from 3 to 10;
        const answerRows = this.questionRows();
        // Ask user how wide the Rows shoud be Number must be from 3 to 5;
        const answerWidth = this.questionWidth();
        // Ask user how many holes to use Number must be from 1 to 5;
        const answerHoles = this.questionHoles();
        // read out a confirmation of the game settings
        console.log(`The size of the grid is: ${answerRows} x ${answerWidth} and it contains ${answerHoles} holes`)
        // generate the field with the settings
        const generatedField = new Field(Field.generateField(answerWidth,answerRows,answerHoles)); // dependant on option questions
        // print the field
        generatedField.print();
        // ask user which direction to take
        //generatedField.startPos()
        let playing = true;

        while (playing) {
            this.playerMoves()
            generatedField.print();
            // define current position
            // PROBLEM STARTS HERE
            // Trying to select a grid position
            console.log(this.testPosition)
            console.log(this.field[0][0]); // type error
            console.log(this._field[0][0]); // type error
            console.log(generatedField) // prints the class not the 2d array
            console.log(this._field) // undefined
            console.log(this.locationOne) // undefined
   

            playing = false;
            // try to print the following
            // console.log(north of your current position is)   Should be "offGrid"
            // console.log(east of your current position is)    Should be either fieldCharacter or hole
            // console.log(south of your current position is)   Should be either fieldCharacter or hole
            // console.log(west of your current position is)    Should be "offGrid"
            /*
            if (nextPos === hole) {
                console.log("You just fell down a hole and died, game over");
                playing = false;
            }

            if (nextPos === outsideGrid) {
                console.log("You just fell off the grid and died, game over");
                playing = false;
            }

            if (nextPos === hatPos) {
                console.log("Congratulations, you just won the game");
                playing = false;
            }
            */
        }
    }

    questionRows() {
        let rowQuestionAnswered = false;
        while (!rowQuestionAnswered) {
            let userNumRows = Number(prompt(chalk.red('How many Rows would you like in your grid, pick a number from 3 to 10: ')));
            if (userNumRows >= 3 && userNumRows <= 10) {;
                rowQuestionAnswered = true;
                return userNumRows;
            } 
            if (userNumRows < 3 || userNumRows > 10) {
                console.log("Incorrect entry")
            }      
        }
    }

    questionWidth() {
        let widthQuestionAnswered = false;
        while (!widthQuestionAnswered) {
            let userRowWidth = Number(prompt(chalk.red('How many Rows would you like in your grid, pick a number from 3 to 5: ')));
            if (userRowWidth >= 3 && userRowWidth <= 5) {;
                widthQuestionAnswered = true;
                return userRowWidth;
            } 
            if (userRowWidth < 3 || userRowWidth > 5) {
                console.log("Incorrect entry")
            }      
        }
    }

    questionHoles() {
        let holesQuestionAnswered = false;
        while (!holesQuestionAnswered) {
            let userHoleAmount = Number(prompt(chalk.red('How many holes would you like in your grid, pick a number from 1 to 5: ')));
            if (userHoleAmount >= 1 && userHoleAmount <= 5) {;
                holesQuestionAnswered = true;
                return userHoleAmount;
            } 
            if (userHoleAmount < 1 || userHoleAmount > 5) {
                console.log("Incorrect entry")
            }      
        }
    }

    print() {
        for (let row of this._field){
            console.log(chalk.green(row.join(' ')));
        }
    }

    playerMoves() {

        let movePlayer = prompt(chalk.red('W = up, A = left, S = down, D = right: '));
        if (movePlayer === "W") {
            //this.verticalPos -= 1;
            //console.log(`Your current position is ${this.currentPos}`)
        } else if (movePlayer === "A") {
            //this.horizontalPos -= 1;
            //console.log(`Your current position is ${this.currentPos}`)
        } else if (movePlayer === "S") {
            //this.verticalPos += 1;
            //console.log(`Your current position is ${this.currentPos}`)
        } else if (movePlayer === "D") {
            //this.horizontalPos += 1;
            //console.log(`Your current position is ${this.currentPos}`)
        }   
    }

    static generateField(fieldWidth, fieldHeight, holesAmount) {
        // create blank field containing field characters
        var field = new Array(fieldHeight).fill(fieldCharacter).map( () => new Array(fieldWidth).fill(fieldCharacter));

        field[0][0] = pathCharacter;
        // place hat in bottom right
        field[fieldHeight-1][fieldWidth-1] = hat;
        for (let i = 0; i < holesAmount; i++) {
            // cycle through 2d array, and randomly select numbers to change the value of the item inside the array  
            let randNumLength = Math.floor(Math.random() * fieldWidth);
            let randNumRow = Math.floor(Math.random() * fieldHeight);
            // if there is already a hole in place re-iterate if not place hole
            if (field[randNumRow][randNumLength] === hat || field[randNumRow][randNumLength] === hole || field[randNumRow][randNumLength] === pathCharacter) {
                console.log("the field chosen has either a hat, player or hole in it")
                i--
            } else {
                field[randNumRow][randNumLength] = hole;
            }
        }    
        return field;
    }  
}

let newGame = new Field;

newGame.start()