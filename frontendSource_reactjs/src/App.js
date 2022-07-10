import React, { Component } from 'react';
import './main.css';
import './adminPage.css';
import './lib/bootstrap.css';
import RouteSumm from './RoteSumm';
import LoginPage from './components/AdminPage/Login/LoginPage';
import DashboardAbout from './components/AdminPage/About/DashboardAbout';
import DashboardSkill from './components/AdminPage/Skills/DashboardSkills';
import DashboardPortfolio from './components/AdminPage/Portfolio/DashboardPortfolio';
import DashboardContact from './components/AdminPage/Contact/DashboardContact';
import DashboardSocial from './components/AdminPage/Social/DashboardSocial';
import DashboardStatistics from './components/AdminPage/Statistics/DashboardStatistics';
import {
  BrowserRouter as Router, 
  Route
} from "react-router-dom";


export default class App extends Component {
  render() {
    return (
      <Router>
          <Route path="/loGiNadmin" component={LoginPage}>
            
          </Route>
          <Route path="/dashboardAbout" component={DashboardAbout}>
            
          </Route>
          <Route path="/dashboardSkills" component={DashboardSkill}>
           
          </Route>
          <Route path="/dashboardPortfolio" component={DashboardPortfolio}>
            
          </Route>
          <Route path="/dashboardContact" component={DashboardContact}>
           
          </Route>
          <Route path="/dashboardSocial" component={DashboardSocial}>
            
          </Route>
          <Route path="/dashboardStatistics" component={DashboardStatistics}>
            
          </Route>
          <Route path="/" exact component={RouteSumm}>
           
          </Route>
      </Router>
    )
  }
}
