document.addEventListener('DOMContentLoaded', ()=> {
    const grid = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    width = 28; //28*28=784 squares
    let score = 0;
    //layout of our grid and what is in the squares

    const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ];

    let squares = [];

    //legend
    // 0 - pac dot
    // 1 - wall
    // 2 = ghost-liar
    // 3 - power pellet
    // 4 - empty

    //draw the grid and render it

    function createBoard() {
        for(let i=0; i < layout.length; i++) {
            const square = document.createElement('div');
            grid.appendChild(square);
            squares.push(square);

            //add layout to the board

            if(layout[i] === 0) {
                squares[i].classList.add('pac-dot');
            } else if(layout[i] === 1) {
                squares[i].classList.add('wall');
            } else if(layout[i] === 2) {
                squares[i].classList.add('ghost-liar');
            } else if(layout[i] === 3) {
                squares[i].classList.add('power-pellet');
            }          
        }
    }

    createBoard();

    //starting position of pac-man

    let pacmanCurrentIndex = 490;

    squares[pacmanCurrentIndex].classList.add('pac-man');

    //move pac-man

    function movePacman(e) {
        squares[pacmanCurrentIndex].classList.remove('pac-man');

        switch(e.keyCode) {      
            
            case 37:
                if(pacmanCurrentIndex === 364) { //if pacman is on the exit go to the other side of the board
                    pacmanCurrentIndex = 391;
                    break;
                }
                if(pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex -1].classList.contains('wall')
                && !squares[pacmanCurrentIndex -1].classList.contains('ghost-liar')) pacmanCurrentIndex -=1;
                                
                break;            
            case 38:
                if(pacmanCurrentIndex - width >=0 && !squares[pacmanCurrentIndex -width].classList.contains('wall')
                && !squares[pacmanCurrentIndex -width].classList.contains('ghost-liar')) pacmanCurrentIndex -= width;
                break;
            case 39:
                if(pacmanCurrentIndex === 391) { //if pacman is on the exit go to the other side of the board
                    pacmanCurrentIndex = 364;
                    break;
                }
                if(pacmanCurrentIndex % width < width -1 && !squares[pacmanCurrentIndex +1].classList.contains('wall')
                && !squares[pacmanCurrentIndex +1].classList.contains('ghost-liar')) pacmanCurrentIndex += 1;                
                break;
            case 40:
                if(pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex + width].classList.contains('wall')
                && !squares[pacmanCurrentIndex +width].classList.contains('ghost-liar')) pacmanCurrentIndex += width;
                break;
        }

        squares[pacmanCurrentIndex].classList.add('pac-man');

        pacDotEaten()
        //powerPelletEaten()
        //checkForGameOver()
        //checkForWin
    }

    document.addEventListener('keydown', movePacman);

    //what happens when Pacman eats a pacdot
    function pacDotEaten() {
        if(squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
            score++;
            scoreDisplay.innerHTML = score;
            squares[pacmanCurrentIndex].classList.remove('pac-dot');
        }
    }

    //create our ghost template
    
    class Ghost {
        constructor(className, startIndex, speed) {
            this.className = className;
            this.startIndex = startIndex;
            this.speed = speed;
            this.currentIndex = startIndex;
            this.timerId = NaN;
        }
    }

    ghosts = [
        new Ghost('blinky', 348, 250),
        new Ghost('pinky', 376, 400),
        new Ghost('inky', 351, 300),
        new Ghost('clyde', 379, 500)
    ]

    //draw the ghosts onto the grid

    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.add(ghost.className);
        squares[ghost.currentIndex].classList.add('ghost');
    });

    //move ghosts randomly

    ghosts.forEach(ghost => moveGhost(ghost));

    //function to move ghosts

    function moveGhost(ghost) {
        const directions = [-1, 1, width, -width];
        let direction = directions[Math.floor(Math.random() * directions.length)];

        ghost.timerId = setInterval(function() {
            //if the next square your ghost is going to go in does not contain a wall or ghost, you can go there
            if(!squares[ghost.currentIndex + direction].classList.contains('wall') && !squares[ghost.currentIndex + direction].classList.contains('ghost')) {
                //you can go there
                //remove all ghost related classes
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
                //change the current index to the new safe square
                ghost.currentIndex += direction;
                //redraw the ghost in the new safe place
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
            } else {  //else find new direction
                direction = directions[Math.floor(Math.random() * directions.length)];
            }           
        }, ghost.speed)
    }

})