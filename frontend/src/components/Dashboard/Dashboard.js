import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import styles from './Dashboard.module.css';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

import ExpensePage from '../ExpensePage/ExpensePage';

const Dashboard = () => {

  const TabPanel = ({children, value, index, ...other}) => {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  const a11yProps = (index) => {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  const CustomTab = withStyles({
    selected: {
      color: '#006A25',
    },
  })(Tab);

  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className = {styles.tabs}>
      <AppBar position="static" color="default">
        <Paper elevation = {3}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
            TabIndicatorProps={
              {style: {backgroundColor: '#006A25'}}
            }
          >
            <CustomTab label="Needs" {...a11yProps(0)} />
            <CustomTab label="Savings" {...a11yProps(1)} />
            <CustomTab label="Wants" {...a11yProps(2)} />
          </Tabs>
        </Paper>
      </AppBar>
      
      <TabPanel value={value} index={0} dir={theme.direction}>
        <ExpensePage pageId = "0"/>
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <ExpensePage pageId = "1"/>
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <ExpensePage pageId = "2"/>
      </TabPanel>
    </div>
  );
}

export default Dashboard;
