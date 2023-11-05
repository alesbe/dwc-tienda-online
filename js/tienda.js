import { Carrito } from './carrito.js';
import { listaArticulos } from './datos.js';

const criteriosOrdenacionEl = document.getElementById("criteriosOrdenacion");
const contenedorEl = document.getElementById("contenedor");
const verCarritoEl = document.getElementById("carrito-btn")

const criterios = ["Sin ordenar",
				"Ascendente por precio",
				"Descendente por precio"]

let sortedArticulos = [];

let carrito = {};

//
// Generar articulos
//
function sortArticulos(orden) {
	sortedArticulos = [...listaArticulos];

	switch (orden) {
		case "Sin ordenar":
			sortedArticulos = listaArticulos;
			break;

		case "Ascendente por precio":
			sortedArticulos.sort((a, b) => { return a.precio - b.precio })
			break;

		case "Descendente por precio":
			sortedArticulos.sort((a, b) => { return b.precio - a.precio })
			break;
	}

	return;
}

function pintaArticulos(orden) {
	sortArticulos(orden);

	contenedorEl.innerHTML = "";

	sortedArticulos.forEach(articulo => {
		let articuloContainerEl = document.createElement("div");
		articuloContainerEl.className = "col";

		let articuloEl = document.createElement("div");
		articuloEl.classList.add("card");

		let articuloImgEl = document.createElement("img");
		articuloImgEl.src = `../assets/${articulo.codigo}.jpg`;
		articuloImgEl.className = "card-img-top";

		let articuloBodyEl = document.createElement("div");
		articuloBodyEl.className = "card-body";

		let articuloTitleEl = document.createElement("h5");
		articuloTitleEl.className = "card-title";
		articuloTitleEl.textContent = articulo.nombre;

		let articuloTextEl = document.createElement("p");
		articuloTextEl.className = "card-text";
		articuloTextEl.textContent = articulo.descripcion;

		let articuloPriceBoldEl = document.createElement("b");
		let articuloPriceEl = document.createElement("p");
		articuloPriceEl.classList.add("card-text");
		articuloPriceEl.classList.add("text-center");
		articuloPriceEl.classList.add("fw-bold");
		articuloPriceEl.textContent = `${articulo.precio}€`;
		articuloPriceBoldEl.appendChild(articuloPriceEl);

		let articuloButtonEl = document.createElement("button");
		articuloButtonEl.classList.add("btn-success");
		articuloButtonEl.id = articulo.codigo;
		articuloButtonEl.addEventListener("click", () => {
			ponArticuloEnCarrito(articulo);
		})
		articuloButtonEl.textContent = "Comprar";

		articuloBodyEl.appendChild(articuloTitleEl);
		articuloBodyEl.appendChild(articuloTextEl);
		articuloBodyEl.appendChild(articuloPriceBoldEl);

		articuloEl.appendChild(articuloImgEl);
		articuloEl.appendChild(articuloBodyEl);
		articuloEl.appendChild(articuloButtonEl);

		articuloContainerEl.appendChild(articuloEl)

		contenedorEl.appendChild(articuloContainerEl);
	})
}

function pintaListaCriterios() {
	// Fill select
	criterios.forEach(criterio => {
		let criterioEl = document.createElement("option");
		criterioEl.textContent = criterio;
		criterioEl.value = criterio;

		criteriosOrdenacionEl.appendChild(criterioEl)
	})

	// Add onchange
	criteriosOrdenacionEl.addEventListener("change", () => {
		pintaArticulos(criteriosOrdenacionEl.value);
	})
}

//
// Funciones onclick
//
function ponArticuloEnCarrito(articulo) {
	carrito.anyadeArticulo(articulo);
}

function verCarrito() {
	carrito.verCarrito();
}

function pintarArticulosCarrito() {

}

function efectuaPedido() {

}

window.onload=()=> {
	pintaListaCriterios();

	carrito = new Carrito(1);
	verCarritoEl.addEventListener("click", () => { verCarrito() })

	pintaArticulos(criteriosOrdenacionEl.value);
}