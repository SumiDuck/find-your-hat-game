const prompt = require('prompt-sync')({sigint: true});

// Constant Game Elements (Constants)
const HAT = '♕';
const HOLE = 'O';
const GRASS = '░';
const PLAYER = '♘';

//Constants  Game Scenarios (Messages)
const WIN = "Congratualtions! You have won the game!" // WIN
const LOSE = "You lose!" // LOSE
const OUT_BOUND = "You are out of the field."// OUT OF BOUNDS
const INTO_HOLE = "You fell into a hole"// FALLEN INTO HOLE
const WELCOME = "\r\n\u2588\u2591\u2588\u2591\u2588\u2003\u2588\u2580\u2580\u2003\u2588\u2591\u2591\u2003\u2588\u2580\u2580\u2003\u2588\u2580\u2588\u2003\u2588\u2580\u2584\u2580\u2588\u2003\u2588\u2580\u2580\u2003 \u2003\u2580\u2588\u2580\u2003\u2588\u2580\u2588\u2003 \u2003\u2588\u2580\u2580\u2003\u2588\u2003\u2588\u2584\u2591\u2588\u2003\u2588\u2580\u2584\u2003 \u2003\u2588\u2584\u2588\u2003\u2588\u2580\u2588\u2003\u2588\u2591\u2588\u2003\u2588\u2580\u2588\u2003 \u2003\u2588\u2591\u2588\u2003\u2584\u2580\u2588\u2003\u2580\u2588\u2580\u2003\u2588\r\n\u2580\u2584\u2580\u2584\u2580\u2003\u2588\u2588\u2584\u2003\u2588\u2584\u2584\u2003\u2588\u2584\u2584\u2003\u2588\u2584\u2588\u2003\u2588\u2591\u2580\u2591\u2588\u2003\u2588\u2588\u2584\u2003 \u2003\u2591\u2588\u2591\u2003\u2588\u2584\u2588\u2003 \u2003\u2588\u2580\u2591\u2003\u2588\u2003\u2588\u2591\u2580\u2588\u2003\u2588\u2584\u2580\u2003 \u2003\u2591\u2588\u2591\u2003\u2588\u2584\u2588\u2003\u2588\u2584\u2588\u2003\u2588\u2580\u2584\u2003 \u2003\u2588\u2580\u2588\u2003\u2588\u2580\u2588\u2003\u2591\u2588\u2591\u2003\u2584";
const DIRECTION = "\nWhich direction: up(w), left(a), down(s) or right(d)?";  //KEYBOARD DIRECTIONS
const QUIT = "Press Q or q to quit. \n";
const END_GAME = "\r\n\u2591\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2591\u2591\u2588\u2588\u2588\u2588\u2588\u2557\u2591\u2588\u2588\u2588\u2557\u2591\u2591\u2591\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2003\u2003\u2591\u2588\u2588\u2588\u2588\u2588\u2557\u2591\u2588\u2588\u2557\u2591\u2591\u2591\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2591\u2588\u2588\u2557\r\n\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D\u2591\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2557\u2591\u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D\u2003\u2003\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2551\u2591\u2591\u2591\u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2551\r\n\u2588\u2588\u2551\u2591\u2591\u2588\u2588\u2557\u2591\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2554\u2588\u2588\u2588\u2588\u2554\u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2557\u2591\u2591\u2003\u2003\u2588\u2588\u2551\u2591\u2591\u2588\u2588\u2551\u255A\u2588\u2588\u2557\u2591\u2588\u2588\u2554\u255D\u2588\u2588\u2588\u2588\u2588\u2557\u2591\u2591\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D\u2588\u2588\u2551\r\n\u2588\u2588\u2551\u2591\u2591\u255A\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2551\u2588\u2588\u2551\u255A\u2588\u2588\u2554\u255D\u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u255D\u2591\u2591\u2003\u2003\u2588\u2588\u2551\u2591\u2591\u2588\u2588\u2551\u2591\u255A\u2588\u2588\u2588\u2588\u2554\u255D\u2591\u2588\u2588\u2554\u2550\u2550\u255D\u2591\u2591\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u255A\u2550\u255D\r\n\u255A\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D\u2588\u2588\u2551\u2591\u2591\u2588\u2588\u2551\u2588\u2588\u2551\u2591\u255A\u2550\u255D\u2591\u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2003\u2003\u255A\u2588\u2588\u2588\u2588\u2588\u2554\u255D\u2591\u2591\u255A\u2588\u2588\u2554\u255D\u2591\u2591\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2551\u2591\u2591\u2588\u2588\u2551\u2588\u2588\u2557\r\n\u2591\u255A\u2550\u2550\u2550\u2550\u2550\u255D\u2591\u255A\u2550\u255D\u2591\u2591\u255A\u2550\u255D\u255A\u2550\u255D\u2591\u2591\u2591\u2591\u2591\u255A\u2550\u255D\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u2003\u2003\u2591\u255A\u2550\u2550\u2550\u2550\u255D\u2591\u2591\u2591\u2591\u255A\u2550\u255D\u2591\u2591\u2591\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u255A\u2550\u255D\u2591\u2591\u255A\u2550\u255D\u255A\u2550\u255D";
const NOT_RECGONISED ="Input not regconised."
const QUIT_GAME = "Game has been exited."
const WIN_GAME = "\r\n\u2588\u2588\u2557\u2591\u2591\u2591\u2588\u2588\u2557\u2591\u2588\u2588\u2588\u2588\u2588\u2557\u2591\u2588\u2588\u2557\u2591\u2591\u2591\u2588\u2588\u2557\u2003\u2003\u2591\u2588\u2588\u2557\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2588\u2588\u2557\u2588\u2588\u2557\u2588\u2588\u2588\u2557\u2591\u2591\u2588\u2588\u2557\u2588\u2588\u2557\u2588\u2588\u2557\r\n\u255A\u2588\u2588\u2557\u2591\u2588\u2588\u2554\u255D\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2551\u2591\u2591\u2591\u2588\u2588\u2551\u2003\u2003\u2591\u2588\u2588\u2551\u2591\u2591\u2588\u2588\u2557\u2591\u2591\u2588\u2588\u2551\u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2557\u2591\u2588\u2588\u2551\u2588\u2588\u2551\u2588\u2588\u2551\r\n\u2591\u255A\u2588\u2588\u2588\u2588\u2554\u255D\u2591\u2588\u2588\u2551\u2591\u2591\u2588\u2588\u2551\u2588\u2588\u2551\u2591\u2591\u2591\u2588\u2588\u2551\u2003\u2003\u2591\u255A\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2554\u255D\u2588\u2588\u2551\u2588\u2588\u2554\u2588\u2588\u2557\u2588\u2588\u2551\u2588\u2588\u2551\u2588\u2588\u2551\r\n\u2591\u2591\u255A\u2588\u2588\u2554\u255D\u2591\u2591\u2588\u2588\u2551\u2591\u2591\u2588\u2588\u2551\u2588\u2588\u2551\u2591\u2591\u2591\u2588\u2588\u2551\u2003\u2003\u2591\u2591\u2588\u2588\u2588\u2588\u2554\u2550\u2588\u2588\u2588\u2588\u2551\u2591\u2588\u2588\u2551\u2588\u2588\u2551\u255A\u2588\u2588\u2588\u2588\u2551\u255A\u2550\u255D\u255A\u2550\u255D\r\n\u2591\u2591\u2591\u2588\u2588\u2551\u2591\u2591\u2591\u255A\u2588\u2588\u2588\u2588\u2588\u2554\u255D\u255A\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D\u2003\u2003\u2591\u2591\u255A\u2588\u2588\u2554\u255D\u2591\u255A\u2588\u2588\u2554\u255D\u2591\u2588\u2588\u2551\u2588\u2588\u2551\u2591\u255A\u2588\u2588\u2588\u2551\u2588\u2588\u2557\u2588\u2588\u2557\r\n\u2591\u2591\u2591\u255A\u2550\u255D\u2591\u2591\u2591\u2591\u255A\u2550\u2550\u2550\u2550\u255D\u2591\u2591\u255A\u2550\u2550\u2550\u2550\u2550\u255D\u2591\u2003\u2003\u2591\u2591\u2591\u255A\u2550\u255D\u2591\u2591\u2591\u255A\u2550\u255D\u2591\u2591\u255A\u2550\u255D\u255A\u2550\u255D\u2591\u2591\u255A\u2550\u2550\u255D\u255A\u2550\u255D\u255A\u2550\u255D"

