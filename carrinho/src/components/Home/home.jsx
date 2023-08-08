import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useHistory } from 'react-router-dom';

import './home.css';

function Home() {
  const history = useHistory();
  const [lanches, setLanches] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/lanches')
      .then(response => response.json())
      .then(data => setLanches(data))
      .catch(error => console.error('Erro ao buscar lanches:', error));

    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  useEffect(() => {
    const newTotalPrice = cartItems.reduce((total, item) => total + item.preco * item.quantity, 0);
    setTotalPrice(newTotalPrice);

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    const updatedCart = [...cartItems];
    const existingItem = updatedCart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      updatedCart.push({ ...item, quantity: 1 });
    }

    setCartItems(updatedCart);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div className="home">
      <h2>Os Melhores Lanches:</h2>
      <ul>
        {lanches && lanches.length > 0 ? (
          lanches.map(item => (
            <li key={item.id}>
              <h3>{item.nome}</h3>
              <img src={item.imagemUrl} alt={item.nome} />
              <p>{item.descricao}</p>
              <p>Peço: ${item.preco.toFixed(2)}</p>
              <button onClick={() => addToCart(item)}>Add to Cart</button>
            </li>
          ))
        ) : (
          <p>Loading lanches...</p>
        )}
      </ul>
      
      
      <animated.div style={{ opacity: showNotification ? 1 : 0 }} className="notification">
        Item Adicionado no carrinho!
      </animated.div>
    </div>
  );
}

export default Home;
