let WIDTH = $("#drawArea").width();
let HEIGHT = $("#drawArea").height();

class Cell {
    #x;
    #y;
    #isAlive;
    #ctx;
    #env;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
        this.#isAlive = false;
        this.#ctx = $('#drawArea')[0].getContext("2d");
        this.#env = [];
    }

    draw() {
        this.#ctx.beginPath();
		this.#ctx.rect(this.#x*WIDTH, this.#y*HEIGHT, WIDTH, HEIGHT);
		this.#ctx.fillStyle = (this.#isAlive)? "#000000": "#FFFFFF";
		this.#ctx.fill();
		this.#ctx.closePath();
    }

    update() {
        let count = 0;
        for (let i = 0; i < this.#env.length; i++) if (this.#env[i].getState()) count++;
        if (count == 3 || (this.#isAlive && count == 2)) this.#isAlive = true;
        else this.#isAlive = false;
    }

    // getter & setter
    getState() {
        return this.#isAlive;
    }

    setState(isAlive) {
        this.#isAlive = isAlive;
    }
    
    addEnvCell(cell) {
        this.#env.push(cell);
    }
}