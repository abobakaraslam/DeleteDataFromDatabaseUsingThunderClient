//File: register-user.js in ROOT-FOLDER/myFiles/ folder

const myExpress = require('express')
const myRouter = myExpress.Router()
const myUser = require('../myschema/UserSchema') //one folder back from "this" file

const { body, validationResult } = require("express-validator")

const myBcrypt = require("bcrypt")

//sub-route is /register-user/
myRouter.post('/', [
    body("email", "email is not valide").isEmail(),
    body("password", "Password cannot be null").exists(),
    body("name", "Please write your name").exists()
],
    async (req, res) => {
        let mySuccess = false
        const myError = validationResult(req) //getting error by validationResult over "req"
        if (!myError.isEmpty()) {//if error exists
            //error status along with errors in array format
            //sending bad request (code: 400) with some JSON
            return res.status(400).json({ errorExistAsBelow: myError.array(), success: mySuccess })
        }
        try {
            let myemail = req.body.email
            //console.log("myemail: ", myemail)

            //lets check already registered email
            //if email is already registered, then
            //skip to save other data
            let existUser = await myUser.findOne({ email: req.body.email })
            if (existUser) {
                //sending bad request (code: 400) with some JSON
                return res.status(400).json({ success: mySuccess, errorExistAsBelow: "Sorry, this email already exists" })
            }

            let myname = req.body.name
            let myfname = req.body.fname
            let mystatus = req.body.status

            let mypassword = req.body.password //getting password entered by users
            //encryption using salt
            const mySalt = await myBcrypt.genSalt(10) //salt value for 10 character
            let securePassword = await myBcrypt.hash(mypassword, mySalt)
            mypassword = securePassword


            let savingData = {
                email: myemail,
                name: myname,
                fname: myfname,
                password: mypassword,
                status: mystatus
            }

            //using promises
            let myNewUSer = await myUser.create(savingData)

            //let myData = myUser(savingData)
            //myData.save()

            mySuccess = true

            //create data for response
            let resData = {
                message: "Data has been inserted successfully",
                insertedData: savingData,
                success: mySuccess,
                newUserFromData: myNewUSer
            }
            res.json(resData)
        } catch (myError) {
            console.log(myError.message)
            res.status(500).send({ success: mySuccess, message: "some error occured" })
        }

    })

//exporting so that it can access from other files
module.exports = myRouter