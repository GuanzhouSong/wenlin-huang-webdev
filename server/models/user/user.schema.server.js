/**
 * Created by Jeremy on 7/19/17.
 */

var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
    roles: [{
       type: String,
       default: 'USER',
       enum: ['USER', 'FACULTY', 'STUDENT', 'ADMIN'],
    }],
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String
    },
    firstName: String,
    lastName: String,
    google: {
        id: String,
        token: String
    },
    facebook: {
        id: String,
        token: String
    },
    email: String,
    phone: String,
    dateCreated: {
        type: Date,
        default: Date.now
    },
    websites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'websiteModel'
    }]
}, {
    collection: 'user'
})

module.exports = userSchema
