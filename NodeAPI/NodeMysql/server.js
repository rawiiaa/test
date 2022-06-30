require('dotenv').config()
console.log(process.env)
const express = require('express')
var mysql = require('mysql')
const app = express()


// link between front & back
const cors = require('cors')
// to json
const BodyParser = require('body-parser')
    // configure Cors
app.use(cors())
app.use(BodyParser.json())


app.use((req,res,next) =>
{
    res.header("Access-Control-Allow-Origin" ,"*");
    res.header("Access-Control-Allow-Methods" ,"GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type ,Accept")
    next();

}

)
//routes
app.use('/api/historic', require('./app/models/routes'));

app.listen(8000 , ()=> console.log("Server is connected on port 8000 "))


