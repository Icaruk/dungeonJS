
// Variables globales
var juego = {
	
	"sala": [], // [[fila1], [fila2], [fila3]] --> [simbolo1, simbolo2...]
	"idSala": 0,
	"maxY": 0,
	"maxX": 0,
	
	"posPlayer": [], // [y, x]
	"vidaPlayer": 5,
	
	
	sumaVidaPlayer: function (n) {
		/*
			Suma o resta vida al jugador.
			
			juego.sumaVidaPlayer(1) // cura 1 de vida
			juego.sumaVidaPlayer(-1) // quita 1 de vida
		*/
		
		
		let vidaActual = this.vidaPlayer;
		vidaActual = Math.max ( vidaActual, 0); // limito por debajo a 0
		
		this.vidaPlayer = vidaActual;
		
	}
	
};


var tengoLlave = false;
var cambiandoDeSala = false;



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
	juego.maxX = columnas - 1;
	juego.maxY = filas - 1;
	
	
	// Defino un fila
	let fila = [];
	
	
	// Rellenar la fila con columnas
	for (let i2 = 0; i2 < columnas; i2++) {
		fila.push (0);
	};		
	
	
	// Copio la fila en el array N veces
	for (let i1 = 0; i1 < filas; i1++) {
		arrSala.push ([...fila]); // rompo pointer
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
		let strHtml = ""; 		// gran string que se meterá al html
		let strFila; 			// string temporal que contiene los símbolos de una fila
		let strTecho = ""; 		// string que contiene el techo
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
			
			posX = 0;
			strFila = "";
			
			for (let _x2 of _x) { // _x2 --> símbolo
				
				strSimbolo = "";
				
				
				if ([posY, posX].toString() == juego.posPlayer.toString()) {
					
					strSimbolo = "O ";
					strSimbolo = '<span style="color: blue">O </span>'
					pisando ();
					
				} else {
					strSimbolo = diccionario(_x2);
				};
				
				
				if ([posY, posX].toString() == "[0,0]") {
					strSimbolo = "X";
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
		
		0: ". ",		// vacío
		
		2: "X ",		// trampa
		
		4: "¬ ",		// llave
		5: "# ",		// cofre
		6: "[]"			// puerta
		
	};
	
	
	// TO-DO ERRORES
	return info[symbol]
	
};



function pisando () {
	// Comprueba qué está pisando el jugador en su posición actual
	
	let idSimbolo = juego.sala [juego.posPlayer[0]] [juego.posPlayer[1]];
	
	
	// X
	if (idSimbolo == 2) {
		juego.sumaVidaPlayer(-1);
		alert("Has perdido 1 de vida");
	};
	
	if (idSimbolo == 4) {
		tengoLlave = true;
		setSimbolo (juego.posPlayer[0], juego.posPlayer[1], 0);
	};
	
	if (idSimbolo == 6) {
		
		if (tengoLlave) {
			tengoLlave = false;
			initSala(juego.idSala + 1);
		};
		
	};

	
};



function getSimbolo (y, x) {
	return juego.sala[y][x];
};



function setSimbolo (y, x, idSimbolo) {
	juego.sala[y][x] = idSimbolo;
};



function muevePlayer (dir) {
	/*
		Modifica las coordenadas del jugador según lo indicado
		
		muevePlayer("arr")
		muevePlayer("aba")
		muevePlayer("izq")
		muevePlayer("der")
	*/
	
	let cambio; // [y, x]
	
	
	switch (dir) {
		
		case "arr": {
			cambio = [-1, 0];
			break;
		};

		case "aba": {
			cambio = [1, 0];
			break;
		};

		case "izq": {
			cambio = [0, -1];
			break;
		};
		
		case "der": {
			cambio = [0, 1];
			break;
		};
		
		default: 
			cambio = [0, 0];
		
	};
	
	
	
	let posPlayer = juego.posPlayer; // [y, x]
	posPlayer[0] = Math.max (Math.min (posPlayer[0] + cambio[0], juego.maxY), 0);
	posPlayer[1] = Math.max (Math.min (posPlayer[1] + cambio[1], juego.maxX), 0);
	
	juego.posPlayer = posPlayer;
	
	
	muestraSala();
	
};



function pulsaTecla (e) {
	
	let key = e.key;
	
	
	if (!cambiandoDeSala) {
		
		switch (true) {
			
			case ["w", "ArrowUp"].includes(key):
				muevePlayer("arr");
			break;
			
			case ["s", "ArrowDown"].includes(key):
				muevePlayer("aba");
			break;
			
			case ["a", "ArrowLeft"].includes(key):
				muevePlayer("izq");
			break;
			
			case ["d", "ArrowRight"].includes(key):
				muevePlayer("der");
			break;
			
		};
	
	};
	
	
};




// ---------------------- Fin funciones ----------------------

// EHs
document.addEventListener("keydown", pulsaTecla)


// Init
// generaSala(8, 8);
initSala(1);


