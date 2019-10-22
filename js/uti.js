
function log(...str) {
	console.log(str);
};



const uti = {
	
	minMax (n, min, max) {
		/*
			Limita un número por arriba y por abajo.
			
			uri.minMax (15, 0, 10); // devuelve 10
		*/
		
		return Math.max (Math.min (n, max), min);
	},
	
	random (min = 0, max = 100) {
		/*
			Genera un número aleatorio entre min y max.
			
			uti.random (1, 100) // devuelve entre 1 y 100
		*/
		
		return Math.floor (Math.random() * ((max + 1) - min) + min);
	},
	
	selectRandom (arr) {
		/*
			Selecciona un elemento aleatorio de entre todos los de un array.
			
			uti.selectRandom (["a", "b"]); // 50% de a y 50% de b
		*/
		
		return arr [uti.random (0, arr.length -1)];
	},
	
	delFromArr (arr, ele) {
		/*
			Elimina un elemento concreto del array.
			
			uti.delFromArr (miArray, elementoParaEliminar)
		*/
		
		let idx = arr.indexOf(ele);
		if (idx >= 0) {
			arr.splice(idx, 1);
		};
		
	},
	
	equalArr (arr1, arr2) {
		/*
			Devuelve si dos arrays son iguales.
			
			uti.equalArr(arr1, arr2);
		*/
		
		for (let i = 0; i < arr1.length; i++) {
			if (arr1[i] != arr2[i]) {
				return false;
			};
		};
		
		
		return true;
		
	},
	
	has (arr, ele) {
		/*
			Comprueba si el arr tiene el elemento ele.
			
			uti.has(miArray, miBusqueda)
		*/
		
		for (let _x of arr) {
			if (this.equalArr(_x, ele)) {
				return true;
			};
		};
		
		
		return false;
		
	},
	
	
	delayed (ms, fnc) {
		return new Promise (resolve => {
			setTimeout(fnc, ms);
			resolve("");
		});
	}
	
};

