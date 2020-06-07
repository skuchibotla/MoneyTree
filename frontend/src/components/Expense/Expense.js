import React, { useState } from 'react';
import { updateExpense, deleteExpense } from '../../axios';
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

const Expense = ({ id, pageId, title, date, amount, expenseList, setExpenseList }) => {
  const [editTitle, setEditTitle] = useState(title);
  const [editDate, setEditDate] = useState(date);
  const [editAmount, setEditAmount] = useState(amount);
  const [editExpense, setEditExpense] = useState(false);
  const [isUpdateExpense, setIsUpdateExpense] = useState(false);

  const handleEditExpense = () => {
    setEditExpense(true);
    setIsUpdateExpense(true);
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

  const handleUpdateExpense = (id) => {
    if(isUpdateExpense) {
      const expenseListClone = [...expenseList];
      const expense = {
        id: expenseListClone[id].id,
        pageId: expenseListClone[id].pageId,
        title: editTitle, 
        date: editDate,
        amount: editAmount
      };
      expenseListClone[id] = expense;
      updateExpense(expense);
      setExpenseList(expenseListClone);
      setEditExpense(false);
      setIsUpdateExpense(false);
    }
  };

  const handleDeleteExpense = (id) => {
    const expenseListClone = [...expenseList];
    deleteExpense(id);
    expenseListClone.splice(id, 1);
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
            <Grid item xs={10}>
              <Grid 
                container
                direction = "row"
                justify = "space-evenly"
                alignItems = "flex-end"
              >
                <TextField
                  label = "Edit Action"
                  value = {editTitle}
                  onChange = {(e) => {
                    e.preventDefault();
                    handleEditTitle(e.target.value);
                  }} 
                />
            
              <MuiPickersUtilsProvider utils={DateFnsUtils} >
                  <KeyboardDatePicker 
                    autoOk
                    variant = "inline"
                    format = "MM/dd/yyyy"
                    value = {editDate}
                    InputAdornmentProps = {{ position: "start" }}
                    onChange = {setEditDate}
                    style={{width: '25%'}}
                    
                  />
                </MuiPickersUtilsProvider>
        
                <TextField 
                  type = "number"
                  value = {editAmount}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                  }}
                  style={{width: '12%'}}
                  onChange = {(e) => {
                    e.preventDefault();
                    handleEditAmount(e.target.value);
                  }} 
                />
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid
                container
                direction = "row"
                justify = "space-evenly"
                alignItems = "center"
              >
                <IconButton
                  onClick = {(e) => {
                    e.preventDefault();
                    handleUpdateExpense(id);
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
            <Grid item xs={4}>
              <Grid 
                container
                direction = "row"
                justify = "space-evenly"
                alignItems = "center"
              >
                <Typography variant = 'h6' style={{wordWrap: 'break-word', textAlign: 'center'}}>
                  {title}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid 
                  container
                  direction = "row"
                  justify = "space-evenly"
                  alignItems = "center"
                >
                  <p>{(date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()}</p>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid 
                  container
                  direction = "row"
                  justify = "space-evenly"
                  alignItems = "center"
                >
                <p>{amount}</p>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid
                container
                direction = "row"
                justify = "space-evenly"
                alignItems = "center"
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
                    handleDeleteExpense(id);
                  }}
                >
                  <DeleteOutlinedIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </div>
      }
    </div>
  );
}

export default Expense;
