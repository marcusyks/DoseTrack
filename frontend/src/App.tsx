// import React from 'react';
// import logo from './logo.svg';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {DashboardContainer} from './containers/dashboardContainer';
import LoginContainer from './containers/loginContainer';


const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardContainer/>,
  },
  {
    path: "/login",
    element: <LoginContainer/>
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
