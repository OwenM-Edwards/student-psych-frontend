import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import './index.css';
import App from './App';
import store from "./redux/store/index";
import { BrowserRouter as Router } from "react-router-dom";

render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);
