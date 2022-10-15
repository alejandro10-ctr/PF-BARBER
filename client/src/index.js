import React from "react";
import { BrowserRouter, Switch} from "react-router-dom";
import ReactDOM from 'react-dom';
import App from "./App";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./redux/index.js";
import "./index.css";
// import dotenv from "dotenv";
// dotenv.config();


//para el deploy
axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Switch>
        <App />
      </Switch>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
