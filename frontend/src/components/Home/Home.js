import React from 'react';
import styles from './Home.module.css';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const CustomButton = withStyles ({
  root: {
    backgroundColor: '#A9A9A9',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.45)'
    },
    textTransform: 'none',
    fontSize: '1vw'
  },
  contained: {
    width: '6vw'
  }
})(Button);

const Home = () => (
  <div className = {styles.home}>
    <main className = {styles.image}>
      <article className = {styles.text}>
        <Typography variant = "h2" style = {{fontWeight: "400", fontSize: "3.19vw"}}>
          Growing money starts with saving your first bill.
        </Typography>

        <div className = {styles.paragraph}>
          <Typography variant = "h5" style = {{fontSize: "1.25vw"}}>
            We create your budget using the 50/30/20 budget because we believe every bill you earn has a purpose.
            Our intuitive platform serves to provide transparency to how you spend your money and to facilitate mindful spending.
          </Typography>
        </div>

        <div className = {styles.button}>
          <CustomButton variant = "contained" size = "medium">
            <Link to = "/register" underline = "none" className = {styles.link}>
              Register
            </Link>
          </CustomButton>
          <CustomButton variant = "contained" size = "medium">
            <Link to = "/login" underline = "none" className = {styles.link}>
              Login
            </Link>
          </CustomButton>
        </div>
      </article>
    </main>
  </div>
);

export default Home;
