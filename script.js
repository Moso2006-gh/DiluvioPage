const sudokuArray = [
    [
        [6, 7, 5, 4, 3, 2, 1,],
        [3, 2, 7, 5, 4, 1, 6,],
        [7, 5, 2, 1, 6, 4, 3,],
        [5, 1, 4, 3, 7, 6, 2,],
        [1, 3, 6, 7, 2, 5, 4,],
        [4, 6, 1, 2, 5, 3, 7,],
        [2, 4, 3, 6, 1, 7, 5,],
    ],
    [
        [5, 7, 2, 6, 1, 3, 4,],
        [2, 3, 7, 4, 6, 1, 5,],
        [6, 5, 1, 3, 7, 4, 2,],
        [3, 6, 4, 7, 2, 5, 1,], 
        [4, 1, 6, 5, 3, 2, 7,],
        [7, 2, 5, 1, 4, 6, 3,],
        [1, 4, 3, 2, 5, 7, 6,],
    ],
    [
        [2, 7, 4, 3, 5, 1, 6,],
        [7, 6, 1, 2, 3, 4, 5,],
        [1, 4, 6, 5, 2, 3, 7,],
        [6, 5, 2, 4, 1, 7, 3,],
        [5, 1, 3, 7, 6, 2, 4,],
        [4, 3, 5, 1, 7, 6, 2,],
        [3, 2, 7, 6, 4, 5, 1,],
    ],
    [
        [5, 4, 3, 2, 1, 6, 7,],
        [3, 7, 5, 4, 2, 1, 6,],
        [2, 6, 4, 1, 7, 3, 5,],
        [4, 5, 1, 6, 3, 7, 2,],
        [7, 2, 6, 3, 4, 5, 1,],
        [1, 3, 7, 5, 6, 2, 4,],
        [6, 1, 2, 7, 5, 4, 3,],
    ]
];

console.log(sudokuArray);

let activePlayers = {}; //Lista de los jugadores
let matchSudoku = [
    [0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0,],
]; //Inicialización del sudoku

$('.Player').on('click', (event) => {
    togglePlayerList(event.target.parentElement); //Cambiar en la lista
    $(event.target.parentElement).toggleClass('active'); //Cambiar la clase
});

function togglePlayerList(player)  {
    const playerObject = [ //Cojer los paramentros necesarios (nombre y src)
        $(player)[0].classList[1],
        $(player)[0].firstChild.currentSrc,
    ]
    if(activePlayers[playerObject[0]] === undefined) { // Hacer el toggle
        activePlayers[playerObject[0]] = {src: playerObject[1]};
    }
    else {
        delete activePlayers[playerObject[0]]
    }

    //Manejar el boton de generar
    if(Object.keys(activePlayers).length <= 1) {
        $('.GenerateButton').text('Generar');
        $('.GenerateButton').prop('disabled', true);
    } 
    else if (Object.keys(activePlayers).length <= 4) {
        $('.GenerateButton').text('Generar');
        $('.GenerateButton').prop('disabled', false);
    }
    else {
        $('.GenerateButton').text('Demasiados Jugadores');
        $('.GenerateButton').prop('disabled', true);
    }

    //Manejar el boton de resetear
    if(Object.keys(activePlayers).length === 0 && $('.ficha').length === 0) {
        $('.ResetButton').prop('disabled', true);
    }
    else {
        $('.ResetButton').prop('disabled', false);
    }
}

