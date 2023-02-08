import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>

    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
    />
    <a
      href="https://api.whatsapp.com/send?phone=593993273984&text=Hola!%20Quisiera%20mas%20infromaci%C3%B3n%20%20sobre%20sus%20productos%20y%20servicios."
      class="float"
      target="_blank"
    >
      <i class="fa fa-whatsapp my-float"></i>
    </a>
  </Provider>
);
