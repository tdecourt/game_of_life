class Cell {
    #x;
    #y;
    #width;
    #prevState;
    #state;
    #ctx;
    #env;

    constructor(x, y, width) {
        this.#x = x;
        this.#y = y;
        this.#width = width;
        this.#prevState = 0;
        this.#state = this.#prevState;
        this.#ctx = $('#drawArea')[0].getContext("2d");
        this.#env = [];
    }

    draw() {
        this.#ctx.beginPath();
		this.#ctx.rect(this.#x*this.#width, this.#y*this.#width, this.#width, this.#width);
		// this.#ctx.fillStyle = (this.#state == 1)? "#000000": "rgb(233, 200, 158)";

        switch (this.#state) {
            case 1:
                this.#ctx.fillStyle = 'black';
                break;
                
                default:
                this.#ctx.fillStyle = 'rgb(233, 200, 158)';
                break;
        }

        // ----------------- debug ------------------
        // if (this.#state == 1 && this.#prevState == 0) this.#ctx.fillStyle = 'red';
        // if (this.#state == 1 && this.#prevState == 1) this.#ctx.fillStyle = 'purple';
        // if (this.#state == 0 && this.#prevState == 1) this.#ctx.fillStyle = 'blue';
        // if (this.#state == 0 && this.#prevState == 0) this.#ctx.fillStyle = 'rgb(233, 200, 158)';
		this.#ctx.fill();
		this.#ctx.closePath();
    }

    nextStep() {
        this.#prevState = this.#state;
    }

    update() {
        let count = 0;
        for (let i = 0; i < this.#env.length; i++) if (this.#env[i].getState()) count++;
        if (count == 3 || (this.#state == 1 && count == 2)) this.#state = 1;
        else this.#state = 0;
    }

    // getter & setter
    getState() {
        return this.#prevState;
    }

    setState(state) {
        this.#prevState = state;
        this.#state = state;
    }
    
    addEnvCell(cell) {
        this.#env.push(cell);
    }
}