function CreateMatch () {
    $('.GenerateButton').text('Generando...'); //Feedback al usuario
    $('.ficha').remove(); //Eliminar si hay fichas

    let sudoku = sudokuArray[Math.floor(Math.random() * sudokuArray.length)] //Elejir sudoku base

    //Manejar rotation
    const rotation = Math.round(Math.random() * 3);
    for ( let m = 0; m < sudoku.length; m++){
        for (let n = 0; n <sudoku[m].length; n++){
            switch (rotation) {
                case 0:
                    matchSudoku[m][n] = sudoku[m][n];
                    break;
                case 1:
                    matchSudoku[n][(sudoku.length - 1) - m] = sudoku[m][n];
                    break;
                case 2:
                    matchSudoku[(sudoku.length - 1) - m][n] = sudoku[m][n];
                    break;
                case 3:
                    matchSudoku[n][m] = sudoku[m][n];
                    break;
            }
        }
    }

    //Calcular posiciones
    let positions = [];
    Object.keys(activePlayers).forEach((key) => {
        let position = Math.round(Math.random() * 6) + 1;
        while (positions.indexOf(position) !== -1 || position === matchSudoku[6][3]) { //Comprobar que no este repetida ni encima del barco
            position = Math.round(Math.random() * 6) + 1;
        }

        positions.push(position)
        activePlayers[key].position = position;
    })
    console.log(activePlayers);

    $([document.documentElement, document.body]).animate({ //Scroll a sudoku
        scrollTop: $(".sudoku").offset().top
    }, 1000);

    setTimeout(() => {
        $('.ficha').remove(); //Eliminar fichas otra vez por si acaso
        $('.GenerateButton').text('Generar'); // Volver a cambiar texto
        if(Object.keys(activePlayers).length <= 3 ){ //Elegir modo de juego
            NormalPlacement();
        }
        else {
            ExcesivePlacement();
        }
    }, 1500) //Dar tiempo
}

async function NormalPlacement() {
    for (let m = 0; m < matchSudoku.length; m++) {
        for (let n = 0; n < matchSudoku[0].length; n++) {
            const position = matchSudoku[m][n];
            try {
                const src = Object.values(activePlayers).find((player) => { //Comprobar src
                    return player.position === position;
                }).src;

                await AppendImage(src, m, n) //Asignar Imagen
            }
            catch (e) {}
        }
    }
}

async function ExcesivePlacement() {
    Object.keys(activePlayers).forEach((player) => { //Eliminar dos filas
        let skiprows = [];
        for (i = 0; i < 2; i++) {
            let row = Math.floor(Math.random() * matchSudoku[0].length);
            while (skiprows.indexOf(row) !== -1) { //Comprobar que no se repiten
                row = Math.floor(Math.random() * matchSudoku[0].length);
            }
            skiprows.push(row)
        }
        activePlayers[player].skiprows = skiprows;
    })
    
    for (let m = 0; m < matchSudoku.length; m++) {
        for (let n = 0; n < matchSudoku[0].length; n++) {
            const position = matchSudoku[m][n];
            try {
                const player = Object.values(activePlayers).find((player) => {
                    return player.position === position;
                });

                if(player.skiprows.indexOf(m) === - 1) {
                    await AppendImage(player.src, m, n) //Asignar Imagen
                }
            }
            catch (e) {}
        }
    }
}

async function AppendImage(src, m, n) {
    const $image = $((`<img class="ficha" src='${src}' style="opacity: 0"/>`));
    $(`.${m}-${n}`).append($image);
    $image.animate({
        opacity: '1'
    }, 1000); //Animar
    await new Promise(resolve => setTimeout(resolve, 50)); //Lag
}

$('.GenerateButton').on('click', () => CreateMatch()); //Añadir el evento

$('.ResetButton').on('click', () => {
    $('.ficha').remove(); //Eliminar fichas
    Object.keys(activePlayers).forEach(player => {
        console.log('player');
        $('.' + player).toggleClass('active');
    }); //Cambiar clases
    activePlayers = {}; //Eliminar activePlayers
    
    $('.ResetButton').prop('disabled', true); //Desactivar reset

    $('.GenerateButton').text('Generar');
    $('.GenerateButton').prop('disabled', true); //Desactivar generar

    $([document.documentElement, document.body]).animate({
        scrollTop: $(".title").offset().top
    }, 1000); //Scroll
})