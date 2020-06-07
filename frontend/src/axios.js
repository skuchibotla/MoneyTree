import axios from 'axios';

export async function addExpense(expense) {
    let res = await axios.post(`/addExpense`, expense);
};

export async function updateExpense(expense) {
    let res = await axios.put(`/editExpense/${expense.id}`, expense);
    console.log(res.data);
};

export async function deleteExpense(id) {
    let res = await axios.delete(`/deleteExpense/${id}`);
    console.log(res.data);
};

export async function getExpenses(pageId) {
    let res = await axios.get(`/getExpenses/${pageId}`);
    return res.data;
}