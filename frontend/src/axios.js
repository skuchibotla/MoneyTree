import axios from 'axios';

export async function addExpense(expense) {
    await axios.post(`/addExpense`, expense);
};

export async function updateExpense(expense) {
    await axios.put(`/editExpense/${expense.id}`, expense);
};

export async function deleteExpense(expense) {
    await axios.delete(`/deleteExpense/${expense.pageId}/${expense.id}`);
};

export async function getExpenses(pageId) {
    let res = await axios.get(`/getExpenses/${pageId}`);
    return res.data;
}