import type { ICartItem } from "../types/product";
import { PRODUCTS } from "../data/data";

const CART_KEY = "cart";

export const getCartItems = (): ICartItem[] => {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data): [];
};

const saveCart = (cart: ICartItem[]) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToCart = (productoId: number) => {
    const cart = getCartItems();
    const item = cart.find((i) => i.productoId === productoId);

    if (item) {
        item.cantidad += 1;
    } else {
        cart.push({productoId, cantidad: 1});
    }

    saveCart(cart);
}

export const updateQuantity = (productoId: number, cantidad: number) => {
  const cart = getCartItems();
  const item = cart.find((i) => i.productoId === productoId);
  if (!item) return;

  item.cantidad = cantidad;
  saveCart(cart.filter((i) => i.cantidad > 0));
};

export const calculateTotal = (): number => {
  const cart = getCartItems();
  return cart.reduce((total, item) => {
    const producto = PRODUCTS.find((p) => p.id === item.productoId);
    if (!producto) return total;
    return total + producto.precio * item.cantidad;
  }, 0);
};
