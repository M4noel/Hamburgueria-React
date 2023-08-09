import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useHistory } from 'react-router-dom';

import './home.css';

function Home() {
  const history = useHistory();
  const [combos, setCombos] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/combos')
      .then(response => response.json())
      .then(data => setCombos(data))
      .catch(error => console.error('Erro ao buscar combos:', error));

    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  useEffect(() => {
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
      <h2>Os Melhores Combos:</h2>
      <ul>
        {combos && combos.length > 0 ? (
          combos.map(combo => (
            <li key={combo.id}>
              <h3>{combo.name}</h3>
              <img src={`http://localhost:3000/${combo.src}`} alt={combo.name} />
              <p>{combo.description}</p>
              {combo.price !== undefined ? (
                <p className="combo-price">Preço: R$ {combo.price.toFixed(2)}</p>
              ) : (
                <p>Preço não definido</p>
              )}
              <button onClick={() => addToCart(combo)}>Adicionar ao carrinho</button>
            </li>
          ))
        ) : (
          <p>Carregando combos...</p>
        )}
      </ul>

      <animated.div style={{ opacity: showNotification ? 1 : 0 }} className="notification">
        Adicionado ao Carrinho!
      </animated.div>
    </div>
  );
}

export default Home;