class Field {

    // constructor
    constructor(rows, cols){
        this.rows = rows;
        this.cols = cols;
        this.field = new Array([]);         // Property that represents the field for the game 
        this.gamePlay = false;              
        this.curPosition = [0,0];           // Sets the position of the player.
        
    }

    //methods
    static welcomeMsg(msg){
        console.log("\n************************************************************************\n" +
            msg
            + "\n\n***********************************************************************\n");
    }

    generateField(){ 
        for (let i = 0; i < this.rows; i++) {                   // Generate field rows

            this.field[i] = new Array();                        

            for (let j = 0; j < this.cols; j++) {               // Generate field cols
            
                this.field[i][j] = GRASS;                       
            }
            
        }
         this.field[this.curPosition[1]][this.curPosition[0]] = PLAYER   //Places the Player on the Field
      
         console.log(this.curPosition);
         this.generateHoles();                               // generate random holes
         this.generateHats();                                // generate random hat position
    }


    generateHoles() {
    // Generate a random number of holes between 3 and 10
    const numHoles = Math.floor(Math.random() * 10) + 3; // Random number between 3 and 10

    let holesPlaced = 0;        // Set the holePlaced

    while (holesPlaced < numHoles) {
        // Randomly select a position for a hole, randomize rows and cols
        const randomRow = Math.floor(Math.random() * this.rows);
        const randomCol = Math.floor(Math.random() * this.cols);

        // Place a hole only if that position is not a hole, player or hat
        if (this.field[randomRow][randomCol] !== HOLE && this.field[randomRow][randomCol] !== PLAYER && this.field[randomRow][randomCol] !== HAT) {
            this.field[randomRow][randomCol] = HOLE;
            holesPlaced++;       // Increment the number of holes placed by 1
        }

        }
    }
    generateHats() {
    let hatPlaced = 0;

    while (hatPlaced < 1) {
        // Randomly select a position for a hat
        const randomRowHat = Math.floor(Math.random() * (this.rows - 7 + 1)) + 7 // using the Max- Min formula to always randomly generate the hat in the 7-10th row.
        const randomColHat = Math.floor(Math.random() * this.cols);      // This will generate the hat on a random column within the number of cols allocated to field.

        // Place a hole only if that position is not already a hole
        if (this.field[randomRowHat][randomColHat] !== HOLE && this.field[randomRowHat][randomColHat] !== PLAYER && this.field[randomRowHat][randomColHat] !== HAT) {
            this.field[randomRowHat][randomColHat] = HAT;
            hatPlaced++;       // Increases by one when hat is placed and stops the While loop.
        }

        }
    }

