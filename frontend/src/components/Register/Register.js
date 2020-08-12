import React, { useState } from 'react';
import styles from './Register.module.css';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const CustomButton = withStyles ({
  root: {
    textTransform: 'none',
    fontSize: '1vw',
    color: 'white',
    width: '6vw',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.15)'
    }
  },
  contained: {
    backgroundColor: '#009688',
    '&:hover': {
      backgroundColor: '#00695F'
    }
  },
  outlined: {
    color: 'grey'
  }
})(Button);

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [slide, setSlide] = useState(false);
  const [notSafePassword, setNotSafePassword] = useState(false);
  const [notEqualPassword, setNotEqualPassword] = useState(false);

  const handleFirstName = (value) => {
    setFirstName(value);
  };

  const handleLastName = (value) => {
    setLastName(value);
  };

  const handleEmail = (value) => {
    setEmail(value);
  };

  const handlePassword = (value) => {
    setPassword(value);
  };

  const handleConfirmPassword = (value) => {
    setConfirmPassword(value);
  };

  const handleChange = () => {
    setSlide((prev) => !prev);
  };

  const handleNext = () => {
    let firstNameClone = document.getElementById("firstName");
    let lastNameClone = document.getElementById("lastName");
    let emailClone = document.getElementById("email");

    if(firstNameClone.checkValidity() && lastNameClone.checkValidity() && emailClone.checkValidity()) {
      handleChange();
    }
  };

  const handleRegister = () => {
    if(password.length < 8) {
      setNotSafePassword(true);
    }
    else {
      setNotSafePassword(false);
      if(password !== confirmPassword) {
        setNotEqualPassword(true);
      }
      else {
        setNotEqualPassword(false);
        let passwordClone = document.getElementById("password");
        let confirmPasswordClone = document.getElementById("confirmPassword");
        
        if(!notEqualPassword && passwordClone.checkValidity() && confirmPasswordClone.checkValidity()) {
          // Link front end to back end
          console.log("registered!");
        }
      }
    }
  }
  
  return (
    <div className = {styles.background}>
      <div className = {styles.register}>
        <PersonAddIcon style = {{fontSize: "8vw", color: "DimGray"}}/>
        <Typography variant = "h4" style = {{fontWeight: "400", fontSize: "1.8vw", color: "rgba(0, 0, 0, 0.75)"}}>
          Create account
        </Typography>
        <form className = {styles.form}>
          {slide ? (
            <div className = {styles.content}>
              <TextField 
                required
                label = "Password" 
                type = "password" 
                variant = "standard" 
                style = {{width: "18vw"}} 
                id = "password" 
                error = {notSafePassword ? true : false}
                helperText = {notSafePassword ? "Password must be at least 8 characters" : "Use 8 or more characters with a mix of letters, numbers & symbols"}
                value = {password}
                onChange = {(e) => {
                  e.preventDefault();
                  handlePassword(e.target.value);
                }}
              />
              <TextField 
                required
                label = "Confirm Password" 
                type = "password" 
                variant = "standard" 
                style = {{width: "18vw"}} 
                id = "confirmPassword"
                error = {notEqualPassword ? true : false}
                helperText = {notEqualPassword ? "The passwords do not match" : "Re-type password"}
                value = {confirmPassword}
                onChange = {(e) => {
                  e.preventDefault();
                  handleConfirmPassword(e.target.value);
                }}
              />
            </div>
          ) : (
            <div className = {styles.content}>
              <TextField 
                required
                label = "First Name" 
                type = "text" 
                variant = "standard" 
                style = {{width: "18vw"}} 
                id = "firstName"
                value = {firstName}
                onChange = {(e) => {
                  e.preventDefault();
                  handleFirstName(e.target.value);
                }}
              />
              <TextField 
                required
                label = "Last Name" 
                type = "text" 
                variant = "standard" 
                style = {{width: "18vw"}} 
                id = "lastName" 
                value = {lastName}
                onChange = {(e) => {
                  e.preventDefault();
                  handleLastName(e.target.value);
                }}
              />
              <TextField 
                required
                label = "Email" 
                type = "email" 
                variant = "standard" 
                style = {{width: "18vw"}} 
                id = "email"
                value = {email}
                onChange = {(e) => {
                  e.preventDefault();
                  handleEmail(e.target.value);
                }}
              />
            </div>
          )}
          {slide ? (
            <div className = {styles.button}>
              <CustomButton variant = "outlined" style = {{marginTop: "2%"}} onClick = {handleChange}>
                Go Back
              </CustomButton>
              <CustomButton 
                variant = "contained" 
                style = {{marginTop: "2%"}}
                onClick = {handleRegister}
              >
                Register
              </CustomButton>
            </div>
          ) : (
            <div className = {styles.button}>
              <CustomButton variant = "outlined" style = {{marginTop: "2%"}}>
                <Link to = "/" underline = "none" className = {styles.link}>
                  Cancel
                </Link>
              </CustomButton>
              <CustomButton 
                type = "submit" 
                variant = "contained" 
                style = {{marginTop: "2%"}} 
                onClick = {handleNext}
              >
                Next
              </CustomButton>
            </div>
          )}
        </form>
      </div>
      
  </div>);
};

export default Register;
