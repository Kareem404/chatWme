const express = require('express')
const app = express(); 
const cors = require('cors')
const port = 3000

app.use(cors()); // to allow reciving data from the frontend that uses a different port
// TODO: Restrict recieving data. SHOULD only recieve data from port 5178 (react app)

app.use(express.json())
// define routes

// post request when the user logins
app.post('/login', (req, res)=>{
    console.log('post request (user tries to login): ', req.url);
    console.log(req.body)
}) 


// server listening to port:
app.listen(port, () =>{
    console.log(`Listening to port ${port}...`)
})