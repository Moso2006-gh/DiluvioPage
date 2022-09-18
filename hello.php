<html>
 <head>
  <title>Generador de partidas DILUVIO</title>
  <link href="https://fonts.googleapis.com/css2?family=Ceviche+One&family=Poppins&family=Roboto:wght@500&family=Work+Sans&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./style.css">
 </head>
 <body>
    <div class="mainTitleDiv">
        <h1 class="title">Generador de partidas DILUVIO</h1>
    </div>
    <div class="PlayersTitleDiv">
            <h2 class="PlayersTitle">Selecciona a los jugadores:</h2>
    </div>
    <div class="Players">
        <?php
            $Players = [
                ['./img/serpiente_ficha.png', 'Serpiente'], 
                ['./img/zebra_ficha.png', 'Zebra'], 
                ['./img/oso_ficha.png', 'Oso'], 
                ['./img/hipo_ficha.png', 'Hipopotamo'],
                ['./img/leon_ficha.png', 'Leon'],
                ['./img/flamenco_ficha.png', 'Flamenco'],
            ];
            foreach($Players as $Player) {
                $class = 'Player ' . $Player[1]; 
                echo "<div class='$class'>";
                echo "<img src=$Player[0]>";
                echo "</div>";
            }
        ?>
    </div>
    <div class="ButtonDiv">
        <button class="GenerateButton Button" disabled>Generar</button>
    </div>
    <div class="sudoku">
        <?php
            echo "<div class='table'>";
            $myvar = "This is my variable";
            $sudokuLength = 7;
            for ($i=0 ; $i < $sudokuLength ; $i++)  { 
                echo "<div class='column $i'>";
                for ($e=0; $e < $sudokuLength; $e++) { 
                    echo "<div class='casilla $i-$e'></div>";
                }
                echo "</div>";
            }  
            echo "</div>";
        ?>
        <img class="tablero" src="./img/Tablero.png">
    </div>
    <div class="ButtonDiv">
        <button class="ResetButton Button" disabled>Resetear</button>
    </div>
    <script type="text/javascript" src="./jquery.js"></script>
    <script type="text/javascript" src="./script.js"></script>
 </body>
</html> 
