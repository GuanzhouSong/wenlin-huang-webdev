/**
 * Created by Jeremy on 6/8/17.
 */

(function () {
    angular
        .module("webAppMaker")  // reading the module declared in app.js
        .controller("loginController", loginController);

    function loginController() {
        var model = this;
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder" },
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley" },
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia" },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi" }
        ];

        model.validateLogin = validateLogin;

        function validateLogin(username, password) {
            var found = false;
            for (var u in users) {
                var user = users[u];
                if (user.username === username && user.password === password) {
                    found = true;
                    break;
                }
            }
            model.message = found ? "Welcome " + users[u].username : "User information does not exist.";
        }
    }

})();
