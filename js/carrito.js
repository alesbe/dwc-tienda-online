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
		this.articulos = this.articulos.filter(articulo => {
			return articulo.codigo != codigo;
		})
	}
	
	modificaUnidades(codigo, n) {
		let articuloIndex = this.articulos.findIndex(articulo => {
			return articulo.codigo == codigo;
		})

		if(this.articulos[articuloIndex].qty <= 1 && (n < 0)) {
			return;
		}

		this.articulos[articuloIndex].qty += n;
	}

	calcularPrecio() {
		return this.articulos.reduce((acc, curr) => {
			return acc + (curr.precio * curr.qty);
		}, 0);
	}
			
	verCarrito() {
		if(this.articulos.length <= 0) {
			alert("El carrito está vacio");
		} else {
			this.pintarArticulos();
		}
	}

	pintarArticulos() {
		// Pintar ID
		document.getElementById("idPedido").textContent = `id: ${this.id}`;

		// Pintar precio
		document.getElementById("total").textContent = `${this.calcularPrecio()}€`;

		// Pintar articulos
		let dialogContentEl = document.getElementById("dialogContent");
		dialogContentEl.innerHTML = "";

		document.getElementById("idPedido").textContent = `id: ${this.id}`;
		document.getElementById("total").textContent = `${this.calcularPrecio()}€`;

		// Build table head
		let tableEl = document.createElement("table");
		tableEl.classList.add("table");
		tableEl.classList.add("table-striped");

		let tHeadEl = document.createElement("thead");
		let trEl = document.createElement("tr");

		let tableHeaders = ["", "nombre", "descripcion", "precio", "unidades", ""];
		tableHeaders.forEach(header => {
			let thEl = document.createElement("th");
			thEl.scope = "col";
			thEl.textContent = header;

			trEl.appendChild(thEl)
		})
		tHeadEl.appendChild(trEl);
		tableEl.appendChild(tHeadEl);

		let tBodyEl = document.createElement("tbody");

		// Build table rows
		this.articulos.forEach(articulo => {
			let trEl = document.createElement("tr");
			let tdEl = document.createElement("td");

			// Articulo image
			let imgEl = document.createElement("img");
			imgEl.src = `assets/${articulo.codigo}.jpg`;
			imgEl.classList.add("c-dialog__image");

			tdEl.appendChild(imgEl);
			trEl.appendChild(tdEl);

			// Articulo name
			tdEl = document.createElement("td");
			tdEl.textContent = articulo.nombre;
			trEl.appendChild(tdEl);

			// Articulo descripcion
			tdEl = document.createElement("td");
			tdEl.textContent = articulo.descripcion;
			trEl.appendChild(tdEl);

			// Articulo precio
			tdEl = document.createElement("td");
			tdEl.textContent = articulo.precio;
			trEl.appendChild(tdEl);

			// Articulo unidades
			tdEl = document.createElement("td");
			tdEl.textContent = articulo.qty;
			trEl.appendChild(tdEl);

			// Articulo buttons
			tdEl = document.createElement("td");
			let buttonEl = document.createElement("button");
			buttonEl.textContent = "+";
			buttonEl.classList.add("btn");
			buttonEl.classList.add("btn-primary");
			buttonEl.addEventListener("click", () => {
				this.modificaUnidades(articulo.codigo, 1);
				this.pintarArticulos();
			})
			tdEl.appendChild(buttonEl);

			buttonEl = document.createElement("button");
			buttonEl.textContent = "-";
			buttonEl.classList.add("btn");
			buttonEl.classList.add("btn-warning");
			buttonEl.addEventListener("click", () => {
				this.modificaUnidades(articulo.codigo, -1);
				this.pintarArticulos();
			})
			tdEl.appendChild(buttonEl);

			buttonEl = document.createElement("button");
			buttonEl.textContent = "Borrar";
			buttonEl.classList.add("btn");
			buttonEl.classList.add("btn-danger");
			buttonEl.addEventListener("click", () => {
				this.borraArticulo(articulo.codigo);
				this.pintarArticulos();
			})
			tdEl.appendChild(buttonEl);

			trEl.appendChild(tdEl);

			tBodyEl.appendChild(trEl);
		});
		tableEl.appendChild(tBodyEl);

		dialogContentEl.appendChild(tableEl);

		document.getElementById("miDialogo").showModal();
	}
}

export { Carrito };