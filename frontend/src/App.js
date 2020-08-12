import React from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Register from './components/Register/Register';
import Login from './components/Login/Login';

const App = () => {
  const CustomAppBar = withStyles({
    root: {
      // background: 'linear-gradient(90deg, #006A25, #69C08A)',
      background: 'linear-gradient(90deg, #464646, #ACACAC)',
    }
  })(AppBar);

  const CustomButton = withStyles ({
    root: {
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
      },
      textTransform: 'none',
      fontSize: '16px'
    },
    colorInherit: {
      width: '4vw',
    }
  })(Button);

  return (
    <div className = "app">
      <Router>
        <CustomAppBar position = "static">
          <Toolbar>
            <Typography variant = "h6">
              <Link to = "/" underline = "none" className = "link">
                MoneyTree
              </Link>
            </Typography>

            <CustomButton color = "inherit" style = {{position: 'absolute', right: '1.5%'}}>
              <Link to = "/login" underline = "none" className = "link">
                Login
              </Link>
            </CustomButton>
          </Toolbar>
        </CustomAppBar>
      
        <Route exact path = "/" component = {Home}/>
        <Route exact path = "/dashboard" component = {Dashboard}/>
        <Route exact path = "/register" component = {Register}/>
        <Route exact path = "/login" component = {Login}/>
      </Router>
    </div>
  );
}

export default App;
