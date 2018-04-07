class Block {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isMine = false;
        this.isRevealed = true; //change to false to hide them.
    }

    show() {
        fill(255);
        rect(this.x * screenScale, this.y * screenScale, screenScale, screenScale);

        if (this.isRevealed) {
            if (this.isMine) {
                fill(150);
                ellipse(this.x * screenScale + .5 * screenScale, this.y * screenScale + .5 * screenScale, screenScale / 2, screenScale / 2);
            } else {
                this.findEightNeighbors();
            }
        }
    }

    isAMine() {
        this.isMine = true;
        //assign block as a mine
    }

    findEightNeighbors() {
        //find neighbors
        let arr = [];
        for (let i = 0; i < 9; i++) {
            let obj = {
                x: 0,
                y: 0
            };
            let add = 0;
            if (i < 3) {
                add = -1;
            } else if (i > 3 && i < 6) {
                add = 0;
            } else {
                add = 1;
            }
            
            obj.x = (this.x - 1) + i % 3;
            obj.y = this.y + add;

            arr.push(obj);
        }
        arr.splice(4, 1);
        console.log(arr);
    }
}
