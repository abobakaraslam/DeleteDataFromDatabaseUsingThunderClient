//File: index.js in root directory

const myConnectionToDB = require('./db') //getting connectToMongo() from db.js that was exported
//running above required-code
myConnectionToDB()

const express = require('express')

//adding package that will allow communication with frontend
const cors = require('cors')

const app = express()

app.use(cors())

//allowing communication on base of json
app.use(express.json())

//route for all-user
app.use('/user', require('./myFiles/all-user'))//displaying all user
//route for register-user
app.use('/user/register-user', require("./myFiles/register-user"))
//route for delete-user
app.use('/user/delete-user', require("./myFiles/delete-user"))
const port = 5000

app.listen(port)