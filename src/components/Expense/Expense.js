import React, { useState } from 'react';
import styles from './Expense.module.css';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';

const Expense = ({index, title, date, amount, expenseList, setExpenseList}) => {
  const [editTitle, setEditTitle] = useState(title);
  const [editDate, setEditDate] = useState(date);
  const [editAmount, setEditAmount] = useState(amount);
  const [editExpense, setEditExpense] = useState(false);
  const [updateExpense, setUpdateExpense] = useState(false);

  const handleEditExpense = () => {
    setEditExpense(true);
    setUpdateExpense(true);
  };

  const handleCancelEdit = () => {
    setEditExpense(false);
  }

  const handleEditTitle = (value) => {
    setEditTitle(value);
  };

  const handleEditAmount = (value) => {
    setEditAmount(value);
  };

  const handleUpdateExpense = (index) => {
    if(updateExpense) {
      const expenseListClone = [...expenseList];
      expenseListClone[index].title = editTitle; 
      expenseListClone[index].date = editDate;
      expenseListClone[index].amount = editAmount;
      setExpenseList(expenseListClone);
      setEditExpense(false);
      setUpdateExpense(false);
    }
  };

  const handleDeleteExpense = (index) => {
    const expenseListClone = [...expenseList];
    expenseListClone.splice(index, 1);
    setExpenseList(expenseListClone);
  }

  return (
    <div>
      {editExpense ? 
        <div className={styles.expense}>
          <Grid 
            container
            direction = "row"
            justify = "space-evenly"
            alignItems = "center"
          >
            <Grid 
              container
              justify = "space-evenly"
              wrap = "wrap"
              item xs={4}
            >
              <TextField
                label = "Edit Action"
                value = {editTitle}
                onChange = {(e) => {
                  e.preventDefault();
                  handleEditTitle(e.target.value);
                }} 
              />
            </Grid>
            <Grid 
              container
              justify = "space-evenly"
              item xs={2} 
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <KeyboardDatePicker 
                  autoOk
                  variant = "inline"
                  format = "MM/dd/yyyy"
                  value = {editDate}
                  InputAdornmentProps = {{ position: "start" }}
                  onChange = {setEditDate}
                  
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid 
              container
              justify = "space-evenly"
              item xs={2}
            > 
              <TextField 
                type = "number"
                value = {editAmount}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
                style={{width: '60%'}}
                onChange = {(e) => {
                  e.preventDefault();
                  handleEditAmount(e.target.value);
                }} 
              />
            </Grid>
            <Grid item xs={2}>
              <Grid
                container
                direction = "row"
                justify = "center"
                alignItems = "center"
              >
                <IconButton
                  onClick = {(e) => {
                    e.preventDefault();
                    handleUpdateExpense(index);
                  }}
                >
                  <CheckOutlinedIcon />
                </IconButton>
                <IconButton
                  onClick = {(e) => {
                    e.preventDefault();
                    handleCancelEdit();
                  }}
                >
                  <ClearOutlinedIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </div>
        :
        <div className={styles.expense}>
          <Grid 
            container
            direction = "row"
            justify = "space-evenly"
            alignItems = "center"
          >
            <Grid 
              container
              justify = "space-evenly"
              wrap = "wrap"
              item xs={4}
            >
              <Typography variant = 'h6' style={{width: '100%', wordWrap: 'break-word', textAlign: 'center'}}>
                {title}
              </Typography>
            </Grid>

            <Grid 
              container
              justify = "space-evenly"
              item xs={2} 
            > 
              <p>{(date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()}</p>
            </Grid>
            <Grid 
              container
              justify = "space-evenly"
              item xs={2}
            >
              <p>{amount}</p>
            </Grid>
        
            <Grid 
              container
              direction = "row"
              justify = "center"
              alignItems = "center"
              item xs={2}
            >
              <IconButton
                onClick = {(e) => {
                  e.preventDefault();
                  handleEditExpense();
                }}
              >
                <EditOutlinedIcon />
              </IconButton>
              <IconButton
                onClick = {(e) => {
                  e.preventDefault();
                  handleDeleteExpense(index);
                }}
              >
                <DeleteOutlinedIcon />
              </IconButton>
            </Grid> 
          </Grid>
        </div>
      }
  </div>
)}

export default Expense;
