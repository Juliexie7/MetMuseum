const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')

const db = mysql.createPool({
    // host: '10.0.0.221',
    // user: 'root',
    // password: 'W3lcome1',
    // database: 'finalproject'
    host: 'libraryproj.mysql.database.azure.com',
    user: 'libraryadmin',
    password: 'Password123',
    database: 'library1',
    port:3306
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/details/reviews', (req, res)=>{
    const sqlSelect = "select * from review";
    db.query(sqlSelect, (err, result)=>{
        console.log(err, result);
        res.send(result);
    });
  })

app.post('/details/reviews', (req, res)=>{
    const objectID = req.body.objectID;
    const name = req.body.name;
    const comment = req.body.comment;
    const sqlInsert = "insert into review (objectid, `name`, `comment`) values (?,?,?)";
    const sqlSelect = "select * from review where reviewid = ?";
    db.query(sqlInsert, [objectID, name, comment], (err, result)=>{
        db.query(sqlSelect, result.insertId, (err, result)=>{
            res.send(result);
        });
  })  
})

app.listen(3001, ()=>{
    console.log("running on port 3001")
})