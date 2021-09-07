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
        let proba = Math.random();
        this.#prevState = (proba*3)-(proba*3)%1;
        // console.log(proba, this.#prevState);
        this.#state = this.#prevState;
        this.#ctx = $('#drawArea')[0].getContext("2d");
        this.#env = [];
    }

    draw() {
        this.#ctx.beginPath();
		this.#ctx.rect(this.#x*this.#width, this.#y*this.#width, this.#width, this.#width);
        switch (this.#state) {
            case 0:
                this.#ctx.fillStyle = '#F2FF00';
                break;
            case 1:
                this.#ctx.fillStyle = '#FFB200';
                break;
            case 2:
                this.#ctx.fillStyle = '#FF3700';
                break;
            case 3:
                this.#ctx.fillStyle = '#FF0000';
                break;
                
                default:
                this.#ctx.fillStyle = 'rgb(233, 200, 158)';
                break;
        }
		this.#ctx.fill();
		this.#ctx.closePath();
    }

    nextStep() {
        this.#prevState = this.#state;
    }

    update() {
        let count = 0;
        for (let i = 0; i < this.#env.length; i++){
            if (this.#env[i].getState() == this.#state+1) count++;
            else if (this.#state == 2 && this.#env[i].getState() == this.#state-2) count++;
        }
        if (count >= 3) this.#state = (this.#state + 1)%3;
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