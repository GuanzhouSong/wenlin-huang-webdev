/**
 * Created by Jeremy on 6/8/17.
 */

(function () {
    angular
        .module("webAppMaker")  // reading the module declared in app.js
        .controller("profileController", profileController)

    function profileController($location, userService, currentUser) {
        var model = this
        model.updateUser = updateUser
        model.deleteUser = deleteUser
        model.logout = logout

        init()

        function init() {
            model.user = currentUser
        }

        function updateUser(userId, user) {
            if (user.username == null || user.email == null || user.firstName == null || user.lastName == null) {
                model.error = "No empty fields allowed."
                delete model.message
                return
            }
            userService
                .updateUser(userId, user)
                .then(function () {
                    model.message = 'User successfully updated.'
                    delete model.error
                })
        }

        function deleteUser(userId) {
            if (!confirm('Are you sure to destroy your account?'))  return
            userService
                .deleteUser(userId)
                .then(function () {
                    $location.url('/login')
                }, function () {
                    model.error = 'Something went wrong, unable to remove your account.'
                })
        }

        function logout() {
            return userService
                .logout()
                .then(function () {
                    $location.url('/login')
                })
        }
    }
})()
