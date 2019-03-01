module.exports = function(app) {
    var controller = {};

    controller.createUser = function(req, res) {
        console.log("User created");
    }

    controller.login = function(req, res) {
        console.log("User login");
    }

    controller.alterPassword = function(req, res) {
        console.log("Password altered");
    }

    return controller;

}