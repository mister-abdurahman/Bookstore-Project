const moogoose = require('mongoose');

//Define a schema
const Schema = moogoose.Schema;

//Define book schema
const authorSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: false
    },
    dob: {
        type: Date,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    books: {
        type: Array,
        default: []
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    lastUpdateAt: {
        type: Date,
        default: Date.now
    }
});

// Export the model
module.exports = moogoose.model('authors', authorSchema); //collection name is Books. This is the name of the collection in the database