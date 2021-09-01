let nbCellsX;
let nbCellsY;
let cells;
let animation;
let step;

function clear() {
	$('#drawArea')[0].getContext('2d').clearRect(0, 0, $('#drawArea')[0].width, $('#drawArea')[0].height);
}

function init() {
    let cells = [];
    // create cells
    for (let i = 0; i < nbCellsX; i++) {
        cells.push([]);
        for (let j = 0; j < nbCellsY; j++) {
            cells[i].push(new Cell(i, j));
        }
    }
    // affect env to cells
    for (let i = 0; i < nbCellsX; i++) {
        for (let j = 0; j < nbCellsY; j++) {
            const currentCell = cells[i][j];
            if (i != 0) {
                if (j != 0) currentCell.addEnvCell(cells[i-1][j-1]);
                currentCell.addEnvCell(cells[i-1][j]);
                if (j != nbCellsY-1) currentCell.addEnvCell(cells[i-1][j+1]);
            }
            if (j != 0) currentCell.addEnvCell(cells[i][j-1]);
            if (j != nbCellsY-1) currentCell.addEnvCell(cells[i][j+1]);
            if (i != nbCellsX-1) {
                if (j != 0) currentCell.addEnvCell(cells[i+1][j-1]);
                currentCell.addEnvCell(cells[i+1][j]);
                if (j != nbCellsY-1) currentCell.addEnvCell(cells[i+1][j+1]);
            }
        }
    }
    return cells;
}

function start() {
    console.log('start'); // debug
    animation = setInterval(() => {
        console.log(step++); // debug
        for (let i = 0; i < nbCellsX; i++)
            for (let j = 0; j < nbCellsY; j++) {
                cells[i][j].update();
                cells[i][j].draw();
            };
    }, 1000);
}

function pause() {
    console.log('pause'); // debug
    clearInterval(animation);
}

function stop() {
    console.log('stop'); // debug
    clearInterval(animation);

    nbCellsX = $('#drawArea').width()/10;
    nbCellsY = $('#drawArea').height()/10;
    cells = init();

    step = 0;
}

$(document).ready(function() { // Page chargée
    $('#start').show();
    $('#pause').hide();
    $('#stop').hide();

    nbCellsX = $('#drawArea').width()/10;
    nbCellsY = $('#drawArea').height()/10;
    cells = init();

    step = 0;

	$('#start').on('click', (evt) => {
        start();
        $('#start').hide();
        $('#pause').show();
        $('#stop').show();
    });
	$('#pause').on('click', (evt) => {
        pause();
        $('#start').show();
        $('#pause').hide();
        $('#stop').show();
    });
	$('#stop').on('click', (evt) => {
        stop();
        $('#start').show();
        $('#pause').hide();
        $('#stop').hide();
    });
});
