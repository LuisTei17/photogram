module.exports = function(app) {
    const userController = app.controllers.userController;

    app.route("/createUser").post(userController.createUser);
    app.route("/login").post(userController.login);
    app.route("/alterPassword").post(userController.alterPassword);
    app.route("/validateUser").post(userController.validateUser);

}