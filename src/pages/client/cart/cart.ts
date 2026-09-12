import { PRODUCTS } from "../../../data/data";
import { getCartItems, calculateTotal } from "../../../utils/cart";
import { updateQuantity } from "../../../utils/cart";

const dibujarCarrito = () => {
  const contenedor = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");
  if (!contenedor || !totalEl) return;

  const cart = getCartItems();
  contenedor.innerHTML = "";

  if (cart.length === 0) {
    contenedor.innerHTML = `<p>Tu carrito está vacío.</p>`;
    totalEl.textContent = "0";
    return;
  }

  cart.forEach((item) => {
    const producto = PRODUCTS.find((p) => p.id === item.productoId);
    if (!producto) return;

    const div = document.createElement("div");
    div.className = "producto-card";
    div.innerHTML = `
        <img class="card-img" width="300" src="${producto.imagen}"/>
        <div class="card-info">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <div class="gestionar-cantidad">
                <button class="btn-restar" data-id="${producto.id}"> - </button>
                <p>Cantidad: ${item.cantidad}</p>
                <button class="btn-sumar" data-id="${producto.id}"> + </button>
            </div>
            <p class="subtotal-cart">Subtotal: $${producto.precio * item.cantidad}</p>

        </div>
    `;
    contenedor.appendChild(div);

    const botonSumar = div.querySelector(".btn-sumar") as HTMLButtonElement;
        botonSumar.addEventListener("click", () =>{
        updateQuantity(item.productoId, item.cantidad+1);
        dibujarCarrito();
    })

    const botonRestar = div.querySelector(".btn-restar") as HTMLButtonElement;
        botonRestar.addEventListener("click", () =>{
        updateQuantity(item.productoId, item.cantidad-1);
        dibujarCarrito();
    })

  });

  totalEl.textContent = calculateTotal().toString();
};

dibujarCarrito();
