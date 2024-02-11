import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const localCart = localStorage.getItem("cart");
    return localCart ? JSON.parse(localCart) : [];
  });

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const isRoomAlreadyInCart = (roomId) => {
    return cart.some((item) => item.roomId === roomId);
  };

  const addToCart = (room) => {
    (cart.length === 0 || !isRoomAlreadyInCart(room.roomId)) &&
      setCart((prevCart) => {
        const updatedCart = [...prevCart, room];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      });
  };

  const removeFromCart = (roomId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((room) => room.roomId !== roomId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const getCartTotalPrice = () => {
    const totalCost = cart.reduce((total, room) => total + room.price, 0);
    return {
      totalCost,
    };
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        getCartTotalPrice,
        clearCart,
        isRoomAlreadyInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;

CartContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
