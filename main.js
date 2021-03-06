let nbCellsX;
let nbCellsY;
let cells;
let cellWidth = 4;
let nbCellStates = 2;
let animation;
let step;

function clear() {
	$('#drawArea')[0].getContext('2d').clearRect(0, 0, $('#drawArea')[0].width, $('#drawArea')[0].height);
}

function init() {
    let cells = [];
    step = 1
    // create cells
    for (let i = 0; i < nbCellsX; i++) {
        cells.push([]);
        for (let j = 0; j < nbCellsY; j++) {
            cells[i].push(new Cell(i, j, cellWidth));
        }
    }
    // affect env to cells
    console.log(cells);
    for (let i = 0; i < nbCellsX; i++) {
        for (let j = 0; j < nbCellsY; j++) {
            const currentCell = cells[i][j];
            if (i > 0) {
                if (j > 0) currentCell.addEnvCell(cells[i-1][j-1]);
                currentCell.addEnvCell(cells[i-1][j]);
                if (j < nbCellsY-1) currentCell.addEnvCell(cells[i-1][j+1]);
            }
            if (j > 0) currentCell.addEnvCell(cells[i][j-1]);
            if (j < nbCellsY-1) currentCell.addEnvCell(cells[i][j+1]);
            if (i < nbCellsX-1) {
                if (j > 0) currentCell.addEnvCell(cells[i+1][j-1]);
                console.log(i, j);
                currentCell.addEnvCell(cells[i+1][j]);
                if (j < nbCellsY-1) currentCell.addEnvCell(cells[i+1][j+1]);
            }
            currentCell.draw();
        }
    }

    return cells;
}

function play() {
    console.log('play'); // debug
    animation = setInterval(() => {
        $('#step')[0].innerText = `Steps = ${step++}`;

        clear();
        let population = 0;
        for (let i = 0; i < nbCellsX; i++)
            for (let j = 0; j < nbCellsY; j++) cells[i][j].nextStep();
        for (let i = 0; i < nbCellsX; i++)
            for (let j = 0; j < nbCellsY; j++) {
                cells[i][j].update();
                cells[i][j].draw();
                if (cells[i][j].getState()) population++;
            };

        $('#population')[0].innerText = `Population = ${population}`;
    }, 10);
}

function pause() {
    console.log('pause'); // debug
    clearInterval(animation);
}

function stop() {
    console.log('stop'); // debug
    clearInterval(animation);

    nbCellsX = $('#drawArea').width()/cellWidth;
    nbCellsY = $('#drawArea').height()/cellWidth;
    cells = init();
    $('#step')[0].innerText = 'Steps = 0';
}

function bornCell(i, j) {
    // console.log(i, j);
    cells[i][j].setState(1);
    cells[i][j].draw();

    let population = 0;
    for (let i = 0; i < nbCellsX; i++)
        for (let j = 0; j < nbCellsY; j++)
            if (cells[i][j].getState()) population++;
    $('#population')[0].innerText = `Population : ${population}`;
}

$(document).ready(function() { // Page charg??e
    $('#play').show();
    $('#pause').hide();
    $('#stop').hide();

    nbCellsX = Math.floor($('#drawArea').width()/cellWidth);
    nbCellsY = Math.floor($('#drawArea').height()/cellWidth);
    cells = init();

    $('#drawArea').on('click', (evt) => {
        bornCell((evt.offsetX-(evt.offsetX%cellWidth))/cellWidth, (evt.offsetY-(evt.offsetY%cellWidth))/cellWidth);
    });

    $('#random').on('click', (evt) => {
        for (let i = 0; i < nbCellsX; i++)
            for (let j = 0; j < nbCellsY; j++){
                cells[i][j].setState((Math.random() >= 1/nbCellStates)? 1 : 0);
                cells[i][j].draw();
            }        
    });

	$('#play').on('click', (evt) => {
        play();
        $('#play').hide();
        $('#pause').show();
        $('#stop').show();
    });
	$('#pause').on('click', (evt) => {
        pause();
        $('#play').show();
        $('#pause').hide();
        $('#stop').show();
    });
	$('#stop').on('click', (evt) => {
        stop();
        $('#play').show();
        $('#pause').hide();
        $('#stop').hide();
    });
});
