const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt')
const app = express();
const port = 8080;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'MoneyTree'
});

connection.connect();

var query = 'CREATE TABLE IF NOT EXISTS `MoneyTree`.`Credentials` (`ID` INT NOT NULL AUTO_INCREMENT, `Username` VARCHAR(45) NOT NULL, `Password` VARCHAR(500) NOT NULL, PRIMARY KEY (`ID`))';
connection.query(query, function(err, rows, fields) {
    if (err) throw err;
})

var query = 'CREATE TABLE IF NOT EXISTS `MoneyTree`.`Expense` (`ID` INT NOT NULL AUTO_INCREMENT, `PageID` ENUM("0", "1", "2") NOT NULL, `ExpenseID` INT NOT NULL, `Title` VARCHAR(45) NOT NULL, `Date` DATETIME NOT NULL, `Amount` DECIMAL(10,2) NOT NULL, PRIMARY KEY (`ID`, `ExpenseID`, `PageID`))';
// CONSTRAINT `ID` FOREIGN KEY (`ID`) REFERENCES `MoneyTree`.`Credentials` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION)
connection.query(query, function(err, rows, fields) {
    if (err) throw err;
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
    Login table 
*/

// Log in existing user with proper credentials
// Sends generic error message to prevent middleman attacks
app.post('/login', async (req, res) => {
    var pass = "";
    let query = `SELECT Password FROM MoneyTree.Credentials WHERE Username = "${req.body.username}"`;
    connection.query(query, async (err, rows, fields) => {
        if(err) throw err;
        else if (rows.length === 0) {
            res.send("Username or password is incorrect");
        }
        else {
            // console.log(JSON.parse(JSON.stringify(rows[0])).Password);
            pass = JSON.parse(JSON.stringify(rows[0])).Password;
            try {
                if(await bcrypt.compare(req.body.password, pass)) {
                    res.send(`Welcome, ${req.body.username}!`);
                }
                else {
                    res.send("Username or password is incorrect");
                }
            } catch {
                res.status(500).send();
            }
        }
    });
});

// Registering user in the database with unique username
// Input checks to ensure username and password are appropriate lengths
app.post('/register', async (req, res) => {
    if(req.body.username.length < 6 || req.body.password.length < 10) {
        let err = "";
        if(req.body.username.length < 6) {
            err = "Username must be at least 6 characters \n";
        }
        if(req.body.password.length < 10) {
            err = err + "Password must be at least 10 characters";
        }
        res.send(err);
    }
    else {
        try {
            const hPass =  await bcrypt.hash(req.body.password, 10);
            let query = `SELECT * FROM MoneyTree.Credentials WHERE Username = "${req.body.username}"`;
            connection.query(query, (err, rows, fields) => {
                if (err) throw err;
                else if (rows.length > 0) {
                    res.send("Username already exists");
                }
                else {
                    query = `INSERT INTO MoneyTree.Credentials(Username, Password) VALUES ("${req.body.username}", "${hPass}")`;
                    connection.query(query, (err, rows, fields) => {
                        if (err) throw err;
                        res.send(req.body);
                    });
                }
            });
        } catch {
            res.status(500).send();
        }
    }
});

/*
    Expense table 
*/

// Adds new expense to the database
app.post('/addExpense', (req, res) => {
    let date = new Date(req.body.date);
    let offset = date.getTimezoneOffset();
    date.setHours(date.getHours() - (offset / 60));
    date = date.toISOString().slice(0, 19).replace('T', ' ');
    let query = `INSERT INTO MoneyTree.Expense(PageID, ExpenseID, Title, Date, Amount) VALUES ("${req.body.pageId}", "${req.body.id}", "${req.body.title}", "${date}", "${req.body.amount}")`;
    connection.query(query, (err, rows, fields) => {
        if (err) throw err;
        res.send(req.body);
    });
});

// Edits existing expense in the database
app.put('/editExpense/:id', (req, res) => {
    let date = new Date(req.body.date);
    let offset = date.getTimezoneOffset();
    date.setHours(date.getHours() - (offset / 60));
    date = date.toISOString().slice(0, 19).replace('T', ' ');
    let query = `UPDATE MoneyTree.Expense SET Title = "${req.body.title}", Date = "${date}", Amount = "${req.body.amount}" WHERE ExpenseID = "${req.params.id}"`;
    connection.query(query, (err, rows, fields) => {
        if (err) throw err;
        res.send(req.body);
    });
});

// Deletes expense in the database
app.delete('/deleteExpense/:pageId/:id', (req, res) => {
    let query = `DELETE FROM MoneyTree.Expense WHERE PageID = "${req.params.pageId}" AND ExpenseID = "${req.params.id}"`;
    connection.query(query, (err, rows, fields) => {
        if (err) throw err;
        res.send(req.body);
    });
});

// Returns all expenses of a specific page in the database
app.get('/getExpenses/:pageId', (req, res) => {
    let query = `SELECT Title, Date, Amount FROM MoneyTree.Expense WHERE PageID = "${req.params.pageId}"`;
    connection.query(query, (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))