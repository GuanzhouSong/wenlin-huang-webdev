/**
 * Created by Jeremy on 7/19/17.
 */

var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    dateCreated: {
        type: Date,
        default: Date.now
    },
    websites: [{
        type: mongoose.Schema.ObjectId,
        ref: 'websiteModel'
    }]
}, {
    collection: 'user'
})

module.exports = userSchema
