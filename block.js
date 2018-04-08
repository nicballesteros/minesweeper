class Block {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isMine = false;
        this.isRevealed = false;
        this.neighbors = [];
        this.neighborCount = 0;
        this.color = 255;
    }

    show() {
        fill(this.color);
        rect(this.x * screenScale, this.y * screenScale, screenScale, screenScale);

        if (this.isRevealed) {
            this.color = 200;

            if (this.isMine) {
                fill(150);
                ellipse(this.x * screenScale + .5 * screenScale, this.y * screenScale + .5 * screenScale, screenScale / 2, screenScale / 2);
            } else {
                textSize(32);
                fill(0);
                text(this.neighborCount, this.x * screenScale + .5 * screenScale - 10, this.y * screenScale + .5 * screenScale + 10);
            }
        }
    }

    isAMine() {
        this.isMine = true;
        //assign block as a mine
    }

    findEightNeighbors() {
        //        find neighbors
        for (let i = 0; i < 9; i++) {
            let obj = {
                x: 0,
                y: 0,
            };
            let add = 0;
            if (i < 3) {
                add = -1;
            } else if (i >= 3 && i < 6) {
                add = 0;
            } else {
                add = 1;
            }

            obj.x = (this.x - 1) + i % 3;
            obj.y = this.y + add;

            this.neighbors.push(obj);
        }

        this.neighbors.splice(4, 1);
        for (let i = 0; i < this.neighbors.length; i++) {
            if (this.neighbors[i].x < 0 || this.neighbors[i].y < 0 || this.neighbors[i].x > (floor(canvasSize.x / screenScale) || this.neighbors[i].y > (floor(canvasSize.y / screenScale)))) {
                this.neighbors.splice(i, 1);
                i = -1;
            }
        }

    }

    countNeighbors(arr) {
        //        console.log(arr.length)
        for (let i = 0; i < this.neighbors.length; i++) { //0-8
            for (let j = 0; j < arr.length; j++) { //0 - 100
                if (arr[j].x === this.neighbors[i].x) {
                    if (arr[j].y === this.neighbors[i].y) {
                        if (arr[j].isMine) {
                            this.neighborCount++;
                        }
                    }
                }
            }
        }
    }

    contains(x, y) {
        if (x > this.x * screenScale && x < this.x * screenScale + screenScale && y > this.y * screenScale && y < this.y * screenScale + screenScale) {
            return true;
        } else {
            return false;
        }
    }

    reveal() {
        this.isRevealed = true;
    }
}
