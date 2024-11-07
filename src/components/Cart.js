import React from 'react';
import useCartStore from '../store/useCartStore';
import { FaPlus, FaMinus } from 'react-icons/fa'; // For plus and minus icons
import { toast } from 'react-toastify';

const Cart = () => {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleRemoveFromCart = (productId, productName) => {
    removeFromCart(productId);
    toast.info(`${productName} removed from cart`, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items list-group">
            {cart.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="cart-item-info">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                  <div>
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                  </div>
                </div>

                <div className="cart-item-quantity">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <FaMinus />
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <FaPlus />
                  </button>
                </div>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-right font-bold">
            Total: ${calculateTotalPrice()}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