    printField(){
        this.field.forEach((element) => {
            console.log(element.join());        // Joins all the elements of the current row into a single string (by default, with commas).

        });
    }

    //Start game
    startGame(){
        this.gamePlay = true;
        this.generateField(this.rows, this.cols);    // Generate the field first    
        this.printField();                           // Print the field that has all the elements joined.
        this.updateGame();                           // Update the game once.
    }

    
    updateGame(){
        // Obtain user input
        let userInput = "";

        // Get the user's direction
        do {
           
            console.log(DIRECTION.concat(" ", QUIT));
            userInput = prompt();
            let tempPosition = Array.from(this.curPosition);    //Set tempPosition to recieve Array.

            switch (userInput.toLowerCase()) {            //Update the position of the player
                case "w": // Move Up when "w" is entered.
                    tempPosition[1] -= 1;                    // tempPosition[1] refers to the y axis. Minusing one to it will move up.
                    this.updatePlayer(tempPosition);        // Sends the [X][Y] Position to updatePlayer()
                    console.log("Player has moved:" + userInput.toLowerCase()); // prints the user input into the console
                    break;
                case "a": // Move Left when "a" is entered.
                    tempPosition[0] -= 1;                                       // tempPosition[0] refers to the x axis. Minusing one to it will move left.
                    this.updatePlayer(tempPosition);                            // Sends the [X][Y] Position to updatePlayer()
                    console.log("Player has moved:" + userInput.toLowerCase()); // Prints the player's Input in lower case to the console.
                    break;

                case "s": // Move Down when "s" is entered.
                    tempPosition[1] += 1;                                       // tempPosition[1] refers to the y axis. Adding one to it will move it downards.
                    this.updatePlayer(tempPosition);                            // Sends the [X][Y] Position to updatePlayer()
                    console.log("Player has moved:" + userInput.toLowerCase()); // Prints the player's Input in lower case to the console.
                    break;

                case "d": // Move Right when "d" is entered.
                    tempPosition[0] += 1;                                       // tempPosition[0] refers to the x axis. Adding one to it will move right.    
                    this.updatePlayer(tempPosition);                            // Sends the [X][Y] Position to updatePlayer()
                    console.log("Player has moved:" + userInput.toLowerCase()); // prints the user input into the console
                    break;
                
                case "q": // Quit the game when "q" is entered.
                    this.quitGame(); //user has quit run this quitgame function.
                    break;
            
                default:
                    // When Input is not WASD, not regconised
                    console.log(NOT_RECGONISED);
                    break;
            }
             
             this.printField();                            // Print the updated field

        } while(userInput.toLowerCase() !== "q");          // Continue to loop if the player hasn't quit.
    }

