//File: UserSchema.js in ROOT-FOLDER/model/ folder

const UserMongoose = require('mongoose')
//import { Schema } from 'NoteMongoose'
//above line will generate error because you don't use import and require together. Use only one format
const { Schema } = UserMongoose; // Destructure Schema from mongoose

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    fname: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String
    },
})
//exporting so that it can be used in another file
//1st parameter is for name-of-collection in database. DONT USE CAPITAL LETTER IN THE NAME
//3rd parameter is same as 1st parameter so that name of collection is same as in 1st parameter.

module.exports = UserMongoose.model('myCollectionMyDBClass', UserSchema, 'myCollectionMyDBClass')