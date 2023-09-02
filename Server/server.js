const express = require('express')
const app = express(); 
const cors = require('cors')
const mysql = require('mysql2')
const envVar = require('dotenv').config(); 

const port = 3000


app.use(cors()); // to allow reciving data from the frontend that uses a different port
// TODO: Restrict recieving data. SHOULD only recieve data from port 5178 (react app)

// connect to the database 
const sqlCon = mysql.createConnection({
    host: 'localhost', 
    user: process.env.DB_USER, 
    password: process.env.DB_PASS
})

sqlCon.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
});

 
app.use(express.json())


// define routes

// post request when the user logins
app.post('/login', (req, res)=>{
    console.log('post request (user tries to login): ', req.url);
    // console.log(req.body)

    // query the database and check for the user
    sqlCon.query(`SELECT * FROM CHAT_APP.USERS WHERE USERNAME= '${req.body.username}' AND PASSWORD = '${req.body.password}'`, (err, result) =>{
        
        if(err) {
            res.status(400).json({msg: "Error in server"});
            return console.log(err);
        }

        if(result.length !== 0){
            console.log('User Found!');
            console.log('result = ',result);
             res.status(200).json({user_id: result[0].ID});
        }
        else{
            console.log('User not found');
            res.status(404).json({msg: "User not found"});
        }

    })
}) 


// frontend requesting chat info of a specific user with an id.
app.get('/chats', (req, res)=>{
    const user_id = req.query.id; 
    console.log(`GET chats of user id=${user_id}`)

    sqlCon.query(`
        SELECT * 
        FROM CHAT_APP.CHATROOMS CR JOIN CHAT_APP.CHAT_USERS CU ON  CR.CHAT_ID = CU.CHAT_ID
        WHERE CU.USER_ID = ${user_id}; 
    `, (err, result)=>{
        res.status(200).json(result);
    })

})


// server listening to port:
app.listen(port, () =>{
    console.log(`Listening to port ${port}...`)
})



