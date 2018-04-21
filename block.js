class Block {
    constructor(i, j, x, y, w) {
        this.i = i;
        this.j = j;
        this.x = x;
        this.y = y;
        this.w = w
        this.isMine = false;
        this.isRevealed = false;
        this.neighbors = [];
        this.neighborCount = 0;
        this.color = 255;
        this.empty = false;
        this.marked = false;
        this.color2 = this.color;
        this.color3 = this.color;
    }

    show() {
        fill(this.color, this.color2, this.color3);
        rect(this.x, this.y, this.w, this.w);

        if (this.neighborCount === 0) {
            this.empty = true;
        } else {
            this.empty = false;
        }

        if (this.isRevealed) {
            this.color = 200;
            this.color2 = 200;
            this.color3 = 200;

            if (this.isMine) {
                fill(150);
                ellipse(this.x + .5 * this.w, this.y + .5 * this.w, this.w / 2, this.w / 2);
            } else {
                if (!this.empty) {
                    textSize(32);
                    fill(0);
                    text(this.neighborCount, this.x + .5 * this.w - 10, this.y + .5 * this.w + 10);
                }
            }
        } else if (this.marked) {
            this.color = 160;
            this.color2 = 40;
            this.color3 = 40;
        } else {
            this.color = 255;
            this.color2 = 255;
            this.color3 = 255;
        }

    }



    isAMine() {
        //assign block as a mine
        this.isMine = true;
    }

    getIsMine() {
        return this.isMine;
    }

    findEightNeighbors() {
        //find neighbors
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

            obj.x = (this.i - 1) + i % 3;
            obj.y = this.j + add;

            this.neighbors.push(obj);
        }
        this.neighbors.splice(4, 1);
        for (let i = 0; i < this.neighbors.length; i++) {
            if (this.neighbors[i].x < 0 || this.neighbors[i].y < 0 || this.neighbors[i].x > (floor(canvasSize.x / this.w)) - 1 || this.neighbors[i].y > (floor(canvasSize.y / this.w)) - 1) {
                this.neighbors.splice(i, 1);
                i = -1;
            }
        }
    }

    getEmpty() {
        return this.empty;
    }

    getReveal() {
        return this.isRevealed;
    }

    countNeighbors(arr) {
        for (let i = 0; i < this.neighbors.length; i++) { //0-8
            if (arr[this.neighbors[i].y][this.neighbors[i].x].getIsMine()) {
                this.neighborCount++;
            }
        }
    }

    contains(x, y) {
        if (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w) {
            return true;
        } else {
            return false;
        }
    }

    reveal() {
        if (!this.revealed && !this.marked) {
            this.isRevealed = true;
        }
    }

    getNeighborAddresses() {
        return this.neighbors;
    }

    mark() {
        if (!this.isRevealed && !this.marked) {
            this.marked = true;
        } else if (!this.isRevealed && this.marked) {
            this.marked = false;
        }
    }
}
