
initSala = function (idSala) {
	
	cambiandoDeSala = true;
	
	let arrSala;
	let posInicial;
	
	switch (idSala) {
	
		case 1:
			arrSala = [
				[0, 0, 0, 6],
				[0, 0, 0, 0],
				[2, 2, 0, 0],
				[4, 0, 0, 0],
			];
			posInicial = [0,0];
			
		break;
		
		case 2:
			arrSala = [
				[0, 0, 0, 0, 0],
				[0, 6, 0, 0, 0],
				[2, 2, 2, 2, 0],
				[0, 4, 0, 2, 0],
				[0, 0, 0, 0, 0],
			];
			posInicial = [0,0];
			
		break;
		
		case 3:
			arrSala = [
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
			];
			posInicial = [0,0];
			
		break;
		
		case 4:
			arrSala = [
				[0, 4, 2, 2, 2, 0, 0, 0, 0, 6],
				[0, 2, 0, 0, 0, 2, 0, 0, 0, 0],
				[0, 2, 0, 2, 0, 2, 0, 0, 0, 0],
				[0, 2, 0, 2, 0, 2, 0, 0, 0, 0],
				[0, 2, 2, 0, 0, 2, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			];
			posInicial = [3,2];
			
		break;
			
	};	
	
	
	juego.sala = arrSala;
	juego.maxX = juego.sala[0].length -1;
	juego.maxY = juego.sala.length -1;
	juego.idSala = idSala;
	
	juego.posPlayer = posInicial;
	
	muestraSala();
	cambiandoDeSala = false;
	
};



