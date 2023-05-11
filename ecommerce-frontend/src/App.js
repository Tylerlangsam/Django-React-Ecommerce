import React from 'react';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import { Router } from '@material-ui/icons';

function App() {
  return (
    <Router>
      <h1>E-Commerce Store</h1>
      <Route path="/" exact component={ProductList} />
      <Route path="/product/:id" component={ProductDetail} />
    </Router>
  );
}

export default App;
