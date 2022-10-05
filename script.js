const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
var app = express();
//Configuring express server
app.use(bodyparser.json());

    //MySQL details
    var mysqlConnection = mysql.createConnection({
        host: '127.0.0.1',
        port:'3306',
        user: 'root',
        password: '',
        database: 'application',
        multipleStatements: true
    });

    //GET connection successful/failed
    mysqlConnection.connect((err)=> {
        if(!err)
        console.log('Connection Established Successfully');
        else
        console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
    }); 


    //Creating GET Router to fetch all the flight details from the MySQL Database
    app.get('/flight' , (req, res) => {
        mysqlConnection.query('SELECT * FROM flights', (err, rows, fields) => {
        if (!err)
        res.send(rows);
        else
        console.log(err);
        })
    });

    // this script to fetch data from MySQL databse table
    app.get('/fight-data', function(req, res, next) {
        var sql='SELECT * FROM flights';
        db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.render('list', { title: 'List', userData: data});
        });
    });

    //Router to GET specific flight detail from the MySQL database
    app.get('flight/flightNumber' , (req, res) => {
        console.log(req.params.flightNumber);
        mysqlConnection.query('SELECT * FROM flights WHERE flightNumber = ?',[req.params.flightNumber], (err, rows, fields) => {
        if (!err)
        res.send(rows);
        else
        console.log(err);
        })
    });

    //Router to GET specific flight detail from the MySQL database of flightNumber for particular date
    app.get('/flight/totalNumber' , (req, res) => {
        mysqlConnection.query('SELECT COUNT(*) FROM flights /* where departureTime=? */', (err, rows, fields) => {
        if (!err)
        res.send(rows);
        else
        console.log(err);
        })
    });

    //Establish the server connection
    //PORT ENVIRONMENT VARIABLE
    const port = process.env.PORT || 8080;
    app.listen(port, () => console.log(`Listening on port ${port}..`));