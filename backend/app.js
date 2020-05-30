const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 8080;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'MoneyTree'
});

connection.connect();
var query = 'CREATE TABLE IF NOT EXISTS `MoneyTree`.`Expense` (`ID` INT NOT NULL AUTO_INCREMENT, `ExpenseID` INT NOT NULL, `PageID` ENUM("0", "1", "2") NOT NULL, `Title` VARCHAR(45) NOT NULL, `Date` DATETIME NOT NULL, `Amount` DECIMAL(10,2) NOT NULL, PRIMARY KEY (`ID`, `ExpenseID`, `PageID`))';
connection.query(query, function(err, rows, fields) {
    if (err) throw err;
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/addExpense', (req, res) => {
    let date = new Date(req.body.date);
    let offset = date.getTimezoneOffset();
    date.setHours(date.getHours() - (offset / 60));
    date = date.toISOString().slice(0, 19).replace('T', ' ');
    let query = `INSERT INTO MoneyTree.Expense(ExpenseID, PageID, Title, Date, Amount) VALUES ("${req.body.id}", "${req.body.pageId}", "${req.body.title}", "${date}", "${req.body.amount}")`;
    connection.query(query, function(err, rows, fields) {
        if (err) throw err;
        res.send(req.body);
    });
});

app.put('/editExpense/:id', (req, res) => {
    let date = new Date(req.body.date);
    let offset = date.getTimezoneOffset();
    date.setHours(date.getHours() - (offset / 60));
    date = date.toISOString().slice(0, 19).replace('T', ' ');
    let query = `UPDATE MoneyTree.Expense SET Title = "${req.body.title}", Date = "${date}", Amount = "${req.body.amount}" WHERE ExpenseID = ${req.params.id}`;
    connection.query(query, function(err, rows, fields) {
        if (err) throw err;
        res.send(req.body);
    });
});

app.delete('/deleteExpense/:id', (req, res) => {
    let query = `DELETE FROM MoneyTree.Expense WHERE ExpenseID = "${req.params.id}"`;
    connection.query(query, function(err, rows, fields) {
        if (err) throw err;
        res.send(req.body);
    });
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))