
const bot = {
	
	memoria: [],
	prioridad: [],
	opciones: [],
	
	
	async initBot() {
		
		let v = 0;
		
		while (v < 1000) {
			
			// console.log(v);
			
			
			await uti.delayed(500, ()=> {
				this.miraAlrededor(); // pillo datos
				this.mueve(); // muevo
			});
			
			
			v++;
		};
		
	},
	
	
	getMemoria() {
		return this.memoria;
	},
	
	enMemoria(ele) {
		return uti.arrHas(this.memoria, ele);
	},
	
	addMemoria(ele) {
		
		if (uti.arrHas(this.memoria, ele)) {
			// console.log("Error: se ha intentado añadir un elemento a la memoria que ya exisitía.");
		} else {
			this.memoria.push(ele);
			// console.log("--- Memoria: ")
			// console.log(this.memoria);
			// console.log("---")
		};
		
	},
	
	resetMemoria() {
		this.memoria = [];
	},
	
	
	
	estaDentro (y, x) {
		/*
			Comprueba si las coordenadas están dentro de los límites de la sala.
			
			estaFuera (-1,-1)	// false
			estaFuera (1,1)		// true
		*/
		
		if (y > juego.maxY) {return false};
		if (x > juego.maxX) {return false};
		if (x < 0) {return false};
		if (y < 0) {return false};
		
		
		return true;
		
	},
	
	
	
	miraAlrededor() {
		/*
			Mira los símbolos que tiene arr, der, aba e izq (en ese orden) y devuelve el primero que esté vacío.
			bot.miraAlrededor()
		*/
		
		
		// Obtengo la posición del jugador y los límites
		let posPlayer = juego.posPlayer; // [y, x]
		let maxY = juego.maxY;
		let maxX = juego.maxX;
		
		let [posY, posX] = posPlayer;
		
		
		
		// Config
		let offsets = [
			[-1, 0],		// arr
			[0, 1],		// der
			[1, 0],	// aba
			[0, -1]		// der
		];
		
		let direcciones = [
			"arr",
			"der",
			"aba",
			"izq"
		];
		
		
		// Busco en qué direcciones puedo ir
		let simbolosBuenos = [0, 4, 6]; // vacío, llave, puerta
		
		
		let opciones = []; // aquí guardaré cada [[y,x], dirección]
		let idx = 0;
		
		for (let offset of offsets) {
			
			let y = posY + offset[0];
			let x = posX + offset[1];			
			
			
			if (bot.estaDentro (y, x)) { // está dentro de los límites
				if (simbolosBuenos.includes(getSimbolo (y, x))) { // es un símbolo bueno
					
					// console.log("*** Dirección: " + direcciones[idx]);
					
					if (!bot.enMemoria([y, x])) { // no está en su memoria
						// opciones.push([offset, direcciones[idx]]);
						opciones.push(direcciones[idx]);
						// console.log("No memoria");
					} else {
						// console.log("Sí memoria");
					};
					
					// console.log("*** ");
				};
			};
			
			
			idx ++;
			
		};
		
		
		// console.log("Opciones: " + opciones);
		this.opciones = opciones;
		// return (opciones);
		
		bot.getPrioridad();
		
	},
	
	
	
	getPrioridad () {
		/*
			Obtiene un array con la prioridad de las direcciones a las que debería de ir, primero para conseguir la llave y después para la puerta.
			
			bot.getPrioridad(); // devuelve algo como ["aba","der","arr","izq"]
		*/
		
		// Vars
		let coordenadasObjetivo = []; // aquí guardaré las coordenadas del lugar donde tengo que ir
		let idSimboloParaBuscar = 4; // en principio, busco la llave
		
		if (tengoLlave) { // si ya tengo llave
			idSimboloParaBuscar = 6; // busco la puerta
		};
		
		
		
		// Itero toda la matriz
		for (let i = 0; i <= juego.maxY; i++) { // recorro las FILAS
			
			let fila = juego.sala[i]; // fila
			
			
			for (let i2 = 0; i2 <= juego.maxX; i2++) { // recorro cada elemento de la fila
				
				let elemento = fila[i2];
				
				
				if (elemento == idSimboloParaBuscar) {
					coordenadasObjetivo = [i, i2];
				};
				
			};
		};
		
		
		
		// Calculo la diferencia entre 2 coordenadas
		let y_player = juego.posPlayer[0];
		let x_player = juego.posPlayer[1];
		
		let y_obj = coordenadasObjetivo[0];
		let x_obj = coordenadasObjetivo[1];
		
		
		let diferencia = [
			y_obj - y_player,
			x_obj - x_player
		];
		
		
		// Prioridad
		prioridad = [];
		
		
		// Saco la "fuerza" en el eje Y
		let fuerzaY = Math.abs (diferencia[0]);
		let dirY = "aba";
		let dirY2 = "arr";
		
		if (diferencia[0] < 0) {
			dirY = "arr";
			dirY2 = "aba";
		};
		
		
		// Saco la "fuerza" en el eje X
		let fuerzaX = Math.abs (diferencia[1]);
		let dirX = "der";
		let dirX2 = "izq";
		
		if (diferencia[1] < 0) {
			dirX = "izq";
			dirX2 = "der";
		};
		
		
		// Ordeno según fuerza
		if (fuerzaY > fuerzaX) {
			prioridad.push(dirY);
			prioridad.push(dirX);
			prioridad.push(dirY2);
			prioridad.push(dirX2);
		} else {
			prioridad.push(dirX);
			prioridad.push(dirY);
			prioridad.push(dirX2);
			prioridad.push(dirY2);			
		};
		
		
		// console.log ("Prioridad: " + prioridad);
		
		this.prioridad = prioridad;
		// return prioridad;
		
	},
	
	
	
	mueve() {
		/*
			Mueve al bot hacia la siguiente posición óptima.
			
			bot.mueve();
		*/
		
		let siguienteMovimiento = "";
		
		for (_x of this.prioridad) { // itero las prioridades
			if (this.opciones.includes(_x)) { // la prioridad está en mis opciones
				siguienteMovimiento = _x;
				break;
			};
		};
		
		
		
		if (siguienteMovimiento.length == 0) {
			console.log("¡Reset memoria!");
			this.resetMemoria();
			this.miraAlrededor();
			return;
		};
		
		// console.log("Sig mov: " + siguienteMovimiento);
		
		
		muevePlayer(siguienteMovimiento);
		
		
	}
	

};