let WIDTH = 10;
let HEIGHT = 10;

class Cell {
    #x;
    #y;
    #wasAlive;
    #isAlive;
    #ctx;
    #env;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
        this.#wasAlive = false;
        this.#isAlive = false;
        this.#ctx = $('#drawArea')[0].getContext("2d");
        this.#env = [];
    }

    draw() {
        this.#ctx.beginPath();
		this.#ctx.rect(this.#x*WIDTH, this.#y*HEIGHT, WIDTH, HEIGHT);
		this.#ctx.fillStyle = (this.#isAlive)? "#000000": "rgb(233, 200, 158)";
        // ----------------- debug ------------------
        // if (this.#isAlive == true && this.#wasAlive == false) this.#ctx.fillStyle = 'red';
        // if (this.#isAlive == true && this.#wasAlive == true) this.#ctx.fillStyle = 'purple';
        // if (this.#isAlive == false && this.#wasAlive == true) this.#ctx.fillStyle = 'blue';
        // if (this.#isAlive == false && this.#wasAlive == false) this.#ctx.fillStyle = 'white';
		this.#ctx.fill();
		this.#ctx.closePath();
    }

    nextStep() {
        this.#wasAlive = this.#isAlive;
    }

    update() {
        let count = 0;
        for (let i = 0; i < this.#env.length; i++) if (this.#env[i].getState()) count++;
        if (count == 3 || (this.#isAlive == true && count == 2)) this.#isAlive = true;
        else this.#isAlive = false;
    }

    // getter & setter
    getState() {
        return this.#wasAlive;
    }

    setState(isAlive) {
        this.#wasAlive = isAlive;
        this.#isAlive = isAlive;
    }
    
    addEnvCell(cell) {
        this.#env.push(cell);
    }
}