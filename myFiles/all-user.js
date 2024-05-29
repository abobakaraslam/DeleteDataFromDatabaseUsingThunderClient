//File: all-user.js in ROOT-FOLDER/myFiles/ folder

const myExpress = require('express')
const myRouter = myExpress.Router()
const myUser = require('../myschema/UserSchema') //one folder back from "this" file

//sub-route is /all-user/
myRouter.get('/all-user/', async (req, res) => {
    let mySuccess = false
    try {
        const getUser = await myUser.find()
        mySuccess = true
        res.json({ getData: getUser, success: mySuccess })
    } catch (e) { //parameter is compulsory for usage of catch()
        res.status(500).send({ success: mySuccess, message: "Internal Server Error" })
    }
})
//exporting so that it can access from other files
module.exports = myRouter