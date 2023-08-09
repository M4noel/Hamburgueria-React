import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './routes';
import Header from './components/Header/Header';
import Footer from './components/Footer/footer'; // Importe o componente Footer

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content-area p-5">
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))}
          </Switch>
        </div>
        <Footer /> 
      </div>
    </Router>
  );
}

export default App;
