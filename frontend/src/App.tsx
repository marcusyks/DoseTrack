// import React from 'react';
// import logo from './logo.svg';
import './index.css';
import {
  Route,
  Routes,
} from "react-router-dom";
import {DashboardContainer} from './containers/dashboardContainer';
import LoginContainer from './containers/loginContainer';
import PlanContainer from './containers/planContainer';

function App() {
  return (
      <Routes>
        <Route path="/dashboard" element={<DashboardContainer/>} ></Route>
        <Route path="/login" element={<LoginContainer/>}></Route>
        <Route path="/" element={<DashboardContainer/>}></Route>
        <Route path="/plan" element={<PlanContainer/>}></Route>
      </Routes>
  );
}

export default App;