    quitGame(){                
        console.log(QUIT_GAME);     // Display the quit game text.
        this.gamePlay = false;      // Switch gameplay to false.
        process.exit();             // Exits the program
    }

    winGame(){
        console.log(WIN_GAME);       // Display the win game text.
        this.gamePlay = false;      // Switch gameplay to false.
        process.exit();             // Exits the program
    }
    endGame(){
        console.log(END_GAME);       // Display the end game text.
        this.gamePlay = false;      // Switch gameplay to false.
        process.exit();             // Exits the program
    }

    // This function is to check if the player has met the winning/losing conditions
    updatePlayer(position){
        console.log("Player has moved:" + position);
        //position [0] Refers to the X axis, if the x axis is lesser than 0 or more than ROWS, game over.
        if (position[0] < 0 || position[0] >= ROWS)         // If the player went out of bounds on the ROWS side, game over. 
            this.endGame();                              
        
        //position [1] Refers to the Y axis, if the Y axis is lesser than 0 or more than COLS, game over.
            if (position[1] < 0 || position[1] >= COLS)         // If the player went out of bounds on the COLS side, game over.
            this.endGame();

        if(this.field[position[1]][position[0]] == HOLE){   // If the player touches a HOLE, game over
            this.endGame();
        }
        if (this.field[position[1]][position[0]] == HAT){   // If the player touches a HAT, win game !
            this.winGame();

        } else {
        //Else, if the player is just traversing on grass:    
        this.field[this.curPosition[1]][this.curPosition[0]] = GRASS;  // Reset old position of the player to grass
        this.curPosition = position;                                    // Update Player's new position
        this.field[this.curPosition[1]][this.curPosition[0]] = PLAYER;  // Place player at new position
        }

    }
}

Field.welcomeMsg(WELCOME);

const ROWS = 10;                            // Set the amount of ROWS for the game
const COLS = 10;                            // Set the amount of COLS for the game 
const field = new Field(ROWS, COLS);        // Declaring and creating an instance of 
field.startGame();                          // runs the startgame function
  