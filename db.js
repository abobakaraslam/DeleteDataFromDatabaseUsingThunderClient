//File: db.js in root directory

const myMongoose = require('mongoose');

// Saving my MongoDB URI
const mongoURL = 'mongodb://localhost:27017/myDBClass';

// Creating a function to connect to MongoDB
const connectToMongo = async () => {
    try {
        await myMongoose.connect(mongoURL);
        console.log('Connected to MongoDB');
    } catch (e) {
        console.error('Error connecting to MongoDB:', e.message);
    }
};

// Exporting the module (db.js) with connectToMongo function
module.exports = connectToMongo;