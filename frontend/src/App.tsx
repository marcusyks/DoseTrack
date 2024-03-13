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
import UpdatePlanContainer from './containers/updatePlansContainer';
import SettingsContainer from './containers/settingsContainer';

function App() {
  return (
      <Routes>
        <Route path="/dashboard" element={<DashboardContainer/>} ></Route>
        <Route path="/login" element={<LoginContainer/>}></Route>
        <Route path="/" element={<DashboardContainer/>}></Route>
        <Route path="/createplan" element={<PlanContainer/>}></Route>
        <Route path="/plans" element={<UpdatePlanContainer/>}></Route>
        <Route path="/settings" element={<SettingsContainer/>}></Route>
      </Routes>
  );
}

export default App;
