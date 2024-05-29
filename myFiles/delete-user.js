//File: delete-user.js in ROOT-FOLDER/myFiles/ folder

const myExpress = require('express')

const myRouter = myExpress.Router()
const myUser = require('../myschema/UserSchema') //one folder back from "this" file

//:reqID4Delete is for getting ID from endpoint
myRouter.delete('/:reqID4Delete',
    async (req, res) => {
        let mySuccess = false

        let delID = req.params.reqID4Delete
        try {
            //getting the data that is being deleted. Data's ID will be in URL/API
            let searchingData = {
                email: delID
            }
            const getUser = await myUser.find(searchingData)

            //sending response if there is no data in the database against requested-ID
            if (getUser.length == 0) {
                return res.status(404).send({ success: mySuccess, message: "No User Found for this ID" })
            }
            console.log("IDs Count: ", getUser.length)
            // Extracting _id values
            const ids = getUser.map(element => element._id.toString());

            for (let index = 0; index < ids.length; index++) {
                const element = ids[index];
                const deletedUser = await myUser.findByIdAndDelete(element)
            }
            let sendResponseData = {
                message: "All IDs has been deleted", success: mySuccess
            }
            res.json(sendResponseData)
        }
        catch (e) {
            res.status(400).send({ success: mySuccess, message: "Internal Server Error" })
        }
    }
)
//exporting so that it can access from other files
module.exports = myRouter