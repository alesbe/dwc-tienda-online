class Carrito{
	constructor(id) {
		this.id = id;
		this.articulos = [];
	}
						
	anyadeArticulo(articulo) {
		this.articulos.push(articulo);
	}
				
	borraArticulo(codigo) {

	}
	
	modificaUnidades(codigo, n) {

	}

	calcularPrecio() {
		// TODO: Fix calcular precio

		console.log(this.articulos);
		return this.articulos.reduce((acc, curr) => {
			console.log(acc, curr);
			acc.precio + curr.precio;
		}, 0);
	}
			
	verCarrito() {
		document.getElementById("idPedido").textContent = this.id;
		document.getElementById("total").textContent = this.calcularPrecio();

		document.getElementById("miDialogo").showModal();
	}

}

export { Carrito };