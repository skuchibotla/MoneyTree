import React from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Dashboard from './components/Dashboard/Dashboard';

const App = () => {

  const CustomAppBar = withStyles({
    root: {
      background: 'linear-gradient(45deg, green, #7FFF7F)',
    }
  })(AppBar);

  return (
    <div>
      <header>
        <CustomAppBar position = "static">
          <Toolbar>
            <Typography variant = "h6">
              Money Tree
            </Typography>
            <Button color = "inherit" style = {{position: 'absolute', right: '1.5%'}}>Login</Button>
          </Toolbar>
        </CustomAppBar>
        <Dashboard />
      </header>
    </div>
  );
}

export default App;
