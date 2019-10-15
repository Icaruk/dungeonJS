
// Variables globales
var juego = {
	
	"sala": [],
	"posPlayer": []
	
};


/* Esquema array juego.sala

	[
		[0, 0, 0], 	// fila 1
		[0, 0, 2], 	// fila 2
		[0, 0, 0] 	// fila 3
	]

*/



// ---------------------- Funciones ----------------------

function generaSala (columnas, filas) {
	/*
		Modifica la variable arrSala con la información de la sala.
		
		generaSala (10, 10) // hará una sala de 10x10
		generaSala (5, 10) // hará una sala de 5x10
	
	*/
	
	
	// Declaro la sala
	let arrSala = [];
	
	
	// Defino un fila
	let fila = [];
	
	
	// Rellenar la fila con columnas
	for (let i2 = 0; i2 < columnas; i2++) {
		fila.push (0);
	};		
	
	
	// Copio la fila en el array N veces
	for (let i1 = 0; i1 < filas; i1++) {
		arrSala.push (fila);
	};
	
	
	juego.sala = arrSala;
	
};



function muestraSala (conConsola = false) {
	/*
		muestraSala() 			// sin consola
		muestraSala(true) 		// con consola
	*/
	
	
	if (conConsola) {
	
		for (let _x of juego.sala) {
			console.log (_x);
		};
		
	} else {
		
		// Variables
		let strHtml = ""; // gran string que se meterá al html
		let strFila; // string temporal que contiene los símbolos de una fila
		let strTecho = ""; // string que contiene el techo
		let strSimbolo = "";
		
		
		// Generamos "techo"
		for (let _x of juego.sala[0]) {
			strTecho += "--";
		};
		
		
		// Metemos el "techo"
		strHtml += strTecho + "<br/>";
		
		
		// Generamos string
		let posX = 0;
		let posY = 0;
		
		for (let _x of juego.sala) { // _x --> fila
			
			posY = 0;
			strFila = "";
			
			for (let _x2 of _x) { // _x2 --> símbolo
				
				strSimbolo = "";
				
				/*
				console.log([posY, posX].toString());
				console.log(juego.posPlayer.toString());
				console.log("-----");
				*/
				
				if ([posY, posX].toString() === juego.posPlayer.toString()) {
					strSimbolo = "O";
					console.log("ECASLKHDKAJSHD");
					console.log([posY, posX]);
					
					
				} else {
					strSimbolo = diccionario(_x2);
				};
				
				
				strFila += strSimbolo; // genero la fila de símbolos con el espacio corrector añadido
				posX++;
				
			};
			
			
			strHtml += strFila + "<br/>"; // concateno la fila de símbolos al array gordo
			posY ++;
			
		};
		
		
		// Metemos el "suelo"
		strHtml += strTecho;
		
		
		// Lo metemos todo en el HTML
		document.getElementById("sala").innerHTML = strHtml;
		
	};
	
	
};



function diccionario (symbol) {
	/*
		Traduce un símbolo a otro legible
		
		diccionario(0) // 
	*/
	
	
	let info = {
		0: " ",		// vacío
		2: "X"
	};
	
	// TO-DO ERRORES
	return info[symbol]
	
};


function muevePlayer (dir) {
	/*
		Modifica las coordenadas del jugador según lo indicado
		
		muevePlayer("arr")
		muevePlayer("aba")
		muevePlayer("izq")
		muevePlayer("der")
	*/
	
	let cambio;
	
	
	switch (dir) {
		
		case "arr": {
			cambio = [0, 1];
			break;
		};

		case "aba": {
			cambio = [0, -1];
			break;
		};

		case "izq": {
			cambio = [-1, 0];
			break;
		};
		
		case "der": {
			cambio = [1, 0];
			
			console.log("ANTES: " + juego.posPlayer);
			juego.posPlayer[0] = 3;
			juego.posPlayer[1] = 3;
			console.log("DESP: " + juego.posPlayer);
			
			break;
		};
		
		default: 
			cambio = [0, 0];
		
	};
	
	/*
	let posPlayer = juego.posPlayer; // [x, y]
	posPlayer[0] = posPlayer[0] + cambio[1];
	posPlayer[1] = posPlayer[1] + cambio[0];
	
	juego.posPlayer = posPlayer;
	*/
	
	muestraSala();
	
};



// ---------------------- Fin funciones ----------------------



// Init
generaSala(7, 5);
juego.posPlayer = [0, 0];
muestraSala();


muevePlayer("der");




//console.log(arrSala);