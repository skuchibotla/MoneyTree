import React, { useState } from 'react';
import styles from './ExpensePage.module.css';
import Expense from '../Expense/Expense';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

const ExpensePage = (props) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState(0);
  const [expenseList, setExpenseList] = useState([]);
  const [addExpense, setAddExpense] = useState(false);

  const renderExpenses = () => {
    return (
      expenseList.map (
      (expense, i) =>
      <Expense 
        key = {i}
        index = {i}
        title = {expense.title}
        date = {expense.date}
        amount = {expense.amount}
        expenseList = {expenseList}
        setExpenseList = {setExpenseList}
      />
    ));
  };

  const handleTitle = (value) => {
    setTitle(value);
  };

  const handleAmount = (value) => {
    setAmount(value);
  };

  const handleAddExpense = () => {
    if(title && date && amount) {
      const expenseListClone = [...expenseList];
      expenseListClone.push({
        title: title, 
        date: date,
        amount: amount
      });
      setAddExpense(true);
      setExpenseList(expenseListClone);
      setTitle("");
      setDate(new Date());
      setAmount(0);
    }
  };

  return (
    <div>
      {addExpense ? 
        renderExpenses()
       : 
       <div />
      }
      <div className = {styles.addExpense}>
        <Grid 
          container
          direction = "row"
          justify = "center"
          alignItems = "center"
        >
          <Grid item xs={8}>
            <Grid 
              container
              direction = "row"
              justify = "space-evenly"
              alignItems = "flex-end"
            >
              <TextField
                label = "Add Expense"
                value = {title}
                onChange = {(e) => {
                  e.preventDefault();
                  handleTitle(e.target.value);
                }} 
              />
          
              <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <KeyboardDatePicker 
                  autoOk
                  variant = "inline"
                  format = "MM/dd/yyyy"
                  value = {date}
                  InputAdornmentProps = {{ position: "start" }}
                  onChange = {setDate}
                  style={{width: '25%'}}
                />
              </MuiPickersUtilsProvider>
      
              <TextField 
                type = "number"
                value = {amount}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
                style={{width: '12%'}}
                onChange = {(e) => {
                  e.preventDefault();
                  handleAmount(e.target.value);
                }} 
              />
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <Grid
              container
              direction = "row"
              justify = "space-evenly"
              alignItems = "center"
            >
              <IconButton
                onClick = {(e) => {
                  e.preventDefault();
                  handleAddExpense();
                }}
              >
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default ExpensePage;
