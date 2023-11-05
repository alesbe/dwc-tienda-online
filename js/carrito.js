class Carrito{
	constructor(id) {
		this.id = id;
		this.articulos = [];
	}
						
	anyadeArticulo(articulo) {
		let articuloIndex = this.articulos.findIndex(art => art.codigo === articulo.codigo);

		// Si existe el articulo en el carrito, sumale +1 a la cantidad. Si no, añadele el campo cantidad y añadelo al carrito.
		if (articuloIndex != -1) {
			this.articulos[articuloIndex].qty += 1;
			
		} else {
			articulo.qty = 1;
			this.articulos.push(articulo);
		}
	}
				
	borraArticulo(codigo) {
		this.articulos.filter(articulo => {
			articulo.codigo != codigo;
		})
	}
	
	modificaUnidades(codigo, n) {

	}

	calcularPrecio() {
		return this.articulos.reduce((acc, curr) => {
			return acc + curr.precio;
		}, 0);
	}
			
	verCarrito() {
		document.getElementById("idPedido").textContent = `id: ${this.id}`;
		document.getElementById("total").textContent = `${this.calcularPrecio()}€`;

		// Pintar articulos
		
		document.getElementById("dialogContent").innerHTML = "";

		if(this.articulos.length <= 0) {
			let notFoundText = document.createElement("p");
			notFoundText.classList.add("text-center");
			notFoundText.classList.add("font-italic");
			notFoundText.textContent = "No tienes productos añadidos al carrito :(";

			document.getElementById("dialogContent").appendChild(notFoundText);
		} else {
			this.pintarArticulos();
		}

		document.getElementById("miDialogo").showModal();
	}
	
	pintarArticulos() {
		let dialogContentEl = document.getElementById("dialogContent");

		let tableEl = document.createElement("table");
		tableEl.classList.add("table");
		tableEl.classList.add("table-striped");

		let tHeadEl = document.createElement("thead");
		let trEl = document.createElement("tr");

		let thEl = document.createElement("th");
		thEl.scope = "col";

		thEl.textContent = ""
		tHeadEl.appendChild(thEl)

		thEl.textContent = "nombre"
		tHeadEl.appendChild(thEl)

		thEl.textContent = "descripcion"
		tHeadEl.appendChild(thEl)

		thEl.textContent = "precio"
		tHeadEl.appendChild(thEl)

		thEl.textContent = "unidades"
		tHeadEl.appendChild(thEl)

		thEl.textContent = "total"
		tHeadEl.appendChild(thEl)

		thEl.textContent = "asd"
		tHeadEl.appendChild(thEl)

		tableEl.appendChild(tHeadEl);


		dialogContentEl.appendChild(tableEl);
	}

}

export { Carrito };