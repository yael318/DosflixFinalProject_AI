import 'index.css'
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { authSlice } from './redux/authSlice';
import {cartSlice} from './redux/cartSlice';
import  {myStore}  from './myStore';
const root = ReactDOM.createRoot(document.getElementById('root')!);


const store=configureStore({
  reducer:combineSlices(authSlice,cartSlice)
})
root.render(
  <React.StrictMode>
    <Provider store={myStore}>
    <GoogleOAuthProvider clientId="755010812838-vqifsodhonko3imhfhtn85d831b0irnm.apps.googleusercontent.com">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
