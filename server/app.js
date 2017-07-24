/**
 * Created by Jeremy on 6/20/17.
 */

var mongoose = require('mongoose')

var connectionString = 'mongodb://localhost/web_dev' // for local
if (process.env.MLAB_USERNAME_WEBDEV) {              // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV  // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV
    connectionString = 'mongodb://' + username + ':' + password
    connectionString += '@ds147821.mlab.com:47821/heroku_sccp2r5d'
}

mongoose.connect(connectionString)
mongoose.Promise = require('q').Promise

require('./services/user.service.server')
require('./services/website.service.server')
require('./services/page.service.server')
require('./services/widget.service.server')
