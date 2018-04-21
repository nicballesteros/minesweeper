let screenScale = 60;
let blocks = [];
let canvasSize = {
    x: 601,
    y: 601
}
let mineCount = 10;
let cols = 0;
let rows = 0;

function setup() {
    createCanvas(canvasSize.x, canvasSize.y);

    cols = floor(canvasSize.x / screenScale);
    rows = floor(canvasSize.y / screenScale);

    // creates each individual Block
    for (let i = 0; i < rows; i++) {
        let temp = [];

        for (let j = 0; j < cols; j++) {
            let block = new Block(j, i, j * screenScale, i * screenScale, screenScale);
            temp.push(block);
        }
        blocks.push(temp);
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            blocks[i][j].findEightNeighbors();
        }
    }

    chooseMinePos();

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            blocks[i][j].countNeighbors(blocks);
        }
    }
    console.log(blocks);
     document.addEventListener("contextmenu", function (e) {
        e.preventDefault();
    }, false);
    mousePressed();
}


function draw() {
    background(0);

    //shows the Blocks
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            //show the block
            revealEmpty(i, j);
            blocks[i][j].show();
        }
    }
}

function revealEmpty(i, j) {
    if (blocks[i][j].isRevealed && blocks[i][j].empty) {
        let addresses = blocks[i][j].getNeighborAddresses();

        for (let o = 0; o < addresses.length; o++) {
            let x = addresses[o].x;
            let y = addresses[o].y;
            blocks[y][x].reveal();
        }
    }
}

//chooses where the mines are placed
let mines = [];

function chooseMinePos() {
    for (let i = 0; i < mineCount; i++) {
        let x = mineCheck();
        let index1 = floor(x / floor(canvasSize.x / screenScale));
        let index2 = x - index1 * 10;

        mines.push(x);

        blocks[index1][index2].isAMine();
    }
}

//make sure there aren't any repeats
function mineCheck() {
    let x = floor(random(rows * cols));

    for (let j = 0; j < mines.length; j++) {
        if (mines[j] === x) {
            x = mineCheck();
        }
    }

    return x;
}

function mousePressed() {
    let arr = [];

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (blocks[i][j].contains(mouseX, mouseY)) {
                if (mouseButton === LEFT) {
                    blocks[i][j].reveal();
                } 
                else if (mouseButton === RIGHT) {
                    blocks[i][j].mark();
                }
            }
        }
    }

}
