
// Variables globales
var juego = {
	
	"sala": [], // [[fila1], [fila2], [fila3]] --> [simbolo1, simbolo2...]
	"idSala": 0,
	"maxIdSala": 4,
	
	"maxY": 0,
	"maxX": 0,
	
	"posPlayer": [], // [y, x]
	"vidaPlayerInicial": 5,
	"vidaPlayer": 5,
	
	
	setPosPlayer: function (newY, newX) {
		/*
			Establece la posición del jugador a una nueva.
			
			juego.setPosPlayer(y, x)
		*/
		
		this.posPlayer = [newY, newX];		
	},
	
	sumaVidaPlayer: function (damage) {
		/*
			Suma o resta vida al jugador.
			
			juego.sumaVidaPlayer(1) 	// cura 1 de vida
			juego.sumaVidaPlayer(-1) 	// quita 1 de vida
		*/
		
		
		let vidaActual = this.vidaPlayer;
		vidaActual = Math.max ( vidaActual, 0); // limito por debajo a 0
		
		this.vidaPlayer = vidaActual + damage;
		
		
		if (this.vidaPlayer <= 0) {
			alert("Has muerto.");
			
			this.vidaPlayer = this.vidaPlayerInicial;
			initSala(juego.idSala - 1);
		};
		
		
	}
	
};


var modoInfinito = false;
var tengoLlave = false;
var bloqueaMovimiento = false;


/* Esquema array juego.sala

	[
		[0, 0, 0], 	// fila 1
		[0, 0, 2], 	// fila 2
		[0, 0, 0] 	// fila 3
	]

*/



// ---------------------- Funciones ----------------------



function diccionario (symbol) {
	/*
		Traduce un símbolo a otro legible
		
		diccionario(0) // devuelve ". "
	*/
	
	
	let info = {
		
		0: ". ",		// vacío
		1: "▒ ",		// muro
		2: "X ",		// trampa
		
		4: "¬ ",		// llave
		5: "# ",		// cofre
		6: "[]"		// puerta
		
	};
	
	
	// TO-DO ERRORES
	return info[symbol]
	
};



function random (max, min = 0) {
	/*
		Genera un número aleatorio.
		
		random (10) 	// de 0 al 10
		ranodm (12, 2)	// del 2 al 12
	*/
	
	
	return min + (Math.ceil ((Math.random()) * (max - min)))
	
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



function pisando () {
	// Comprueba qué está pisando el jugador en su posición actual
	
	let idSimbolo = juego.sala [juego.posPlayer[0]] [juego.posPlayer[1]];
	
	
	switch (idSimbolo) {
		
		// X (trampa)
		case 2:
			alert("Has perdido 1 de vida. Vida actual: " + juego.vidaPlayer);
			juego.sumaVidaPlayer(-1);
		break;
		
		// ¬ (llave)
		case 4:
			tengoLlave = true;
			bot.resetMemoria(); // borro la memoria al bot
			setSimbolo (juego.posPlayer[0], juego.posPlayer[1], 0);
		break;
		
		// [] (puerta)
		case 6:
			if (tengoLlave) {
				tengoLlave = false;
				initSala(juego.idSala + 1);
			};
		break;
		
	};
	
};



function pisare (posY, posX) {
	/*
		Comprueba qué estoy a punto de pisar
		
		
	*/
	
	let idSimbolo = getSimbolo (posY, posX);
	
	
	// Muro
	switch (idSimbolo) {
		
		// Muro
		case 1:
			bloqueaMovimiento = true;
		break;
		
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
	
	
	
	// Calculo posiciones
	let posPlayer = juego.posPlayer; // [y, x]
	
	let newY = Math.max (Math.min (posPlayer[0] + cambio[0], juego.maxY), 0);
	let newX = Math.max (Math.min (posPlayer[1] + cambio[1], juego.maxX), 0);
	
	
	// Compruebo qué estoy a punto de pisar
	pisare (newY, newX);
	
	
	// Establezco las nuevas posiciones
	if (bloqueaMovimiento) {
		bloqueaMovimiento = false;
	} else {
		juego.setPosPlayer(newY, newX)
	};
	
	
	// Guardo en memoria
	bot.addMemoria([newY, newX]);
	
	
	// Compruebo qué estoy pisando
	pisando ();
	
	
	// Refresco sala
	muestraSala();
	
	
};



function pulsaTecla (e) {
	
	let key = e.key;
	
	console.log("Tecla: " + key);
	
	
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
		
		case [" "].includes(key): 
			bot.miraAlrededor(); // pillo datos
			bot.mueve(); // muevo
		break;
		
	};
	
};



// ---------------------- Fin funciones ----------------------

// EHs
document.addEventListener("keydown", pulsaTecla)


// Init
generaSala(2);
initSala(2);
modoInfinito = true;

// bot.initBot();






