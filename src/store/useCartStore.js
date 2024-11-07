import { create } from 'zustand'; // Named import

const useCartStore = create((set) => ({
  cart: [],
  addToCart: (product) => set((state) => {
    const productIndex = state.cart.findIndex(item => item.id === product.id);
    if (productIndex >= 0) {
      // If product already exists in cart, increase quantity
      const updatedCart = [...state.cart];
      updatedCart[productIndex].quantity += 1;
      return { cart: updatedCart };
    }
    // If product is not in cart, add it with quantity 1
    return { cart: [...state.cart, { ...product, quantity: 1 }] };
  }),
  removeFromCart: (productId) => set((state) => {
    const updatedCart = state.cart.filter(item => item.id !== productId);
    return { cart: updatedCart };
  }),
  updateQuantity: (productId, quantity) => set((state) => {
    const updatedCart = state.cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
    return { cart: updatedCart };
  }),
}));

export default useCartStore;
