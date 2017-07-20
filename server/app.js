/**
 * Created by Jeremy on 6/20/17.
 */

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/web_dev')
mongoose.Promise = require('q').Promise

require('./services/user.service.server')
require('./services/website.service.server')
require('./services/page.service.server')
require('./services/widget.service.server')
