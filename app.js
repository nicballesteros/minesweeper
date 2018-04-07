let screenScale = 60;
let blocks = [];
let canvasSize = {
    x: 601,
    y: 601
}
let mineCount = 50;

function setup() {
    createCanvas(canvasSize.x, canvasSize.y);
    // creates each individual Block
    for (let i = 0; i < floor(canvasSize.x / screenScale); i++) {
        for (let j = 0; j < floor(canvasSize.x / screenScale); j++) {
            let block = new Block(i, j);
            blocks.push(block);
        }
    }

    chooseMinePos();

    console.log(blocks);
}

function draw() {
    background(0);

    //shows the Blocks
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].show();
    }
}

//chooses where the mines are placed
let mines = [];

function chooseMinePos() {
    for (let i = 0; i < mineCount; i++) {
        let x = mineCheck();
        mines.push(x);
        blocks[x].isAMine();
    }
    console.log(mines);
}

//make sure there aren't any repeats
function mineCheck() {
    let x = floor(random(blocks.length));

    for (let j = 0; j < mines.length; j++) {
        if (mines[j] === x) {
            mineCheck();
        }
    }

    return x;
}