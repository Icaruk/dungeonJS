
var salas = {
	
	getSimbolo: function getSimbolo (idSala, y, x) {
		// salas.getSimbolo(2, 0, 0);
		return this[idSala].arrSala[y][x];
	},
	
	setSimbolo: function setSimbolo (idSala, y, x, idSimbolo) {
		// salas.getSimbolo(2, 0, 0, 4);
		this[idSala].arrSala[y][x] = idSimbolo;
	},
	
	
	
	"1": {
		arrSala: [
			[0, 0, 0, 6],
			[0, 0, 0, 0],
			[2, 2, 1, 0],
			[4, 0, 0, 0]
		],
		posInicial: [0,0]
	},
	
	"2": {
		arrSala: [
			[0, 0, 0, 0, 0],
			[0, 6, 0, 0, 0],
			[2, 2, 2, 2, 0],
			[0, 4, 0, 2, 0],
			[0, 0, 0, 0, 0]
		],
		posInicial: [0,0]
	},
	
	"3": {
		arrSala: [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[2, 2, 2, 2, 2, 2, 2, 0, 2, 2],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
			[0, 0, 0, 0, 0, 0, 0, 2, 6, 0],
			[0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
			[4, 0, 0, 0, 0, 0, 0, 2, 2, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		],
		posInicial: [0,0]
	},
	
	"4": {
		arrSala: [
			[0, 4, 2, 2, 2, 0, 0, 0, 0, 6],
			[0, 2, 0, 0, 0, 2, 0, 0, 0, 0],
			[0, 2, 0, 2, 0, 2, 0, 0, 0, 0],
			[0, 2, 0, 2, 0, 2, 0, 0, 0, 0],
			[0, 2, 2, 0, 0, 2, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		],
		posInicial: [0,0]
	}
	
	
};



function initSala (idSala) {
	
	idSala = Math.max (idSala, 1);
	
	
	// Si tengo modo infinito, genero la siguiente sala
	if (modoInfinito) {
		generaSala (idSala);
	};
	
	
	// Pillo values del objeto
	let arrSala = salas[idSala].arrSala;
	let posInicial = salas[idSala].posInicial;
	
	
	// Los meto en el el obj juego
	juego.sala = arrSala;
	juego.maxX = juego.sala[0].length -1;
	juego.maxY = juego.sala.length -1;
	juego.idSala = idSala;
	juego.posPlayer = posInicial;
	
	
	
	/*
	if (idSala > juego.maxIdSala) {
		alert("Has superado la última sala.");
	};
	*/
	
	
	muestraSala();
	
};



function generaSala (idSala) {
	/*
		Modifica la variable arrSala con la información de la sala.
		
			generaSala (5) // generará una sala y la colocará con idSala 5
			generaSala (6)
		
		A mayor sea el idSala más dificultad tendrá la sala.
	
	*/
	
	
	// Dificultad
	let columnas = Math.min (2 * idSala, 48);
	let filas = Math.min (2 * idSala, 36);
	
	
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
	
	
	// Meto la arrSala (todavía vacía) en el objeto salas
	salas[idSala] = {};
	salas[idSala].arrSala = arrSala;
	salas[idSala].posInicial = [0,0];
	
	
	// Le meto al bot en memoria la posición inicial
	bot.resetMemoria();
	bot.addMemoria([0, 0]);
	
	
	// Pongo elementos
	colocaRandom (idSala, [4, 6]); // llave y puerta
	
	if (idSala >= 2) {
		for (let i = 1; i < idSala; i++) {
			colocaRandom (idSala, [1]); // coloco muro
		};
	};
	
	if (idSala >= 4) {
		for (let i = 1; i < (idSala / 2); i++) {
			colocaRandom (idSala, [2]); // coloco trampa
		};
	};
	
	
	console.log(`Sala ${idSala} generada.`);
	
	
};



function colocaRandom(idSala, arrPorColocar, colocarEn = 0) {
	
	/*
		Coloca un idSimbolo en un lugar aleatorio de la sala.
		
		Params:
			idSala: NUMBER 			- Id de la sala.
			arrPorColocar: ARRAY 	- Símbolos que se van a meter.
			colocarEn: NUMBER 		- Sólo se podrá colocar un idSimbolo si coincide con esto.
			
		colocaRandom (2, [4, 6]) // En la sala 2, colocará un 4 y un 6 de forma aleatoria
	*/
	
	
	let maxY = juego.maxY;
	let maxX = juego.maxX;
	let colocando = true;
	
	let pruebaY;
	let pruebaX;
	
	// let arrPorColocar = [4, 6]; // objetos a colocar
	
	
	while (colocando) {
		
		pruebaY = random (maxY);
		pruebaX = random (maxX);
		
		
		// Sólo puedo colocar sobre vacío
		let target = salas.getSimbolo(idSala, pruebaY, pruebaX);
		
		if (salas.getSimbolo(idSala, pruebaY, pruebaX) == colocarEn) {
			salas.setSimbolo (idSala, pruebaY, pruebaX, arrPorColocar[0]); // coloco
			arrPorColocar.shift(); // quito el primer elemento
		};
		
		
		// Ya no queda nada por colocar
		if (arrPorColocar.length == 0) {
			colocando = false;
		};
		
		
	};
	
};

