import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import './CartPage.css';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  const handleAddOne = (itemId) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: (item.quantity || 0) + 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const handleRemoveOne = (itemId) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === itemId && item.quantity > 0) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }).filter(item => item.quantity > 0);

    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  // Simulated function to retrieve item prices by id
  const retrieveItemPriceById = (itemId) => {
    // Replace this with your actual logic to retrieve item prices
    // For example, you could maintain a separate array or object of item prices
    // and use it to look up the price based on the item id.
    // For demonstration purposes, I'm returning a dummy value here.
    return 10.99; // Replace with actual price retrieval logic
  };

  // Calculate the total price of the items in the cart
  const updatedTotalPrice = cartItems.reduce((total, item) => {
    const itemPrice = retrieveItemPriceById(item.id);
    return total + (itemPrice * (item.quantity || 0));
  }, 0);

  const notificationAnimation = useSpring({
    opacity: showNotification ? 1 : 0,
    transform: showNotification ? 'translateY(0)' : 'translateY(100%)',
  });

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  };

  return (
    <div className="cart-page">
      <h1>Seu Carrinho</h1>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p className='qtd'>Quantidade: {item.quantity || 0}</p>
            <button onClick={() => handleAddOne(item.id)}>+</button>
            <button onClick={() => handleRemoveOne(item.id)}>-</button>
          </li>
        ))}
      </ul>
      <p className='total'>Total Price: ${updatedTotalPrice.toFixed(2)}</p>

      <button onClick={() => setShowSummary(true)} className='finalizar'>Visualizar Pedido </button>

      <animated.div style={notificationAnimation} className="notification">
        Item Adicionado no carrinho!
      </animated.div>

      <Modal 
        isOpen={showSummary}
        onRequestClose={() => setShowSummary(false)}
        style={customStyles}
        contentLabel="Resumo do Pedido"
      >
        <h2>Resumo do Pedido</h2>
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              <span>{item.name} x{item.quantity}</span>
            </li>
          ))}
        </ul>
        <p className='totalPreco'>Total: ${updatedTotalPrice.toFixed(2)}</p>
        <button onClick={() => setShowSummary(false)} className='close'>X</button>
        <button className='pagar'>Pagar</button>
      </Modal>
    </div>
  );
}

export default CartPage;
