import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import { CartProvider } from './context/CartContext';

ReactDOM.render(
  <Provider store={store}>
    <CartProvider>
      <App />
    </CartProvider>
  </Provider>,
  document.getElementById('root')
);
