/**
 * Created by Jeremy on 7/20/17.
 */

var mongoose = require('mongoose')
var userSchema = require('../user/user.schema.server')
var websiteSchema = require('../website/website.schema.server')
var userModel = mongoose.model('userModel', userSchema)
var websiteModel = mongoose.model('websiteModel', websiteSchema)

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesByUser = findAllWebsitesByUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.addPage = addPage;
websiteModel.deletePage = deletePage;

module.exports = websiteModel

// 1. Create a website, adding _userId as a foreign key
// 2. Add the created website to websites[] in user model
function createWebsiteForUser(userId, website) {
    website._user = userId
    return websiteModel
        .create(website)            // create() 必须发生在 addWebsite() 之前, 因为
        .then(function (website) {  // 在创建完 website 之后才能生成它的 _id, 所以这里需要用到 promise
            return userModel.addWebsite(userId, website._id)  // return it as a promise
        })
}

function findAllWebsitesByUser(userId) {
    return websiteModel
        .find({ _user: userId })
        .populate('_user')       // populates document references
        .exec()
}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId)
}

function updateWebsite(websiteId, newWebsite) {
    return websiteModel.update({ _id: websiteId }, { $set: newWebsite })
}

function deleteWebsite(userId, websiteId) {
    return websiteModel
        .remove({ _id: websiteId })
        .then(function (status) {
            return userModel.deleteWebsite(userId, websiteId)
        })
}

function addPage(websiteId, pageId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            website.pages.push(pageId)
            return website.save()
        })
}

function deletePage(websiteId, pageId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            var index = website.pages.indexOf(pageId)
            website.pages.splice(index, 1)
            return website.save()
        })
}
