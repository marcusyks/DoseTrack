import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Auth0Provider
    domain="dev-n2hyefo7c1wli6fo.us.auth0.com"
    clientId="t3eI63vagc8zGmyqEFb1LurMZNSj5LQu"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://dev-n2hyefo7c1wli6fo.us.auth0.com/api/v2/",
      scope:"profile email read:current_user update:current_user_metadata"
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
