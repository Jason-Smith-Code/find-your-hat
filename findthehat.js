const prompt = require('prompt-sync')();
const chalk = require('chalk');
const clear = require('clear-screen');

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field){
        this._field = field
        this.x = 0;
        this.y = 0;
        this.plannedX = 0;
        this.plannedY = 0;
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

        let playing = true;

        while (playing) {
            const maxHeight = answerRows;
            const maxWidth = answerWidth;
            
            clear()
            generatedField.print();
            //initiate the movement input
            let movePlayer = prompt(chalk.red('W = up, A = left, S = down, D = right: '));
            switch(movePlayer.toLowerCase()) {
                
                case 'w':
                    this.plannedY -= 1;
                    if (this.plannedY < 0 ){
                        this.plannedY = 0;  
                        prompt(chalk.red('You cant move any further up - Press any key continue'));
                    }
                    break;
                case 's':
                    this.plannedY += 1;
                    if (this.plannedY > (maxHeight - 1) ){
                        this.plannedY = (maxHeight - 1);  
                        prompt(chalk.red('You cant move any further down - Press any key continue'));
                    }
                    break;
                case 'a':
                    this.plannedX -= 1;
                    if (this.plannedX < 0 ){
                        this.plannedX = 0;
                        prompt(chalk.red('You cant move any further left - Press any key continue'));  
                    }
                    break;
                case 'd':
                    this.plannedX += 1;
                    
                    if (this.plannedX > (maxWidth -1)){
                        this.plannedX = (maxWidth -1);  
                        prompt(chalk.red('You cant move any further Right - Press any key continue'));
                    }
                    break;
                default:
                    break;
            }    
            // over write the array element to show where play has been
            generatedField._field[this.y][this.x] = pathCharacter;

            let pendingPlayerPosition = generatedField._field[this.plannedY][this.plannedX];

            // if the player move into a hole end the game
            if (pendingPlayerPosition === hole) {
                console.log("You fell in a hole and died");
                playing = false;
            }

            // if the player finds the hat end the game
            if (pendingPlayerPosition === hat) {
                console.log("Congratulations you found the hat");
                playing = false;
            }

            generatedField._field[this.plannedY][this.plannedX] = pathCharacter;
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
            let userRowWidth = Number(prompt(chalk.red('How many Rows would you like in your grid, pick a number from 3 to 10: ')));
            if (userRowWidth >= 3 && userRowWidth <= 10) {;
                widthQuestionAnswered = true;
                return userRowWidth;
            } 
            if (userRowWidth < 3 || userRowWidth > 10) {
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

    static generateField(fieldWidth, fieldHeight, holesAmount) {
        // create blank field containing field characters
        const field = new Array(fieldHeight).fill(fieldCharacter).map( () => new Array(fieldWidth).fill(fieldCharacter));

        field[0][0] = pathCharacter;
        // place hat in bottom right
        const hatPos = field[fieldHeight-1][fieldWidth-1]
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

