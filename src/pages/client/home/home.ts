import { PRODUCTS } from "../../../data/data";
import { getCategories } from "../../../data/data";
import { logout } from "../../../utils/auth";
import { addToCart } from "../../../utils/cart";

let categoria_activa = "Todos";

const buttonLogout = document.getElementById(
  "logoutButton"
) as HTMLButtonElement;
buttonLogout?.addEventListener("click", () => {
  logout();
});

const cargarCategorias = getCategories();
console.log(cargarCategorias);

const dibujarCategorias = ()=>{
  const nav = document.getElementById("categorias");

  if (!nav) return;

  nav.innerHTML = "";

  const botonTodos = document.createElement("button");
  botonTodos.textContent = "Todos";
  botonTodos.className = categoria_activa === "Todos" ? "categoria_activa" : "";
  botonTodos.addEventListener("click", () => {
    categoria_activa = "Todos";
    dibujarCategorias();
    dibujarProductos();
  });
  nav.appendChild(botonTodos);

  cargarCategorias.forEach((categoria) =>{
    const boton = document.createElement("button")
    boton.textContent = categoria.nombre;

    boton.className = categoria.nombre === categoria_activa ? "categoria_activa" : "";

    boton.addEventListener("click", ()=>{
      categoria_activa = categoria.nombre;
      dibujarCategorias();
      dibujarProductos();
    })

    nav.appendChild(boton);
  });
};

const buscador = document.getElementById("buscador") as HTMLInputElement;

const dibujarProductos = ()=>{
  const main = document.getElementById("productos");

  if (!main) return;
  main.innerHTML = "";

  const productos_filtrados = PRODUCTS.filter(
    (producto) => {
    const coincide_categoria = producto.categorias.map((c) => c.nombre).includes(categoria_activa) ||
    categoria_activa === "Todos"

    const coincide_nombre = producto.nombre.toLocaleLowerCase().includes(buscador.value.toLocaleLowerCase());

    return coincide_categoria && coincide_nombre;
    
  });

  if (productos_filtrados.length === 0) {
    main.innerHTML = `<p class="sin-resultados">No se encontraron productos.</p>`;
  }

  productos_filtrados.forEach((producto) =>{
    const div = document.createElement("div")
    div.className = "producto-card";
    div.innerHTML = `
      <img class="card-img" width="300" src="${producto.imagen}"/>
      <div class="card-info">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p>$ ${producto.precio}</p>
        <button type="submit" data-id="${producto.id}">Agregar</button>
      </div>
    `

    main.appendChild(div);

    const botonAgregar = div.querySelector("button") as HTMLButtonElement;
    botonAgregar.addEventListener("click", () =>{
      addToCart(producto.id);
      botonAgregar.textContent = "Agregado";
      setTimeout(() => (botonAgregar.textContent = "Agregar"), 800);
    })
  });
};

  buscador.addEventListener("input", ()=>{

  dibujarProductos();
});

dibujarCategorias();
dibujarProductos();