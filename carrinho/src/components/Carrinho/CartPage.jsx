import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import Modal from 'react-modal';
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

    // Ative a notificação
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000); // 3000ms = 3 segundos
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

    // Ative a notificação
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000); // 3000ms = 3 segundos
  };

  const updatedTotalPrice = cartItems.reduce((total, item) => total + (item.preco * (item.quantity || 0)), 0);

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
            <h3>{item.nome}</h3>
            <p>{item.descricao}</p>
            <p>Price: ${item.preco.toFixed(2)}</p>
            <p>Quantity: {item.quantity || 0}</p>
            <button onClick={() => handleAddOne(item.id)}>+</button>
            <button onClick={() => handleRemoveOne(item.id)}>-</button>
          </li>
        ))}
      </ul>
      <p>Total: ${updatedTotalPrice.toFixed(2)}</p>

      <button onClick={() => setShowSummary(true)}>Finalizar Compra</button>

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
              <span>{item.nome} x{item.quantity}</span>
              <span>${(item.preco * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <p>Total: ${updatedTotalPrice.toFixed(2)}</p>
        <button onClick={() => setShowSummary(false)}>Fechar</button>
      </Modal>
    </div>
  );
}

export default CartPage;
