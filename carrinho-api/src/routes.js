import Home from '../src/components/Home/home';
import CartPage from '../src/components/Carrinho/CartPage'; // Importe o componente CartPage

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/carrinho', 
    exact: true,
    component: CartPage, 
  },
];

export default routes;
